import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { SearchBar } from "../components/common/SearchBar";
import { DistanceFilter } from "../components/common/DistanceFilter";
import { Map } from "../components/common/Map";

import { HospitalCard } from "../components/cards/HospitalCard";

import { useNearbyPlaces } from "../hooks/useNearbyPlaces";

const DISTANCE_MAP = {
    "1 KM": 1000,
    "3 KM": 3000,
    "5 KM": 5000,
    "10 KM": 10000,
    "25 KM": 25000,
    "50 KM": 50000,
};

// Parses "4.5+ ⭐" -> 4.5
const parseRatingThreshold = (value) => {
    const match = value?.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : null;
};

export const HospitalsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const [selectedFilters, setSelectedFilters] = useState({
        distance: "",
        rating: "",
        availability: "",
    });

    const [currentLocation, setCurrentLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);

    const radius = DISTANCE_MAP[selectedFilters.distance] || 20000;

    useEffect(() => {
        if (!navigator.geolocation) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLocationError(
                "Your browser doesn't support location access."
            );
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setLocationError(null);
            },
            (error) => {
                console.log(error);

                setLocationError(
                    "We couldn't access your location. Please allow location access and refresh the page."
                );
            }
        );
    }, []);

    const { places: hospitals, loading } = useNearbyPlaces(
        currentLocation,
        "hospital",
        radius
    );

    const ratingThreshold = parseRatingThreshold(
        selectedFilters.rating
    );

    const filteredHospitals = hospitals.filter((hospital) => {
        const matchesSearch = hospital.displayName?.text
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        if (
            ratingThreshold != null &&
            (hospital.rating == null ||
                hospital.rating < ratingThreshold)
        ) {
            return false;
        }

        // "Available Now" and "Open 24/7" both rely on the same
        // openNow field from the Places API - it's the only live
        // availability signal we get back.
        // "Emergency" has no equivalent field from the API, so it
        // currently can't be filtered on and is treated as a no-op.
        if (
            (selectedFilters.availability === "Available Now" ||
                selectedFilters.availability === "Open 24/7") &&
            !hospital.regularOpeningHours?.openNow
        ) {
            return false;
        }

        return true;
    });

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                <SearchBar
                    title="Search Hospitals"
                    description="Find hospitals near your location."
                    placeholder="Search Hospitals..."
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <DistanceFilter
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                />
            </div>

            {locationError && (
                <div
                    className="
                    mt-5
                    rounded-xl
                    border
                    border-amber-200
                    bg-amber-50
                    px-5
                    py-3
                    text-sm
                    text-amber-700
                    "
                >
                    {locationError}
                </div>
            )}

            <div
                className="
                mt-8
                grid
                grid-cols-1
                gap-8
                lg:grid-cols-[520px_1fr]
                "
            >
                <div
                    className="
                    space-y-5
                    lg:h-[calc(100vh-140px)]
                    lg:overflow-y-auto
                    pr-3
                    "
                >
                    {loading ? (
                        <h1>Loading...</h1>
                    ) : filteredHospitals.length === 0 ? (
                        <p className="text-[#6B7280]">
                            No hospitals match your current filters.
                        </p>
                    ) : (
                        filteredHospitals.map((hospital) => (
                            <HospitalCard
                                key={hospital.id}
                                place={hospital}
                                currentLocation={currentLocation}
                            />
                        ))
                    )}
                </div>

                <div
                    className="
                    lg:sticky
                    lg:top-5
                    lg:h-[88vh]
                    "
                >
                    <Map
                        currentLocation={currentLocation}
                        places={filteredHospitals}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default HospitalsPage;
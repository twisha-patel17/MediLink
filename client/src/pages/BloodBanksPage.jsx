import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { SearchBar } from "../components/common/SearchBar";
import { DistanceFilter } from "../components/common/DistanceFilter";
import { BloodBankCard } from "../components/cards/BloodBankCard";
import { Map } from "../components/common/Map";

import { useBloodBanks } from "../hooks/useBloodBanks";

const DISTANCE_MAP = {
    "1 KM": 1000,
    "3 KM": 3000,
    "5 KM": 5000,
    "10 KM": 10000,
    "25 KM": 25000,
    "50 KM": 50000,
};


const parseRatingThreshold = (value) => {
    const match = value?.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : null;
};

export const BloodBanksPage = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const [selectedFilters, setSelectedFilters] = useState({
        distance: "",
        rating: "",
        availability: "",
    });

    const [currentLocation, setCurrentLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [showMap, setShowMap] = useState(false);

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

    const radius = DISTANCE_MAP[selectedFilters.distance] || 50000;

    const { bloodBanks, loading } = useBloodBanks(
        currentLocation,
        radius
    );

    const ratingThreshold = parseRatingThreshold(
        selectedFilters.rating
    );

    const filteredBloodBanks = bloodBanks.filter((place) => {
        const matchesSearch = place.displayName?.text
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        if (
            ratingThreshold != null &&
            (place.rating == null || place.rating < ratingThreshold)
        ) {
            return false;
        }

        // "Available Now" and "Open 24/7" both rely on the same
        // openNow field from the Places API.
        if (
            (selectedFilters.availability === "Available Now" ||
                selectedFilters.availability === "Open 24/7") &&
            !place.regularOpeningHours?.openNow
        ) {
            return false;
        }

        return true;
    });

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                <SearchBar
                    title="Search Blood Banks"
                    description="Find blood banks near your location."
                    placeholder="Search Blood Banks..."
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <DistanceFilter
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                />

                <button
                    type="button"
                    onClick={() => setShowMap((prev) => !prev)}
                    className="
                    rounded-xl
                    border
                    border-[#E2E4EC]
                    bg-white
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-[#6B7280]
                    shadow-sm
                    transition
                    hover:border-[#1D4ED8]
                    hover:text-[#1D4ED8]
                    "
                >
                    {showMap ? "Hide Map" : "Show Map"}
                </button>
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
                className={`
                mt-8
                grid
                grid-cols-1
                gap-6

                ${
                    showMap
                        ? "lg:grid-cols-[420px_1fr]"
                        : "sm:grid-cols-2 xl:grid-cols-3"
                }
                `}
            >
                <div
                    className={`
                    space-y-5
                    pr-2

                    ${
                        showMap
                            ? "lg:h-[calc(100vh-220px)] lg:overflow-y-auto"
                            : "contents"
                    }
                    `}
                >
                    {loading ? (
                        <h1>Loading...</h1>
                    ) : filteredBloodBanks.length === 0 ? (
                        <p className="text-[#6B7280]">
                            No blood banks match your current filters.
                        </p>
                    ) : (
                        filteredBloodBanks.map((place) => (
                            <BloodBankCard
                                key={place.id}
                                place={place}
                                currentLocation={currentLocation}
                            />
                        ))
                    )}
                </div>

                {showMap && (
                    <div
                        className="
                        lg:sticky
                        lg:top-5
                        "
                    >
                        <Map
                            currentLocation={currentLocation}
                            places={filteredBloodBanks}
                        />
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default BloodBanksPage;
import DashboardLayout from "../layouts/DashboardLayout";

import { useState, useEffect } from "react";
import { SearchBar } from "../components/common/SearchBar";
import { DistanceFilter } from "../components/common/DistanceFilter";
import { HospitalCard } from "../components/cards/HospitalCard";
import { Map } from "../components/common/Map";

export const HospitalsPage = () => {

    const [selectedFilters, setSelectedFilters] = useState({

        distance: "",
        rating: "",
        availability: ""

    });

    const [searchQuery, setSearchQuery] = useState("");

    const [hospitals, setHospitals] = useState([]);


    const handleApplyFilters = () => {

        console.log("Filters :", selectedFilters);
        console.log("Search :", searchQuery);
    };


    const handleResetFilters = () => {

        setSelectedFilters({

            distance: "",
            rating: "",
            availability: ""

        });

        setSearchQuery("");

    };


    useEffect(() => {

        console.log(selectedFilters);

    }, [selectedFilters]);


    return (

        <DashboardLayout>

            <SearchBar
                title="Search Hospitals"
                description="Find hospitals near your location."
                placeholder="Search Hospitals..."
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />


            <div className="mt-5">

                <DistanceFilter
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                />

            </div>
            <div className="mt-5 flex flex-wrap gap-4">

                <button
                    onClick={handleApplyFilters}
                    className="
                        rounded-xl
                        bg-[#1D4ED8]
                        px-6
                        py-3
                        font-medium
                        text-white
                        transition
                        hover:bg-[#15359E]
                    "
                >
                    Apply Filters
                </button>


                <button
                    onClick={handleResetFilters}
                    className="
                        rounded-xl
                        border
                        border-[#E2E4EC]
                        px-6
                        py-3
                        font-medium
                        text-[#6B7280]
                        transition
                        hover:border-[#1D4ED8]
                        hover:text-[#1D4ED8]
                    "
                >
                    Reset Filters
                </button>

            </div>
            <div
                className="
                    mt-8
                    grid
                    grid-cols-1
                    gap-6
                    lg:grid-cols-[420px_1fr]
                "
            >

                <div
                    className="
                        space-y-5
                        lg:h-[calc(100vh-220px)]
                        lg:overflow-y-auto
                        pr-2
                    "
                >

                    <HospitalCard />
                    <HospitalCard />
                    <HospitalCard />

                </div>


                <div className="lg:sticky lg:top-5 lg:h-150">

                    <Map />

                </div>

            </div>

        </DashboardLayout>
    );
};

export default HospitalsPage;
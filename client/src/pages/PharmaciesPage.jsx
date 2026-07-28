import DashboardLayout from "../layouts/DashboardLayout";

import { useState } from "react";

import { SearchBar } from "../components/common/SearchBar";
import { DistanceFilter } from "../components/common/DistanceFilter";
import { PharmacyCard } from "../components/cards/PharmacyCard";
import { Map } from "../components/common/Map";

export const PharmaciesPage = () => {

    const [selectedFilters, setSelectedFilters] = useState({

        distance: "",
        rating: "",
        availability: "",

    });

    const [searchQuery, setSearchQuery] = useState("");

    const [pharmacies, setPharmacies] = useState([]);


    const handleApplyFilters = () => {

        console.log("Filters :", selectedFilters);
        console.log("Search :", searchQuery);

        // API call will come here later

    };


    const handleResetFilters = () => {

        setSelectedFilters({

            distance: "",
            rating: "",
            availability: "",

        });

        setSearchQuery("");

    };


    return (

        <DashboardLayout>

            <SearchBar
                title="Search Pharmacies"
                description="Find pharmacies near your location."
                placeholder="Search Pharmacies..."
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

                    <PharmacyCard />
                    <PharmacyCard />
                    <PharmacyCard />

                </div>


                <div className="lg:sticky lg:top-5 lg:h-150">

                    <Map />

                </div>

            </div>

        </DashboardLayout>

    );
};

export default PharmaciesPage;
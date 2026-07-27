import DashboardLayout from "../layouts/DashboardLayout";

import {SearchBar} from "../components/common/SearchBar";
import {DistanceFilter} from "../components/common/DistanceFilter";
import {PharmacyCard} from "../components/cards/PharmacyCard";
import {Map} from "../components/common/Map";

export const PharmaciesPage = () => {
    return (
        <DashboardLayout>
        
                    <SearchBar
                        title="Search Pharmacies"
                        description="Find pharmacies near your location."
                        placeholder="Search Pharmacies..."
                    />
        
                    <div className="mt-5">
                        <DistanceFilter />
                    </div>
                    <div className="
                        mt-8
                        grid
                        grid-cols-1
                        gap-6
                        lg:grid-cols-[420px_1fr]
                    ">
                        <div className="
                            space-y-5
                            lg:h-[calc(100vh-220px)]
                            lg:overflow-y-auto
                            pr-2
                        ">
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
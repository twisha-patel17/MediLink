import DashboardLayout from "../layouts/DashboardLayout";

import {SearchBar} from "../components/common/SearchBar";
import {DistanceFilter} from "../components/common/DistanceFilter";
import {BloodBankCard} from "../components/cards/BloodBankCard";
import {Map} from "../components/common/Map";

export const BloodBanksPage = () => {
    return (
        <DashboardLayout>
        
                    <SearchBar
                        title="Search Blood Banks"
                        description="Find blood banks near your location."
                        placeholder="Search Blood Banks..."
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
                            <BloodBankCard />
                            <BloodBankCard />
                            <BloodBankCard />
                        </div>
                        <div className="lg:sticky lg:top-5 lg:h-150">
                            <Map />
                        </div>
                    </div>
                </DashboardLayout>
    );
};

export default BloodBanksPage;
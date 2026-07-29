import { DashboardLayout } from "../layouts/DashboardLayout";
import { SavedPlacesCard } from "../components/cards/SavedPlacesCard";

export const SavedPharmaciesPage = () => {
    return (
        <DashboardLayout>
            <div className="space-y-8">

                <div>
                    <h1 className="text-4xl font-bold text-[#11131A]">
                        Saved Pharmacies
                    </h1>

                    <p className="mt-2 text-[#6B7280]">
                        Access all of your saved pharmacies in one place.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <SavedPlacesCard />
                    <SavedPlacesCard />
                    <SavedPlacesCard />
                </div>

            </div>
        </DashboardLayout>
    );
};

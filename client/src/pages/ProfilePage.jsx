import DashboardLayout from "../layouts/DashboardLayout";

import { ProfileCard } from "../components/profile/ProfileCard";
import { SettingsCard } from "../components/profile/SettingsCard";
import { SavedPlacesCard } from "../components/profile/SavedPlacesCard";
import { DeleteAccountCard } from "../components/profile/DeleteAccountCard";

export const ProfilePage = () => {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (
        <DashboardLayout>

            <div className="grid grid-cols-2 gap-8">

                <ProfileCard />

                <SettingsCard />

                <SavedPlacesCard />

                <DeleteAccountCard
                    isGoogleUser={user?.isGoogleUser}
                />

            </div>

        </DashboardLayout>
    );
};

export default ProfilePage;
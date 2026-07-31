import DashboardLayout from "../layouts/DashboardLayout";

import { ProfileCard } from "../components/profile/ProfileCard";
import { SettingsCard } from "../components/profile/SettingsCard";
import { DeleteAccountCard } from "../components/profile/DeleteAccountCard";
import { EmergencyContact } from "../components/profile/EmergencyContact";

export const ProfilePage = () => {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (

        <DashboardLayout>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

                <ProfileCard />

                <SettingsCard />

                <EmergencyContact />

                <DeleteAccountCard
                    isGoogleUser={user?.isGoogleUser}
                />

            </div>

        </DashboardLayout>

    );

};

export default ProfilePage;
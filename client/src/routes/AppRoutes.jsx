import { Route, Routes } from "react-router-dom";

import { LandingPage } from "../pages/LandingPage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { ProfilePage } from "../pages/ProfilePage";
import { HospitalsPage } from "../pages/HospitalsPage";
import { BloodBanksPage } from "../pages/BloodBanksPage";
import { PharmaciesPage } from "../pages/PharmaciesPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/hospitals" element={<HospitalsPage />} />
            <Route path="/bloodbanks" element={<BloodBanksPage />} />
            <Route path="/pharmacies" element={<PharmaciesPage />} />
            <Route
                path="*"
                element={<NotFoundPage />}
            />
        </Routes>
    );
};
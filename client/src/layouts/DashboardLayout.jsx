import {  Navbar } from "../components/common/Navbar";

export const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">

            <Navbar />

            <main className="mx-auto max-w-7xl px-8 py-8">
                {children}
            </main>

        </div>
    );
};

export default DashboardLayout;
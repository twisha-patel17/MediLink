import { Link } from "react-router-dom";

export const AuthSidePanel = ({ type }) => {
    return (
        <div className="relative flex h-screen flex-1 flex-col items-center justify-center bg-linear-to-b from-[#E7EDFC] to-[#FDF0DA] px-10">

            <Link
                to="/"
                className="absolute left-8 top-8 rounded-lg bg-white px-4 py-2 font-medium text-[#11131A] shadow-md transition hover:text-[#1D4ED8]"
            >
                ← Back
            </Link>

            {type === "login" ? (
                <div className="relative mb-10">

                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#1D4ED8] shadow-lg">
                        <span className="text-5xl text-white">+</span>
                    </div>

                    <div className="absolute -bottom-6 -left-4 h-20 w-20 rounded-full border-2 border-dashed border-[#F5A623]" />

                </div>

            ) : (

                <div className="mb-10 rounded-3xl border-2 border-[#1D4ED8] bg-white p-5 shadow-lg">

                    <div className="mx-auto h-14 w-14 rounded-full bg-[#E7EDFC]" />

                    <div className="mt-4 h-3 w-20 rounded-full bg-[#E2E4EC]" />

                    <div className="mt-2 h-3 w-14 rounded-full bg-[#E2E4EC]" />

                    <div className="mt-4 h-4 w-16 rounded-full bg-[#F5A623]" />

                </div>

            )}

            <h2 className="font-heading text-center text-4xl font-bold text-[#11131A]">

                {type === "login"
                    ? "Find Care Near You"
                    : "Save What Matters"}

            </h2>
            <p className="mt-4 max-w-sm text-center leading-7 text-[#6B7280]">

                {type === "login"
                    ? "Locate nearby hospitals, pharmacies and blood banks in seconds with MediLink."
                    : "Save your favourite places, recent searches and personalise your experience."}

            </p>
            <div className="mt-10 space-y-3">

                {type === "login" ? (
                    <>
                        <Feature text="Nearby Hospitals" />
                        <Feature text="Live Directions" />
                        <Feature text="Quick Resource Search" />
                    </>
                ) : (
                    <>
                        <Feature text="Saved Places" />
                        <Feature text="Recent Searches" />
                        <Feature text="Personalised Experience" />
                    </>
                )}

            </div>

        </div>
    );
};

const Feature = ({ text }) => {
    return (
        <div className="rounded-xl bg-white px-5 py-3 shadow-md">
            <p className="font-medium text-[#11131A]">
                {text}
            </p>
        </div>
    );
};
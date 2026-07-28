import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/authHelpers";

export const HeroSection = () => {

    const navigate = useNavigate();

    const handleExplore = () => {
        if (isLoggedIn()) {
            navigate("/hospitals");
        } else {
            navigate("/login");
        }
    };

    const handleSignup = () => {
        if (isLoggedIn()) {
            navigate("/hospitals");
        } else {
            navigate("/signup");
        }
    };

    return (
        <section id="home" className="bg-[#F5F6FA]">

            <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row">

                <div className="flex-1">

                    <h1 className="font-heading text-5xl font-bold leading-tight text-[#11131A] lg:text-7xl">
                        Healthcare, Connected <br />
                        <span className="text-[#1D4ED8]">
                            When You Need It Most.
                        </span>
                    </h1>

                    <p className="mt-8 max-w-xl text-lg leading-8 text-[#6B7280]">
                        Find nearby hospitals, pharmacies and blood banks in seconds with maps,
                        directions and saved places always within your reach.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">

                        <button
                            onClick={handleExplore}
                            className="rounded-xl bg-[#1D4ED8] px-7 py-4 font-semibold text-white transition hover:bg-[#15359E]"
                        >
                            Explore Hospitals
                        </button>

                        <button
                            onClick={handleSignup}
                            className="rounded-xl border border-[#E2E4EC] bg-white px-7 py-4 font-semibold text-[#11131A] transition hover:border-[#1D4ED8] hover:text-[#1D4ED8]"
                        >
                            Create Account
                        </button>

                    </div>

                </div>

                <div className="flex-1">

                    <div className="space-y-6 rounded-3xl border border-[#E2E4EC] bg-white p-10 shadow-lg">

                        <div className="rounded-2xl bg-[#E7EDFC] p-5">
                            <h3 className="text-lg font-semibold text-[#1D4ED8]">
                                Hospitals
                            </h3>
                            <p className="mt-2 text-[#6B7280]">
                                Find nearby emergency and speciality hospitals.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-[#FDF0DA] p-5">
                            <h3 className="text-lg font-semibold text-[#11131A]">
                                Blood Banks
                            </h3>
                            <p className="mt-2 text-[#6B7280]">
                                Quickly locate blood availability near you.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-[#E7F7EE] p-5">
                            <h3 className="text-lg font-semibold text-[#16A34A]">
                                Pharmacies
                            </h3>
                            <p className="mt-2 text-[#6B7280]">
                                Search pharmacies that are open around the clock.
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};
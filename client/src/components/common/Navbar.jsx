import { NavLink } from "react-router-dom";
import logo from "../../assets/medilink-icon.png";

import { useCurrentUser } from "../../hooks/useUser";

export const Navbar = () => {
    const { data: user } = useCurrentUser();

    const firstLetter =
        user?.name?.charAt(0).toUpperCase() || "?";

    return (
        <nav className="border-b border-[#E2E4EC] bg-white shadow-sm">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

                <NavLink
                    to="/hospitals"
                    className="flex items-center gap-3"
                >
                    <div
                        className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[#1D4ED8]
                        text-white
                        shadow-sm
                        "
                    >
                        <img src={logo} alt="MediLink Logo" className="h-8 w-8" />
                    </div>

                    <h1
                        className="
                        text-3xl
                        font-bold
                        tracking-tight
                        text-[#1D4ED8]
                        "
                    >
                        MediLink
                    </h1>
                </NavLink>

                <div className="flex items-center gap-3">

                    <NavLink
                        to="/hospitals"
                        className={({ isActive }) =>
                            `rounded-xl px-5 py-2.5 font-medium transition ${
                                isActive
                                    ? "bg-[#1D4ED8] text-white"
                                    : "text-[#6B7280] hover:bg-[#E7EDFC] hover:text-[#1D4ED8]"
                            }`
                        }
                    >
                        Hospital
                    </NavLink>


                    <NavLink
                        to="/pharmacies"
                        className={({ isActive }) =>
                            `rounded-xl px-5 py-2.5 font-medium transition ${
                                isActive
                                    ? "bg-[#1D4ED8] text-white"
                                    : "text-[#6B7280] hover:bg-[#E7EDFC] hover:text-[#1D4ED8]"
                            }`
                        }
                    >
                        Pharmacy
                    </NavLink>


                    <NavLink
                        to="/bloodbanks"
                        className={({ isActive }) =>
                            `rounded-xl px-5 py-2.5 font-medium transition ${
                                isActive
                                    ? "bg-[#1D4ED8] text-white"
                                    : "text-[#6B7280] hover:bg-[#E7EDFC] hover:text-[#1D4ED8]"
                            }`
                        }
                    >
                        Blood Bank
                    </NavLink>

                </div>

                <NavLink
                    to="/profile"
                    className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-[#E7EDFC]
                    text-lg
                    font-semibold
                    text-[#1D4ED8]
                    transition
                    hover:bg-[#D7E3FF]
                    "
                >
                    {firstLetter}
                </NavLink>

            </div>

        </nav>
    );
};

export default Navbar;

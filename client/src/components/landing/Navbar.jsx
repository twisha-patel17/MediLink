import { Link } from "react-router-dom";
import logo from "../../assets/medilink-icon.png";

export const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 border-b border-[#E2E4EC] bg-white/90 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

                <div className="flex items-center gap-2">
                    <img src={logo} alt="MediLink Logo" className="h-10 w-10" />
                    <h1 className="font-heading text-3xl font-bold text-[#1D4ED8]">
                        MediLink
                    </h1>
                </div>

                <ul className="flex items-center gap-10 text-[15px] font-medium text-[#11131A]">
                    <li><a href="#home" className="hover:text-[#1D4ED8]">Home</a></li>
                    <li><a href="#services" className="hover:text-[#1D4ED8]">Services</a></li>
                    <li><a href="#features" className="hover:text-[#1D4ED8]">Features</a></li>
                </ul>

                <div className="flex items-center gap-4">
                    <Link
                        to="/login"
                        className="rounded-xl px-5 py-2.5 font-medium text-[#11131A] hover:text-[#1D4ED8]"
                    >
                        Login
                    </Link>

                    <Link
                        to="/signup"
                        className="rounded-xl bg-[#1D4ED8] px-6 py-2.5 font-medium text-white hover:bg-[#15359E]"
                    >
                        Sign Up
                    </Link>
                </div>

            </div>
        </nav>
    );
};
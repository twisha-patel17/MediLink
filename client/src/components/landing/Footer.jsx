import { Link } from "react-router-dom";
export const Footer = () => {
    return (
        <footer className="bg-[#0E1420] py-20">

            <div className="mx-auto max-w-7xl px-6">

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

                    <div>

                        <h2 className="font-heading text-4xl font-bold text-white">
                            MediLink
                        </h2>

                        <p className="mt-5 leading-8 text-gray-300">
                            Connecting healthcare resources whenever
                            you need them.
                        </p>

                    </div>

                    <div>

    <h3 className="text-xl font-semibold text-white">
        Quick Links
    </h3>

    <ul className="mt-5 space-y-4 text-gray-300">

        <li>
            <Link
                to="/"
                className="hover:text-white"
            >
                Home
            </Link>
        </li>

        <li>
            <a
                href="#services"
                className="hover:text-white"
            >
                Services
            </a>
        </li>

        <li>
            <a
                href="#features"
                className="hover:text-white"
            >
                Features
            </a>
        </li>

        <li>
            <Link
                to="/login"
                className="hover:text-white"
            >
                Login
            </Link>
        </li>

    </ul>

</div>

                </div>
                <div className="my-12 h-px bg-gray-700"></div>

                <div className="flex flex-col items-center justify-between gap-5 text-center text-gray-400 lg:flex-row">

                    <p>
                        © 2026 MediLink. All rights reserved.
                    </p>

                    <p>
                        Made with ❤ in India.
                    </p>

                </div>

            </div>

        </footer>
    );
};
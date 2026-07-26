import { Link } from "react-router-dom";

export const SignUpForm = () => {
    return (
        <div className="flex flex-1 items-center justify-center bg-white px-16">

            <div className="w-full max-w-sm">

                <h1 className="font-heading text-4xl font-bold text-[#11131A]">
                    Create Account
                </h1>

                <p className="mt-2 text-base text-[#6B7280]">
                    Join MediLink and save your favourite places.
                </p>
                <div className="mt-8">
                    <label className="font-medium text-[#11131A]">
                        Full Name
                    </label>

                    <input
                        type="text"
                        placeholder="Name"
                        className="mt-2 w-full rounded-lg border border-[#E2E4EC] px-4 py-3 outline-none focus:border-[#1D4ED8]"
                    />
                </div>
                <div className="mt-5">
                    <label className="font-medium text-[#11131A]">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="name@email.com"
                        className="mt-2 w-full rounded-lg border border-[#E2E4EC] px-4 py-3 outline-none focus:border-[#1D4ED8]"
                    />
                </div>
                <div className="mt-5">
                    <label className="font-medium text-[#11131A]">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="••••••••"
                        className="mt-2 w-full rounded-lg border border-[#E2E4EC] px-4 py-3 outline-none focus:border-[#1D4ED8]"
                    />
                </div>

                <div className="mt-5">
                    <label className="font-medium text-[#11131A]">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        placeholder="••••••••"
                        className="mt-2 w-full rounded-lg border border-[#E2E4EC] px-4 py-3 outline-none focus:border-[#1D4ED8]"
                    />
                </div>
                <button
                    className="
                    mt-7
                    w-full
                    rounded-lg
                    bg-[#1D4ED8]
                    py-3.5
                    font-semibold
                    text-white
                    transition
                    hover:bg-[#15359E]
                    "
                >
                    Sign Up
                </button>
                <p className="mt-6 text-center text-[#6B7280]">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-[#1D4ED8]"
                    >
                        Log In
                    </Link>
                </p>

            </div>

        </div>
    );
};
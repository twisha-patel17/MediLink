import { Link } from "react-router-dom";

export const LoginForm = () => {
    return (
        <div className="flex flex-1 items-center justify-center bg-white px-20">

            <div className="w-full max-w-md">

                <h1 className="font-heading text-5xl font-bold text-[#11131A]">
                    Welcome Back
                </h1>

                <p className="mt-3 text-lg text-[#6B7280]">
                    Log in to find care near you.
                </p>

                <div className="mt-10">
                    <label className="font-medium text-[#11131A]">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="name@email.com"
                        className="mt-2 w-full rounded-xl border border-[#E2E4EC] px-5 py-4 outline-none focus:border-[#1D4ED8]"
                    />
                </div>

                <div className="mt-6">
                    <label className="font-medium text-[#11131A]">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="••••••••"
                        className="mt-2 w-full rounded-xl border border-[#E2E4EC] px-5 py-4 outline-none focus:border-[#1D4ED8]"
                    />
                </div>

                <div className="mt-5 flex items-center gap-3">
                    <input type="checkbox" />
                    <p className="text-[#6B7280]">
                        Remember Me
                    </p>
                </div>
                <button
                    className="
                    mt-8
                    w-full
                    rounded-xl
                    bg-[#1D4ED8]
                    py-4
                    font-semibold
                    text-white
                    transition
                    hover:bg-[#15359E]
                    "
                >
                    Log In
                </button>


                <p className="mt-8 text-center text-[#6B7280]">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-semibold text-[#1D4ED8]"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>

        </div>
    );
};
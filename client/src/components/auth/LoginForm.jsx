import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

import { useLogin } from "../../hooks/useAuth";

export const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { mutate, isPending } = useLogin();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            alert("All fields are required.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert("Invalid email format.");
            return;
        }

        if (password.trim().length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        mutate({ email, password });

    };


    return (
        <div className="flex flex-1 items-center justify-center bg-white px-16">

            <div className="w-full max-w-sm">

                <h1 className="font-heading text-4xl font-bold text-[#11131A]">
                    Welcome Back
                </h1>

                <p className="mt-2 text-base text-[#6B7280]">
                    Log in to find care near you.
                </p>


                <form onSubmit={handleSubmit}>

                    <div className="mt-8">
                        <label className="font-medium text-[#11131A]">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="email@email.com"
                            className="mt-2 w-full rounded-lg border border-[#E2E4EC] px-4 py-3 outline-none focus:border-[#1D4ED8]"
                        />
                    </div>


                    <div className="mt-5">

                        <label className="font-medium text-[#11131A]">
                            Password
                        </label>

                        <div className="relative mt-2">

                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-[#E2E4EC] px-4 py-3 pr-12 outline-none focus:border-[#1D4ED8]"
                            />

                            <button
                                type="button"
                                disabled={isPending}
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>

                        </div>

                    </div>


                    <button
                        type="submit"
                        disabled={isPending}
                        className={`mt-7 w-full rounded-lg py-3.5 font-semibold text-white transition ${
                            isPending
                                ? "cursor-not-allowed bg-[#8CAEF3]"
                                : "bg-[#1D4ED8] hover:bg-[#15359E]"
                        }`}
                    >
                        {isPending ? "Logging In..." : "Log In"}
                    </button>

                </form>


                <p className="mt-6 text-center text-[#6B7280]">
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
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

import { useSignup } from "../../hooks/useAuth";
import { GoogleLoginButton } from "./GoogleLoginButton";

export const SignUpForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const { mutate, isPending } = useSignup();

    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            !name.trim() ||
            !email.trim() ||
            !password.trim() ||
            !confirmPassword.trim()
        ) {
            alert("All fields are required.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert("Invalid email format.");
            return;
        }

        if (password.trim().length < 8) {
            alert(
                "Password must be at least 8 characters long."
            );
            return;
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!passwordRegex.test(password)) {
            alert(
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
            );
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        mutate({
            name,
            email,
            password,
        });

    };

    return (

        <div className="flex flex-1 items-center justify-center bg-white px-16">

            <div className="w-full max-w-sm">

                <h1 className="font-heading text-4xl font-bold text-[#11131A]">
                    Create Account
                </h1>

                <p className="mt-2 text-base text-[#6B7280]">
                    Join MediLink and save your favourite places.
                </p>


                <form onSubmit={handleSubmit}>

                    <div className="mt-8">

                        <label className="font-medium text-[#11131A]">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
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
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
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
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-[#E2E4EC] px-4 py-3 pr-12 outline-none focus:border-[#1D4ED8]"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
                            >
                                {showPassword
                                    ? <FiEyeOff />
                                    : <FiEye />}
                            </button>

                        </div>

                    </div>


                    <div className="mt-5">

                        <label className="font-medium text-[#11131A]">
                            Confirm Password
                        </label>

                        <div className="relative mt-2">

                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-[#E2E4EC] px-4 py-3 pr-12 outline-none focus:border-[#1D4ED8]"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
                            >
                                {showConfirmPassword
                                    ? <FiEyeOff />
                                    : <FiEye />}
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
                        {isPending
                            ? "Creating Account..."
                            : "Sign Up"}
                    </button>

                </form>


                <div className="my-6 flex items-center">

                    <div className="h-px flex-1 bg-[#E2E4EC]" />

                    <span className="px-4 text-sm text-[#6B7280]">
                        OR
                    </span>

                    <div className="h-px flex-1 bg-[#E2E4EC]" />

                </div>


                <GoogleLoginButton />


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
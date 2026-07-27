import { Link } from "react-router-dom";
import { useState } from "react";

export const SignUpForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()){
            alert("All fields are required.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            alert("Invalid email format.");
            return;
        }

        if(password.trim().length < 8){
            alert("Password must be at least 8 characters long.");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if(!passwordRegex.test(password)){
            alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.");
            return;
        }

        if(password !== confirmPassword){
            alert("Passwords do not match.");
            return;
        }

        console.log({ name, email, password, confirmPassword });

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
                            onChange={handleNameChange}
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
                            onChange={handleEmailChange}
                            placeholder="email@email.com"
                            className="mt-2 w-full rounded-lg border border-[#E2E4EC] px-4 py-3 outline-none focus:border-[#1D4ED8]"
                        />
                    </div>


                    <div className="mt-5">
                        <label className="font-medium text-[#11131A]">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
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
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder="••••••••"
                            className="mt-2 w-full rounded-lg border border-[#E2E4EC] px-4 py-3 outline-none focus:border-[#1D4ED8]"
                        />
                    </div>


                    <button
                      type="submit"
                       disabled={loading}
                       className={`mt-7 w-full rounded-lg py-3.5 font-semibold text-white transition ${
                       loading
                        ? "cursor-not-allowed bg-[#8CAEF3]"
                        : "bg-[#1D4ED8] hover:bg-[#15359E]"
                        }`}
                    >
                       {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>


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
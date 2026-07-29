import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDeleteAccount } from "../../hooks/useUser";

export const DeleteAccountModal = ({
    onClose,
    isGoogleUser = false,
}) => {

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const {
        mutate,
        isPending,
    } = useDeleteAccount(); 
    
    const handleDelete = () => {

        if (!isGoogleUser && !password.trim()) {
            return;
        }

        mutate(
            {
                password,
            },
            {
                onSuccess: () => {

                    localStorage.removeItem(
                        "accessToken"
                    );

                    localStorage.removeItem(
                        "refreshToken"
                    );

                    navigate("/");

                },
            }
        );

    };


    return (

        <div
            className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            px-6
            "
        >

            <div
                className="
                w-full
                max-w-md
                rounded-3xl
                bg-white
                p-8
                shadow-xl
                "
            >

                <h2
                    className="
                    text-3xl
                    font-bold
                    text-red-600
                    "
                >
                    Delete Account
                </h2>


                <p
                    className="
                    mt-4
                    text-sm
                    leading-6
                    text-[#6B7280]
                    "
                >
                    {
                        isGoogleUser
                            ? "This action cannot be undone. Your account and all associated data will be permanently deleted."
                            : "This action cannot be undone. Please enter your password to permanently delete your account."
                    }
                </p>


                {
                    !isGoogleUser && (

                        <div className="mt-6">

                            <label
                                className="
                                font-medium
                                text-[#11131A]
                                "
                            >
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter your password"
                                className="
                                mt-2
                                w-full
                                rounded-xl
                                border
                                border-[#E2E4EC]
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-red-600
                                "
                            />

                        </div>

                    )
                }


                <div
                    className="
                    mt-8
                    flex
                    gap-4
                    "
                >

                    <button
                        onClick={onClose}
                        className="
                        flex-1
                        rounded-xl
                        border
                        border-[#E2E4EC]
                        py-3
                        font-semibold
                        "
                    >
                        Cancel
                    </button>


                    <button
                        onClick={handleDelete}
                        disabled={isPending}
                        className="
                        flex-1
                        rounded-xl
                        bg-red-600
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-red-700
                        "
                    >
                        {
                            isPending
                                ? "Deleting..."
                                : "Delete Account"
                        }
                    </button>

                </div>

            </div>

        </div>
    );
};
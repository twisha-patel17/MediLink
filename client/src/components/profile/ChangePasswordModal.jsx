import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";

import { useChangePassword } from "../../hooks/useUser";

export const ChangePasswordModal = ({ onClose }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { mutate, isPending } = useChangePassword();

    const handleSubmit = () => {
        if (
            !currentPassword.trim() ||
            !newPassword.trim() ||
            !confirmPassword.trim()
        ) {
            toast.error("All fields are required.");
            return;
        }

        if (newPassword.length < 8) {
            toast.error(
                "Password must be at least 8 characters long."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        mutate(
            { currentPassword, newPassword },
            {
                onSuccess: () => onClose(),
            }
        );
    };

    const passwordInput = (
        label,
        value,
        setValue,
        show,
        setShow,
        placeholder
    ) => (
        <div className="mt-5">
            <label className="font-medium text-[#11131A]">
                {label}
            </label>

            <div className="relative mt-2">
                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={(e) =>
                        setValue(e.target.value)
                    }
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-[#E2E4EC] px-4 py-3 pr-12 outline-none transition focus:border-[#1D4ED8]"
                />

                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
                >
                    {show ? <FiEyeOff /> : <FiEye />}
                </button>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-[#11131A]">
                    Change Password
                </h2>

                <p className="mt-2 text-sm text-[#6B7280]">
                    Keep your account secure by updating your
                    password.
                </p>

                {passwordInput(
                    "Current Password",
                    currentPassword,
                    setCurrentPassword,
                    showCurrent,
                    setShowCurrent,
                    "Enter current password"
                )}

                {passwordInput(
                    "New Password",
                    newPassword,
                    setNewPassword,
                    showNew,
                    setShowNew,
                    "Enter new password"
                )}

                {passwordInput(
                    "Confirm Password",
                    confirmPassword,
                    setConfirmPassword,
                    showConfirm,
                    setShowConfirm,
                    "Confirm new password"
                )}

                <div className="mt-8 flex gap-4">
                    <button
                        disabled={isPending}
                        onClick={onClose}
                        className="flex-1 rounded-xl border border-[#E2E4EC] py-3 font-semibold text-[#11131A] transition hover:bg-[#F8FAFC]"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={isPending}
                        onClick={handleSubmit}
                        className={`flex-1 rounded-xl py-3 font-semibold text-white transition ${
                            isPending
                                ? "cursor-not-allowed bg-[#8CAEF3]"
                                : "bg-[#1D4ED8] hover:bg-[#15359E]"
                        }`}
                    >
                        {isPending
                            ? "Changing..."
                            : "Change Password"}
                    </button>
                </div>
            </div>
        </div>
    );
};
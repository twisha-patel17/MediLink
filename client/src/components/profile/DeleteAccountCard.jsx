import { useState } from "react";

import { DeleteAccountModal } from "./DeleteAccountModal";

export const DeleteAccountCard = ({
    isGoogleUser = false,
}) => {                          
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">

                <h2 className="text-2xl font-bold text-[#11131A]">
                    Account
                </h2>
                <div className="mt-8 rounded-2xl bg-red-50 p-6 text-center">

                    <h3 className="text-xl font-semibold text-[#11131A]">
                        Delete Your Account
                    </h3>


                    <p className="mt-3 text-sm leading-6 text-[#6B7280]">
                        Permanently delete your account and all
                        of your saved healthcare resources.
                        This action cannot be undone.
                    </p>


                    <button
                        onClick={() => setIsOpen(true)}
                        className="
                        mt-6
                        rounded-2xl
                        bg-red-600
                        px-6
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-red-700
                        "
                    >
                        Delete Account
                    </button>

                </div>

            </div>


            {
                isOpen && (
                    <DeleteAccountModal
                        onClose={() =>
                            setIsOpen(false)
                        }
                        isGoogleUser={isGoogleUser}
                    />
                )
            }
        </>
    );
};
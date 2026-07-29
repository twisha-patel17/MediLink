import { useEffect, useState } from "react";

import { useUpdateProfile } from "../../hooks/useUser";
import { useCurrentUser } from "../../hooks/useUser";

export const EditProfileModal = ({ onClose }) => {

    const { data } = useCurrentUser();

    const user = data?.user;

    const [name, setName] = useState ("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if(user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const {mutate, isPending} = useUpdateProfile();

    const handleSubmit = () => {
        mutate({name, email}, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">

            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

                <h2 className="text-3xl font-bold text-[#11131A]">
                    Edit Profile
                </h2>

                <p className="mt-2 text-sm text-[#6B7280]">
                    Update your personal information.
                </p>


                <div className="mt-8">

                    <label className="font-medium text-[#11131A]">
                        Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
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
                        focus:border-[#1D4ED8]
                        "
                    />

                </div>


                <div className="mt-5">

                    <label className="font-medium text-[#11131A]">
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
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
                        focus:border-[#1D4ED8]
                        "
                    />

                </div>


                <div className="mt-8 flex gap-4">

                    <button
                        onClick={onClose}
                        disabled={isPending}
                        className="
                        flex-1
                        rounded-xl
                        border
                        border-[#E2E4EC]
                        py-3
                        font-semibold
                        text-[#11131A]
                        transition
                        hover:bg-[#F8FAFC]
                        "
                    >
                        Cancel
                    </button>


                    <button
                        onClick={handleSubmit}
                        disabled={isPending}
                        className="
                        flex-1
                        rounded-xl
                        bg-[#1D4ED8]
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-[#15359E]
                        "
                    >
                        {
                            isPending ? "Saving..." : "Save Changes"
                        }
                    </button>

                </div>

            </div>

        </div>
    );
};

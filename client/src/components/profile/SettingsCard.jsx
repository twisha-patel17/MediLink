import { FiChevronRight } from "react-icons/fi";

export const SettingsCard = () => {
    return (
        <div className="rounded-3xl border border-[#E2E4EC] bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-[#11131A]">
                Account Settings
            </h2>


            <div className="mt-8 space-y-4">

                <button
                    className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-[#E2E4EC]
                    p-5
                    transition
                    hover:border-[#1D4ED8]
                    hover:bg-[#F8FAFC]
                    "
                >

                    <div className="text-left">

                        <h3 className="font-semibold text-[#11131A]">
                            Edit Profile
                        </h3>

                        <p className="mt-1 text-sm text-[#6B7280]">
                            Update your personal details.
                        </p>

                    </div>

                    <FiChevronRight
                        className="text-xl text-[#6B7280]"
                    />

                </button>



                <button
                    className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-[#E2E4EC]
                    p-5
                    transition
                    hover:border-[#1D4ED8]
                    hover:bg-[#F8FAFC]
                    "
                >

                    <div className="text-left">

                        <h3 className="font-semibold text-[#11131A]">
                            Change Password
                        </h3>

                        <p className="mt-1 text-sm text-[#6B7280]">
                            Keep your account secure.
                        </p>

                    </div>

                    <FiChevronRight
                        className="text-xl text-[#6B7280]"
                    />

                </button>



                <button
                    className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-[#E2E4EC]
                    p-5
                    transition
                    hover:border-red-500
                    hover:bg-red-50
                    "
                >

                    <div className="text-left">

                        <h3 className="font-semibold text-[#DC2626]">
                            Logout
                        </h3>

                        <p className="mt-1 text-sm text-[#6B7280]">
                            Sign out of your account.
                        </p>

                    </div>

                    <FiChevronRight
                        className="text-xl text-[#6B7280]"
                    />

                </button>

            </div>

        </div>
    );
};
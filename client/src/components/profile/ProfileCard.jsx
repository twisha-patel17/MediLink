export const ProfileCard = () => {
    return (
        <div className="rounded-3xl border border-[#E2E4EC] bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-[#11131A]">
                Profile
            </h2>


            <div className="mt-8 flex flex-col items-center">

                <div
                    className="
                    flex
                    h-28
                    w-28
                    items-center
                    justify-center
                    rounded-full
                    bg-[#E7EDFC]
                    text-4xl
                    font-bold
                    text-[#1D4ED8]
                    "
                >
                    T
                </div>


                <h3
                    className="
                    mt-5
                    text-2xl
                    font-bold
                    text-[#11131A]
                    "
                >
                    Tishu
                </h3>


                <p
                    className="
                    mt-2
                    text-base
                    text-[#6B7280]
                    "
                >
                    tishu@gmail.com
                </p>


                <div
                    className="
                    mt-6
                    rounded-2xl
                    bg-[#F8FAFC]
                    px-5
                    py-3
                    "
                >
                    <p className="text-sm font-medium text-[#6B7280]">
                        Member Since July 2026
                    </p>
                </div>

            </div>

        </div>
    );
};
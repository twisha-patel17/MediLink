export const StatsSection = () => {
    return (
        <section className="bg-[#F5F6FA] py-20">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">
                    <h2 className="font-heading text-4xl font-bold text-[#11131A]">
                        Everything You Need
                    </h2>

                    <p className="mt-4 text-lg text-[#6B7280]">
                        Discover healthcare resources quickly, securely and whenever you need them.
                    </p>
                </div>


                <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                    <div className="rounded-3xl bg-white p-8 text-center shadow-md">
                        <h3 className="font-heading text-4xl font-bold text-[#1D4ED8]">
                            24/7
                        </h3>

                        <p className="mt-3 text-lg font-semibold text-[#11131A]">
                            Emergency Access
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-8 text-center shadow-md">
                        <h3 className="font-heading text-4xl font-bold text-[#1D4ED8]">
                            Nearby
                        </h3>

                        <p className="mt-3 text-lg font-semibold text-[#11131A]">
                            Healthcare Resources
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-8 text-center shadow-md">
                        <h3 className="font-heading text-4xl font-bold text-[#1D4ED8]">
                            Maps
                        </h3>

                        <p className="mt-3 text-lg font-semibold text-[#11131A]">
                            & Directions
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-8 text-center shadow-md">
                        <h3 className="font-heading text-4xl font-bold text-[#1D4ED8]">
                            Save
                        </h3>

                        <p className="mt-3 text-lg font-semibold text-[#11131A]">
                            Your Favourite Places
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-8 text-center shadow-md">
                        <h3 className="font-heading text-4xl font-bold text-[#1D4ED8]">
                            Secure
                        </h3>

                        <p className="mt-3 text-lg font-semibold text-[#11131A]">
                            Authentication
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-8 text-center shadow-md">
                        <h3 className="font-heading text-4xl font-bold text-[#1D4ED8]">
                            Fast
                        </h3>

                        <p className="mt-3 text-lg font-semibold text-[#11131A]">
                            Resource Search
                        </p>
                    </div>

                </div>

            </div>

        </section>
    );
};
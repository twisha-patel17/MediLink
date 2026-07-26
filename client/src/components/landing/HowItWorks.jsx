export const HowItWorks = () => {
    return (
        <section className="bg-white py-20">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <h2 className="font-heading text-4xl font-bold text-[#11131A]">
                        How MediLink Works
                    </h2>

                    <p className="mt-4 text-lg text-[#6B7280]">
                        Finding healthcare resources has never been easier.
                    </p>

                </div>


                <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-3xl bg-[#F5F6FA] p-8 text-center shadow-md">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E7EDFC] text-2xl font-bold text-[#1D4ED8]">
                            1
                        </div>

                        <h3 className="mt-6 text-2xl font-semibold text-[#11131A]">
                            Search
                        </h3>

                        <p className="mt-4 leading-7 text-[#6B7280]">
                            Search for nearby hospitals, blood banks and pharmacies.
                        </p>

                    </div>

                    <div className="rounded-3xl bg-[#F5F6FA] p-8 text-center shadow-md">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E7EDFC] text-2xl font-bold text-[#1D4ED8]">
                            2
                        </div>

                        <h3 className="mt-6 text-2xl font-semibold text-[#11131A]">
                            Find
                        </h3>

                        <p className="mt-4 leading-7 text-[#6B7280]">
                            Explore healthcare resources and view important details.
                        </p>

                    </div>

                    <div className="rounded-3xl bg-[#F5F6FA] p-8 text-center shadow-md">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E7EDFC] text-2xl font-bold text-[#1D4ED8]">
                            3
                        </div>

                        <h3 className="mt-6 text-2xl font-semibold text-[#11131A]">
                            Navigate
                        </h3>

                        <p className="mt-4 leading-7 text-[#6B7280]">
                            Get directions instantly using integrated maps.
                        </p>

                    </div>

                    <div className="rounded-3xl bg-[#F5F6FA] p-8 text-center shadow-md">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E7EDFC] text-2xl font-bold text-[#1D4ED8]">
                            4
                        </div>

                        <h3 className="mt-6 text-2xl font-semibold text-[#11131A]">
                            Save
                        </h3>

                        <p className="mt-4 leading-7 text-[#6B7280]">
                            Save your favourite places for quicker access later.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
};
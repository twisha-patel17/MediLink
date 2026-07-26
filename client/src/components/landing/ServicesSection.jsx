export const ServicesSection = () => {
    return (
        <section id="services" className="bg-[#F5F6FA] py-20">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <h2 className="font-heading text-4xl font-bold text-[#11131A]">
                        Our Services
                    </h2>

                    <p className="mt-4 text-lg text-[#6B7280]">
                        Find healthcare resources quickly and navigate to them with ease.
                    </p>

                </div>


                <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">


                    {/* Hospitals */}

                    <div className="rounded-3xl bg-white p-8 shadow-md transition hover:-translate-y-2">

                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E7EDFC] text-3xl">
                            🏥
                        </div>

                        <h3 className="text-2xl font-semibold text-[#11131A]">
                            Hospitals
                        </h3>

                        <p className="mt-4 leading-7 text-[#6B7280]">
                            Find nearby hospitals with maps, directions and important healthcare information.
                        </p>

                        <button className="mt-8 font-semibold text-[#1D4ED8] hover:text-[#15359E]">
                            Explore →
                        </button>

                    </div>


                    {/* Blood Banks */}

                    <div className="rounded-3xl bg-white p-8 shadow-md transition hover:-translate-y-2">

                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FCEAEA] text-3xl">
                            🩸
                        </div>

                        <h3 className="text-2xl font-semibold text-[#11131A]">
                            Blood Banks
                        </h3>

                        <p className="mt-4 leading-7 text-[#6B7280]">
                            Locate blood banks near you and get directions whenever required.
                        </p>

                        <button className="mt-8 font-semibold text-[#1D4ED8] hover:text-[#15359E]">
                            Explore →
                        </button>

                    </div>


                    {/* Pharmacies */}

                    <div className="rounded-3xl bg-white p-8 shadow-md transition hover:-translate-y-2">

                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E7F7EE] text-3xl">
                            💊
                        </div>

                        <h3 className="text-2xl font-semibold text-[#11131A]">
                            Pharmacies
                        </h3>

                        <p className="mt-4 leading-7 text-[#6B7280]">
                            Search nearby pharmacies that are open and easily accessible.
                        </p>

                        <button className="mt-8 font-semibold text-[#1D4ED8] hover:text-[#15359E]">
                            Explore →
                        </button>

                    </div>


                </div>

            </div>

        </section>
    );
};

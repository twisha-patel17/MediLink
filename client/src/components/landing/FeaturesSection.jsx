export const FeaturesSection = () => {
    return (
        <section id="features" className="bg-[#F5F6FA] py-20">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <h2 className="font-heading text-4xl font-bold text-[#11131A]">
                        Why Choose MediLink?
                    </h2>

                    <p className="mt-4 text-lg text-[#6B7280]">
                        Designed to make healthcare resources easy to discover and access.
                    </p>

                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

                    <div className="rounded-3xl bg-white p-8 shadow-md">
                        <h3 className="text-2xl font-semibold text-[#11131A]">
                            Save Places
                        </h3>

                        <p className="mt-4 leading-7 text-[#6B7280]">
                            Save your favourite healthcare resources for quicker access whenever required.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-md">
                        <h3 className="text-2xl font-semibold text-[#11131A]">
                            Maps & Directions
                        </h3>

                        <p className="mt-4 leading-7 text-[#6B7280]">
                            Navigate effortlessly using integrated maps and directions.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-md">
                        <h3 className="text-2xl font-semibold text-[#11131A]">
                            Nearby Search
                        </h3>

                        <p className="mt-4 leading-7 text-[#6B7280]">
                            Discover nearby hospitals, pharmacies and blood banks instantly.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-md">
                        <h3 className="text-2xl font-semibold text-[#11131A]">
                            Secure Account
                        </h3>

                        <p className="mt-4 leading-7 text-[#6B7280]">
                            Manage your profile securely with authentication support.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-md">
                        <h3 className="text-2xl font-semibold text-[#11131A]">
                            Recent Searches
                        </h3>

                        <p className="mt-4 leading-7 text-[#6B7280]">
                            Quickly revisit healthcare resources you've searched before.
                        </p>
                    </div>
                    <div className="rounded-3xl bg-white p-8 shadow-md">
                        <h3 className="text-2xl font-semibold text-[#11131A]">
                            Clean Interface
                        </h3>

                        <p className="mt-4 leading-7 text-[#6B7280]">
                            A simple and intuitive experience designed for healthcare navigation.
                        </p>
                    </div>

                </div>

            </div>

        </section>
    );
};
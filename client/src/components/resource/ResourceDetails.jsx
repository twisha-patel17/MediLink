import { FiMapPin, FiPhone, FiGlobe, FiStar } from "react-icons/fi";

export const ResourceDetails = () => {
    return (
        <div className="
            rounded-2xl
            border
            border-[#E2E4EC]
            bg-white
            p-5
            shadow-sm
            sm:p-6
        ">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-4">

                    <div className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[#E7EDFC]
                        text-2xl
                    ">
                        🏥
                    </div>


                    <div>

                        <h1 className="
                            text-2xl
                            font-bold
                            text-[#11131A]
                            sm:text-3xl
                        ">
                            Apollo Hospital
                        </h1>


                        <div className="mt-2 flex items-center gap-2">

                            <span className="
                                flex
                                items-center
                                gap-1
                                rounded-lg
                                bg-yellow-50
                                px-3
                                py-1
                                text-sm
                                font-semibold
                                text-yellow-600
                            ">
                                <FiStar size={14}/>
                                4.8
                            </span>


                            <span className="
                                rounded-lg
                                bg-green-50
                                px-3
                                py-1
                                text-sm
                                font-medium
                                text-green-600
                            ">
                                Open Now
                            </span>

                        </div>

                    </div>
                </div>
                <span className="
                    rounded-xl
                    bg-[#E7EDFC]
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-[#1D4ED8]
                ">
                    2 KM Away
                </span>

            </div>
            <div className="
                mt-8
                grid
                gap-4
                sm:grid-cols-2
            ">
                <InfoCard
                    icon={<FiMapPin />}
                    title="Address"
                    value="Ahmedabad, Gujarat"
                />
                <InfoCard
                    icon={<FiPhone />}
                    title="Phone"
                    value="+91 XXXXX XXXXX"
                />
                <InfoCard
                    icon={<FiGlobe />}
                    title="Website"
                    value="www.apollo.com"
                />
            </div>
            <div className="
                mt-8
                grid
                gap-3
                sm:grid-cols-3
            ">

                <button className="
                    rounded-xl
                    bg-[#1D4ED8]
                    py-3
                    font-medium
                    text-white
                    transition
                    hover:bg-[#15359E]
                ">
                    Get Directions
                </button>


                <button className="
                    rounded-xl
                    border
                    border-[#1D4ED8]
                    py-3
                    font-medium
                    text-[#1D4ED8]
                    transition
                    hover:bg-[#E7EDFC]
                ">
                    Save Place
                </button>


                <button className="
                    rounded-xl
                    border
                    border-green-600
                    py-3
                    font-medium
                    text-green-600
                    transition
                    hover:bg-green-50
                ">
                    Call Now
                </button>


            </div>


        </div>
    );
};



const InfoCard = ({icon, title, value}) => {
    return (
        <div className="
            rounded-xl
            bg-[#F8FAFC]
            p-4
        ">

            <div className="
                flex
                items-center
                gap-2
                text-[#1D4ED8]
            ">
                {icon}

                <h3 className="
                    font-semibold
                    text-[#11131A]
                ">
                    {title}
                </h3>

            </div>


            <p className="
                mt-2
                text-sm
                text-[#6B7280]
            ">
                {value}
            </p>


        </div>
    );
};

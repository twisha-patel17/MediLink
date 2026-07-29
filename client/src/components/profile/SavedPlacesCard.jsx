import { useNavigate } from "react-router-dom";

export const SavedPlacesCard = () => {

    const navigate = useNavigate();

    return (
        <div className="rounded-3xl border border-[#E2E4EC] bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-[#11131A]">
                Saved Places
            </h2>

            <div className="mt-8 space-y-4">

                <button
                    onClick={() =>
                        navigate("/savedplaces/hospitals")
                    }
                    className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-[#E2E4EC]
                    bg-[#F8FAFC]
                    p-5
                    transition
                    hover:border-[#1D4ED8]
                    hover:bg-[#EEF4FF]
                    "
                >
                    <h3 className="font-semibold text-[#11131A]">
                        Hospitals
                    </h3>

                    <span
                        className="
                        rounded-full
                        bg-[#E7EDFC]
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-[#1D4ED8]
                        "
                    >
                        5 Saved
                    </span>
                </button>


                <button
                    onClick={() =>
                        navigate("/savedplaces/pharmacies")
                    }
                    className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-[#E2E4EC]
                    bg-[#F8FAFC]
                    p-5
                    transition
                    hover:border-[#1D4ED8]
                    hover:bg-[#EEF4FF]
                    "
                >
                    <h3 className="font-semibold text-[#11131A]">
                        Pharmacies
                    </h3>

                    <span
                        className="
                        rounded-full
                        bg-[#E7EDFC]
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-[#1D4ED8]
                        "
                    >
                        3 Saved
                    </span>
                </button>


                <button
                    onClick={() =>
                        navigate("/savedplaces/bloodbanks")
                    }
                    className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-[#E2E4EC]
                    bg-[#F8FAFC]
                    p-5
                    transition
                    hover:border-[#1D4ED8]
                    hover:bg-[#EEF4FF]
                    "
                >
                    <h3 className="font-semibold text-[#11131A]">
                        Blood Banks
                    </h3>

                    <span
                        className="
                        rounded-full
                        bg-[#E7EDFC]
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-[#1D4ED8]
                        "
                    >
                        2 Saved
                    </span>
                </button>

            </div>

        </div>
    );
};
import { useNavigate } from "react-router-dom";

export const PharmacyCard = ({id}) => {

    const navigate = useNavigate();

    return (

        <div className="rounded-2xl border border-[#E2E4EC] bg-white p-6 shadow-sm">

            <h2 className="text-2xl font-semibold text-[#11131A]">
                Apollo Pharmacy
            </h2>

            <p className="mt-2 font-medium text-[#1D4ED8]">
                ★ 4.7
            </p>

            <div className="mt-3 flex items-center justify-between">

                <p className="font-medium text-green-600">
                    Open Now
                </p>

                <p className="text-[#6B7280]">
                    1 KM Away
                </p>

            </div>

            <p className="mt-2 text-[#6B7280]">
                Ahmedabad, Gujarat
            </p>

            <button
                onClick={() => navigate(`/resource/${id}`)}
                className="mt-6 w-full rounded-xl bg-[#1D4ED8] py-3 font-medium text-white transition hover:bg-[#15359E]"
            >
                View Details
            </button>

        </div>

    );
};

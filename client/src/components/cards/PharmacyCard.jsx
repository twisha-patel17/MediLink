import { FiStar } from "react-icons/fi";

export const PharmacyCard = ({ place }) => {
    const distance = place.distanceKm;
    const duration = place.durationMin;
    const isDriving = place.isDrivingDistance;

    const hasRating = place.rating != null;

    return (
        <div
            className="
            rounded-2xl
            border
            border-[#E2E4EC]
            bg-white
            p-6
            shadow-sm
            "
        >
            <h2
                className="
                text-2xl
                font-semibold
                text-[#11131A]
                "
            >
                {place.displayName?.text}
            </h2>

            <div className="mt-3 flex flex-wrap gap-3">
                <span
                    className="
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
                    "
                >
                    <FiStar />
                    {hasRating ? place.rating : "No Rating"}
                </span>

                {distance != null && (
                    <span
                        className="
                        rounded-lg
                        bg-blue-50
                        px-3
                        py-1
                        text-sm
                        font-medium
                        text-blue-600
                        "
                    >
                        {distance} KM
                        {isDriving && duration != null
                            ? ` · ${duration} min drive`
                            : " (approx.)"}
                    </span>
                )}
            </div>

            <p
                className="
                mt-4
                font-medium
                text-green-600
                "
            >
                Pharmacy / Medical Store
            </p>

            <p
                className="
                mt-2
                text-[#6B7280]
                "
            >
                Medicine Available Nearby
            </p>

            <p
                className="
                mt-1
                text-[#6B7280]
                "
            >
                {place.formattedAddress}
            </p>

            <div
                className="
                mt-6
                flex
                gap-3
                "
            >
                <button
                    onClick={() =>
                        window.open(place.googleMapsUri, "_blank")
                    }
                    className="
                    flex-1
                    rounded-xl
                    bg-[#1D4ED8]
                    py-3
                    font-medium
                    text-white
                    transition
                    hover:bg-[#15359E]
                    "
                >
                    Open in Maps
                </button>

                <button
                    onClick={() =>
                        window.open(
                            `https://www.google.com/search?q=${encodeURIComponent(
                                place.displayName?.text || ""
                            )}`,
                            "_blank"
                        )
                    }
                    className="
                    flex-1
                    rounded-xl
                    border
                    border-[#E2E4EC]
                    py-3
                    font-medium
                    transition
                    hover:border-[#1D4ED8]
                    hover:text-[#1D4ED8]
                    "
                >
                    Search Online
                </button>
            </div>
        </div>
    );
};

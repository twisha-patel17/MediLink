import {
    FiMapPin,
    FiPhone,
    FiGlobe,
    FiStar,
} from "react-icons/fi";

export const HospitalCard = ({ place, currentLocation }) => {
    const openNow = place.regularOpeningHours?.openNow;

    // distanceKm now comes pre-attached from useNearbyPlaces / useBloodBanks
    // (calculated once there, sorted there) instead of being recalculated
    // separately here on every render.
    const distance = place.distanceKm;

    const hasRating = place.rating != null;

    const directionsUrl =
        currentLocation && place.location
            ? `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.lat},${currentLocation.lng}&destination=${place.location.latitude},${place.location.longitude}&destination_place_id=${place.id}`
            : place.googleMapsUri;

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

                <span
                    className={`
                    rounded-lg
                    px-3
                    py-1
                    text-sm
                    font-medium

                    ${
                        openNow
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-600"
                    }
                    `}
                >
                    {openNow ? "Open Now" : "Status Unknown"}
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
                    </span>
                )}
            </div>

            <div className="mt-5 space-y-3">
                <p
                    className="
                    flex
                    items-start
                    gap-2
                    text-[#6B7280]
                    "
                >
                    <FiMapPin className="mt-1" />
                    {place.formattedAddress}
                </p>

                <p
                    className="
                    flex
                    items-center
                    gap-2
                    text-[#6B7280]
                    "
                >
                    <FiPhone />
                    {place.nationalPhoneNumber ||
                        "Phone Number Not Available"}
                </p>

                <p
                    className="
                    flex
                    items-center
                    gap-2
                    text-[#6B7280]
                    break-all
                    "
                >
                    <FiGlobe />
                    {place.websiteUri || "Website Not Available"}
                </p>
            </div>

            <div className="mt-6 flex gap-3">
                <button
                    onClick={() =>
                        window.open(directionsUrl, "_blank")
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
                    Get Directions
                </button>

                <button
                    onClick={() =>
                        window.open(place.googleMapsUri, "_blank")
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
                    Open Maps
                </button>
            </div>
        </div>
    );
};
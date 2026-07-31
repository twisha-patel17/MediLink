import { useState } from "react";
import {
    APIProvider,
    Map as GoogleMap,
    AdvancedMarker,
    Pin,
    useMap,
} from "@vis.gl/react-google-maps";

// Custom zoom in/out buttons, since the default Google Maps zoom
// control can look inconsistent with the rest of the UI. Uses the
// useMap() hook to get the underlying map instance directly.
const ZoomControls = () => {
    const map = useMap();

    if (!map) return null;

    const handleZoomIn = () => {
        map.setZoom((map.getZoom() || 14) + 1);
    };

    const handleZoomOut = () => {
        map.setZoom((map.getZoom() || 14) - 1);
    };

    return (
        <div
            className="
            absolute
            bottom-6
            right-4
            z-10
            flex
            flex-col
            overflow-hidden
            rounded-xl
            border
            border-[#E2E4EC]
            bg-white
            shadow-md
            "
        >
            <button
                type="button"
                onClick={handleZoomIn}
                aria-label="Zoom in"
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                text-xl
                font-semibold
                text-[#11131A]
                transition
                hover:bg-[#F8FAFC]
                "
            >
                +
            </button>

            <div className="h-px w-full bg-[#E2E4EC]" />

            <button
                type="button"
                onClick={handleZoomOut}
                aria-label="Zoom out"
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                text-xl
                font-semibold
                text-[#11131A]
                transition
                hover:bg-[#F8FAFC]
                "
            >
                −
            </button>
        </div>
    );
};

export const Map = ({ currentLocation, places = [] }) => {
    // Controlled zoom - starts at 14, changes as the user
    // scrolls/pinches/clicks the custom buttons.
    const [zoom, setZoom] = useState(14);

    if (!currentLocation) {
        return <h1>Fetching your location...</h1>;
    }

    return (
        <APIProvider
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={["marker"]}
        >
            <div className="relative">
                <GoogleMap
                    mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
                    center={currentLocation}
                    zoom={zoom}
                    onZoomChanged={(event) =>
                        setZoom(event.detail.zoom)
                    }
                    // "greedy" makes a plain mouse-wheel scroll zoom
                    // the map directly, instead of requiring
                    // Ctrl/Cmd + scroll (the vis.gl default).
                    gestureHandling="greedy"
                    // Explicitly enable the built-in zoom control too,
                    // so users have both the native +/- and this one
                    // in case native rendering differs by browser.
                    zoomControl={true}
                    disableDefaultUI={false}
                    style={{
                        width: "100%",
                        height: "500px",
                    }}
                >
                    {/* User Location */}
                    <AdvancedMarker position={currentLocation}>
                        <Pin scale={1.3} />
                    </AdvancedMarker>

                    {/* Nearby Places */}
                    {places.map((place) => (
                        <AdvancedMarker
                            key={place.id}
                            position={{
                                lat: place.location.latitude,
                                lng: place.location.longitude,
                            }}
                        >
                            <Pin
                                background="#DC2626"
                                borderColor="#991B1B"
                                glyphColor="#FFFFFF"
                            />
                        </AdvancedMarker>
                    ))}

                    <ZoomControls />
                </GoogleMap>
            </div>
        </APIProvider>
    );
};
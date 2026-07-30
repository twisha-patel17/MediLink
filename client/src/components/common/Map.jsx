import { APIProvider, Map as GoogleMap } from "@vis.gl/react-google-maps";

export const Map = () => {
    return (
        <div className="rounded-2xl border border-[#E2E4EC] bg-white p-6">

            <h2 className="text-xl font-semibold text-[#11131A]">
                Nearby Results
            </h2>

            <div className="mt-5 h-96 overflow-hidden rounded-2xl">

                <APIProvider
                    apiKey={
                        import.meta.env
                            .VITE_GOOGLE_MAPS_API_KEY
                    }
                >
                    <GoogleMap
                        defaultCenter={{
                            lat: 23.0225,
                            lng: 72.5714,
                        }}
                        defaultZoom={13}
                        gestureHandling={"greedy"}
                        disableDefaultUI={false}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    />

                </APIProvider>

            </div>

        </div>
    );
};
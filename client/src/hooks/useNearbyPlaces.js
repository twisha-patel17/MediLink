import { useEffect, useState } from "react";

import {
    getNearbyPlaces,
    calculateDistance,
    getDrivingDistanceOSRM,
} from "../api/mapsService";

// Only fetch real driving distance for the closest N results (by
// straight-line distance). Fetching it for all 20 would hammer the
// free public OSRM server with a burst of requests every search -
// the top N are also the ones most likely to actually get clicked.
const DRIVING_DISTANCE_LIMIT = 10;

export const useNearbyPlaces = (
    currentLocation,
    type,
    radius = 5000
) => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let ignore = false;

        if (!currentLocation) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPlaces([]);
            return;
        }

        // Small debounce: if radius/type change quickly (e.g. clicking
        // through distance filter options), this waits for things to
        // settle before firing a request, instead of sending one per
        // click. Helps avoid hitting the Places API rate limit.
        const timeoutId = setTimeout(() => {
            const fetchPlaces = async () => {
                try {
                    setLoading(true);

                    const data = await getNearbyPlaces(
                        currentLocation,
                        type,
                        radius
                    );

                    if (ignore) return;

                    // Step 1: attach straight-line distance to every
                    // place and sort nearest-first, same as before.
                    const withDistance = data
                        .map((place) => {
                            const lat =
                                place.location?.latitude;
                            const lng =
                                place.location?.longitude;

                            const distanceKm =
                                lat != null && lng != null
                                    ? calculateDistance(
                                          currentLocation.lat,
                                          currentLocation.lng,
                                          lat,
                                          lng
                                      )
                                    : null;

                            return {
                                ...place,
                                distanceKm,
                                isDrivingDistance: false,
                            };
                        })
                        .sort((a, b) => {
                            if (a.distanceKm == null)
                                return 1;
                            if (b.distanceKm == null)
                                return -1;

                            return (
                                parseFloat(a.distanceKm) -
                                parseFloat(b.distanceKm)
                            );
                        });

                    // Show the straight-line results immediately so
                    // the list isn't blank while driving distances
                    // are still being fetched.
                    setPlaces(withDistance);

                    // Step 2: replace distanceKm with real driving
                    // distance, but only for the closest N places.
                    const topPlaces = withDistance.slice(
                        0,
                        DRIVING_DISTANCE_LIMIT
                    );

                    const drivingResults = await Promise.all(
                        topPlaces.map(async (place) => {
                            const lat =
                                place.location?.latitude;
                            const lng =
                                place.location?.longitude;

                            if (lat == null || lng == null) {
                                return place;
                            }

                            const driving =
                                await getDrivingDistanceOSRM(
                                    currentLocation,
                                    { lat, lng }
                                );

                            if (!driving) return place;

                            return {
                                ...place,
                                distanceKm: driving.distanceKm,
                                durationMin: driving.durationMin,
                                isDrivingDistance: true,
                            };
                        })
                    );

                    if (ignore) return;

                    // Merge the upgraded top N back into the full
                    // sorted list, keeping the rest as straight-line.
                    const merged = withDistance.map((place, i) =>
                        i < DRIVING_DISTANCE_LIMIT
                            ? drivingResults[i]
                            : place
                    );

                    setPlaces(merged);
                } catch (error) {
                    console.log(error);

                    if (!ignore) {
                        setPlaces([]);
                    }
                } finally {
                    if (!ignore) {
                        setLoading(false);
                    }
                }
            };

            fetchPlaces();
        }, 400);

        return () => {
            ignore = true;
            clearTimeout(timeoutId);
        };
    }, [currentLocation, type, radius]);

    return {
        places,
        loading,
    };
};
import { useEffect, useState } from "react";

import {
    getNearbyPlaces,
    calculateDistance,
} from "../api/mapsService";

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


        const timeoutId = setTimeout(() => {
            const fetchPlaces = async () => {
                try {
                    setLoading(true);

                    const data = await getNearbyPlaces(
                        currentLocation,
                        type,
                        radius
                    );

                    if (!ignore) {
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

                        setPlaces(withDistance);
                    }
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
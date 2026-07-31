import { useEffect, useState } from "react";

import {
    getPlaceDetails,
    getDrivingDistanceOSRM,
} from "../api/mapsService";

export const usePlaceDetails = (placeId, currentLocation) => {
    const [place, setPlace] = useState(null);
    const [driving, setDriving] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let ignore = false;

        if (!placeId) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPlace(null);
            setDriving(null);
            setLoading(false);
            return;
        }

        const fetchPlace = async () => {
            try {
                setLoading(true);

                const data = await getPlaceDetails(placeId);

                if (ignore) return;

                setPlace(data);

                const destination = data?.location
                    ? {
                          lat: data.location.latitude,
                          lng: data.location.longitude,
                      }
                    : null;

                if (currentLocation && destination) {
                    const drivingResult =
                        await getDrivingDistanceOSRM(
                            currentLocation,
                            destination
                        );

                    if (!ignore) {
                        setDriving(drivingResult);
                    }
                } else if (!ignore) {
                    setDriving(null);
                }
            } catch (error) {
                console.log(error);

                if (!ignore) {
                    setPlace(null);
                    setDriving(null);
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        fetchPlace();

        return () => {
            ignore = true;
        };
    }, [placeId, currentLocation]);

    return {
        place,
        driving,
        loading,
    };
};
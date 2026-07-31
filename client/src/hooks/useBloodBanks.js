import { useEffect, useState } from "react";

import {
    getBloodBanks,
    calculateDistance,
} from "../api/mapsService";

export const useBloodBanks = (
    currentLocation,
    radius = 50000
) => {
    const [bloodBanks, setBloodBanks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let ignore = false;

        const fetchBloodBanks = async () => {
            if (!currentLocation) {
                setBloodBanks([]);
                return;
            }

            try {
                setLoading(true);

                const data = await getBloodBanks(
                    currentLocation,
                    radius
                );

                if (!ignore) {
                    // Attach distance (in KM) to each blood bank, then sort nearest-first
                    const withDistance = data
                        .map((bank) => {
                            const lat =
                                bank.location?.latitude;
                            const lng =
                                bank.location?.longitude;

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
                                ...bank,
                                distanceKm,
                            };
                        })
                        .sort((a, b) => {
                            if (
                                a.distanceKm == null
                            )
                                return 1;
                            if (
                                b.distanceKm == null
                            )
                                return -1;

                            return (
                                parseFloat(a.distanceKm) -
                                parseFloat(b.distanceKm)
                            );
                        });

                    setBloodBanks(withDistance);
                }
            } catch (error) {
                console.log(error);

                if (!ignore) {
                    setBloodBanks([]);
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        fetchBloodBanks();

        return () => {
            ignore = true;
        };
    }, [currentLocation, radius]);

    return {
        bloodBanks,
        loading,
    };
};
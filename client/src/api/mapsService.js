// In-memory cache: avoids firing duplicate requests for the same
// location+type+radius within a short window. This alone eliminates
// a lot of accidental quota usage - React StrictMode double-firing
// effects in dev, or a user reselecting a filter they already used.
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const searchCache = new Map();

const getCacheKey = (lat, lng, type, radius) =>
    `${lat.toFixed(3)},${lng.toFixed(3)},${type},${radius}`;

const searchNearby = async (
    lat,
    lng,
    type,
    radius = 5000
) => {
    const cacheKey = getCacheKey(lat, lng, type, radius);
    const cached = searchCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return cached.data;
    }

    try {
        const response = await fetch(
            "https://places.googleapis.com/v1/places:searchNearby",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key":
                        import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
                    "X-Goog-FieldMask":
                        "places.id," +
                        "places.displayName," +
                        "places.location," +
                        "places.formattedAddress," +
                        "places.rating," +
                        "places.googleMapsUri," +
                        "places.photos," +
                        "places.nationalPhoneNumber," +
                        "places.websiteUri," +
                        "places.regularOpeningHours",
                },
                body: JSON.stringify({
                    includedTypes: [type],
                    maxResultCount: 20,
                    locationRestriction: {
                        circle: {
                            center: {
                                latitude: lat,
                                longitude: lng,
                            },
                            radius,
                        },
                    },
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.log("Nearby Search Error :", data);
            return [];
        }

        const places = data.places || [];

        searchCache.set(cacheKey, {
            data: places,
            timestamp: Date.now(),
        });

        return places;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getNearbyPlaces = async (
    currentLocation,
    type,
    radius = 5000
) => {
    if (!currentLocation) return [];

    const { lat, lng } = currentLocation;

    // Places API (New) caps searchNearby at 50km anyway, so distance
    // options are capped at 50 KM in the UI - one call always suffices,
    // no need for the tiled multi-call grid search that larger radii
    // used to require (and which burned through the API quota fast).
    return await searchNearby(
        lat,
        lng,
        type,
        Math.min(radius, 50000)
    );
};

export const getBloodBanks = async (
    currentLocation,
    radius = 50000
) => {
    if (!currentLocation) return [];

    const { lat, lng } = currentLocation;

    radius = Math.min(radius, 50000);

    const cacheKey = getCacheKey(lat, lng, "blood_bank", radius);
    const cached = searchCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return cached.data;
    }

    try {
        const response = await fetch(
            "https://places.googleapis.com/v1/places:searchText",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key":
                        import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
                    "X-Goog-FieldMask":
                        "places.id," +
                        "places.displayName," +
                        "places.location," +
                        "places.formattedAddress," +
                        "places.rating," +
                        "places.googleMapsUri",
                },
                body: JSON.stringify({
                    textQuery: "Blood Bank",
                    locationBias: {
                        circle: {
                            center: {
                                latitude: lat,
                                longitude: lng,
                            },
                            radius,
                        },
                    },
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.log("Blood Bank Error :", data);
            return [];
        }

        const places = data.places || [];

        searchCache.set(cacheKey, {
            data: places,
            timestamp: Date.now(),
        });

        return places;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getPlaceDetails = async (placeId) => {
    try {
        const response = await fetch(
            `https://places.googleapis.com/v1/places/${placeId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key":
                        import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
                    "X-Goog-FieldMask":
                        "id," +
                        "displayName," +
                        "formattedAddress," +
                        "location," +
                        "rating," +
                        "websiteUri," +
                        "googleMapsUri," +
                        "nationalPhoneNumber," +
                        "regularOpeningHours," +
                        "photos",
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.log("Place Details Error :", data);
            return null;
        }

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getDrivingDistanceOSRM = async (origin, destination) => {
    if (!origin || !destination) return null;

    try {
        const url =
            `https://router.project-osrm.org/route/v1/driving/` +
            `${origin.lng},${origin.lat};` +
            `${destination.lng},${destination.lat}` +
            `?overview=false`;

        const response = await fetch(url);
        const data = await response.json();

        if (
            data.code !== "Ok" ||
            !data.routes ||
            data.routes.length === 0
        ) {
            return null;
        }

        const route = data.routes[0];

        return {
            distanceKm: (route.distance / 1000).toFixed(1),
            durationMin: Math.round(route.duration / 60),
        };
    } catch (error) {
        console.log("OSRM Error :", error);
        return null;
    }
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => {
        return (value * Math.PI) / 180;
    };

    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(1);
};
import axios from "axios";

console.log(import.meta.env);
console.log(import.meta.env.VITE_API_URL);

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        const isUnauthorized =
            error.response?.status === 401;

        const isRetried =
            originalRequest?._retry;

        const isAuthRoute =
            originalRequest?.url?.includes("/auth/login") ||
            originalRequest?.url?.includes("/auth/refresh");

        if (
            isUnauthorized &&
            !isRetried &&
            !isAuthRoute
        ) {
            originalRequest._retry = true;

            try {
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/refresh`,
                    {},
                    {
                        withCredentials: true,
                    }
                );

                const newAccessToken = data.accessToken;

                localStorage.setItem(
                    "accessToken",
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (refreshError) {
                localStorage.removeItem("accessToken");

                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
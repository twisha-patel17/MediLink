import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});


api.interceptors.request.use(

    (config) => {

        const accessToken =
            localStorage.getItem("accessToken");

        if (accessToken) {
            config.headers.Authorization =
                `Bearer ${accessToken}`;
        }

        return config;

    },

    (error) => Promise.reject(error)

);


api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest =
            error.config;


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

                const { data } =
                    await axios.post(

                        `${import.meta.env.VITE_API_URL}/auth/refresh`,

                        {
                            refreshToken:
                                localStorage.getItem(
                                    "refreshToken"
                                ),
                        }

                    );


                localStorage.setItem(
                    "accessToken",
                    data.accessToken
                );


                originalRequest.headers.Authorization =
                    `Bearer ${data.accessToken}`;


                return api(originalRequest);

            } catch (error) {

                localStorage.removeItem("accessToken");

                localStorage.removeItem("refreshToken");

                window.location.href =
                    "/login";

                return Promise.reject(error);

            }

        }

        return Promise.reject(error);

    }

);

export default api;
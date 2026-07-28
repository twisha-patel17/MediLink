import { useEffect } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { refreshToken } from "./api/authService";

function App() {

    const checkSession = async () => {

        const token = localStorage.getItem("refreshToken");

        if (!token) return;

        try {
            const response = await refreshToken();

            localStorage.setItem(
                "accessToken",
                response.data.accessToken
            );

            console.log("SESSION FOUND");

        } catch (error) {

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            console.log("NO SESSION FOUND");
            console.log(error);

        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    return <AppRoutes />;
}

export default App;
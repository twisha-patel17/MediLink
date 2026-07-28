import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { signup, login, logout } from "../api/authService";


export const useSignup = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: signup,

        onSuccess: () => {
            toast.success("Account created successfully.");
            navigate("/login");
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                "Something went wrong."
            );
        },
    });
};


export const useLogin = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: login,

        onSuccess: (data) => {
            localStorage.setItem(
                "accessToken",
                data.data.accessToken
            );

            localStorage.setItem(
                "refreshToken",
                data.data.refreshToken
            );

            toast.success("Login successful.");
            navigate("/hospitals");
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                "Invalid credentials."
            );
        },
    });
};


export const useLogout = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: logout,

        onSuccess: () => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            toast.success("Logout successful.");
            navigate("/login");
        },

        onError: () => {
            toast.error("Something went wrong.");
        },
    });
};
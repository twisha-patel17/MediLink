import api from "./api";

export const signup = (data) =>
    api.post("/auth/signup", data);

export const login = (data) =>
    api.post("/auth/login", data);

export const logout = () =>
    api.post("/auth/logout", {
        refreshToken: localStorage.getItem("refreshToken"),
    });

export const refreshToken = () =>
    api.post("/auth/refresh", {
        refreshToken: localStorage.getItem("refreshToken"),
    });
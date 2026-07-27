import api from "./api";

export const getCurrentUser = () =>
    api.get("/user/me");

export const updateProfile = (data) =>
    api.put("/user/profile", data);

export const changePassword = (data) =>
    api.put("/user/change-password", data);

export const deleteAccount = () =>
    api.delete("/user/account");
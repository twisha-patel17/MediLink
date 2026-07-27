import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getCurrentUser, updateProfile, changePassword, deleteAccount } from "../api/userService";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
    });
};

export const useUpdateProfile = () => {
    return useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            toast.success("Profile updated successfully.");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message ||
                "Unable to update profile."
            );
        },
    });
};

export const useChangePassword = () => {
    return useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            toast.success("Password changed successfully.");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message ||
                "Unable to change password."
            );
        },
    });
};

export const useDeleteAccount = () => {
    return useMutation({
        mutationFn: deleteAccount,
        onSuccess: () => {
            toast.success("Account deleted successfully.");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message ||
                "Unable to delete account."
            );
        },
    });
};

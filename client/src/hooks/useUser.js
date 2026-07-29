import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
    getCurrentUser,
    updateProfile,
    changePassword,
    deleteAccount,
} from "../api/userService";


export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const response = await getCurrentUser();
            return response.data.user;
        },
    });
};


export const useUpdateProfile = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfile,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["currentUser"],
            });

            toast.success("Profile updated successfully.");
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
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
            toast.error(
                error.response?.data?.message ||
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
            toast.error(
                error.response?.data?.message ||
                "Unable to delete account."
            );
        },
    });
};

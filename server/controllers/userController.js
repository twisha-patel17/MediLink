import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";

export const getCurrentUser = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        if(!currentUser) {
            return res.status(404).json({
                message: "User not found."
            });
        }
        return res.status(200).json({
            user: {
                id: currentUser._id,
                name: currentUser.name,
                email: currentUser.email,
                profilePicture: currentUser.profilePicture,
                savedPlaces: currentUser.savedPlaces,
                recentSearches: currentUser.recentSearches,
                createdAt: currentUser.createdAt,
                isGoogleUser: !!currentUser.googleId,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong."
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const currentUser = await User.findById(req.user.id);

        if (!currentUser) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        const trimmedName = name?.trim();
        const trimmedEmail = email?.trim();

        if (trimmedEmail) {
            const existingUser = await User.findOne({
                email: trimmedEmail
            });

            if (
                existingUser &&
                !existingUser._id.equals(currentUser._id)
            ) {
                return res.status(400).json({
                    message: "Email already exists."
                });
            }
        }

        if (trimmedName) {
            currentUser.name = trimmedName;
        }

        if (trimmedEmail) {
            currentUser.email = trimmedEmail;
        }

        await currentUser.save();

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: {
                id: currentUser._id,
                name: currentUser.name,
                email: currentUser.email,
                profilePicture: currentUser.profilePicture,
                savedPlaces: currentUser.savedPlaces,
                recentSearches: currentUser.recentSearches
            }
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Something went wrong."
        });
    }
};

export const changePassword = async (req, res) => {
    try {

        const { currentPassword, newPassword } = req.body;

        const currentUser = await User.findById(req.user.id);

        if (!currentUser) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        // Google Login Users
        if (!currentUser.password) {
            return res.status(400).json({
                message:
                    "Password cannot be changed for Google accounts.",
            });
        }

        if (
            !currentPassword?.trim() ||
            !newPassword?.trim()
        ) {
            return res.status(400).json({
                message:
                    "Current password and new password are required.",
            });
        }

        if (currentPassword === newPassword) {
            return res.status(400).json({
                message:
                    "New password must be different from the old password.",
            });
        }

        const isPasswordValid =
            await bcrypt.compare(
                currentPassword,
                currentUser.password
            );

        if (!isPasswordValid) {
            return res.status(400).json({
                message:
                    "Current password is incorrect.",
            });
        }

        const hashedPassword =
            await bcrypt.hash(newPassword, 10);

        currentUser.password = hashedPassword;

        // logout from every device
        currentUser.refreshToken = null;

        await currentUser.save();

        return res.status(200).json({
            message:
                "Password changed successfully.",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message:
                "Something went wrong.",
        });

    }
};

export const deleteAccount = async (req, res) => {

    try {
 
        const { password } = req.body;

        const currentUser =
            await User.findById(req.user.id);

        if (!currentUser) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        // Google Login User
        if (currentUser.googleId) {

            await User.findByIdAndDelete(
                req.user.id
            );

            return res.status(200).json({
                message:
                    "Account deleted successfully.",
            });

        }

        // Normal User
        if (!password?.trim()) {
            return res.status(400).json({
                message:
                    "Password is required.",
            });
        }

        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                currentUser.password
            );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message:
                    "Password is incorrect.",
            });
        }

        await User.findByIdAndDelete(
            req.user.id
        );

        return res.status(200).json({
            message:
                "Account deleted successfully.",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message:
                "Something went wrong.",
        });

    }

};
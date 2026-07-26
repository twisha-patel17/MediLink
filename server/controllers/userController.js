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
                recentSearches: currentUser.recentSearches
            }
        })
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
        const { oldPassword, newPassword } = req.body;

        if(!oldPassword?.trim() || !newPassword?.trim()) {
            return res.status(400).json({
                message: "Old password and new password are required."
            })
        }

        const currentUser = await User.findById(req.user.id);

        if(!currentUser) {
            return res.status(404).json({
                message: "User not found."
            })
        }

        if (oldPassword === newPassword) {
          return res.status(400).json({
          message:
          "New password must be different from the old password."
         });
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, currentUser.password);

        if(!isPasswordValid) {
            return res.status(400).json({
                message: "Old password is incorrect."
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        currentUser.password = hashedPassword;
        currentUser.refreshToken = null;
        await currentUser.save();

        return res.status(200).json({
            message: "Password changed successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong."
        });
    }
}

export const deleteAccount = async (req, res) => {
    try {
        const { password } = req.body;

        if(!password?.trim()) {
            return res.status(400).json({
                message: "Password is required."
            })
        }
        
        const currentUser = await User.findByIdAndDelete(req.user.id);
        if(!currentUser) {
            return res.status(404).json({
                message: "User not found."
            });
        }
        return res.status(200).json({
            message: "Account deleted successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong."
        });
    }
};


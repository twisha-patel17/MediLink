import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/generateTokens.js";
import { verifyGoogleToken } from "../utils/verifyGoogleToken.js";

export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "User created successfully.",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong." });
    }
};

export const loginUser = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password} = req.body;

        if (!email?.trim() || !password?.trim()) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const currentUser = await User.findOne({
            email: email.toLowerCase(),
        });

        if (!currentUser) {
            return res.status(400).json({ message: "Invalid Credentials." });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            currentUser.password
        );

        console.log(isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials." });
        }

        const accessToken = generateAccessToken(currentUser._id);
        const refreshToken = generateRefreshToken(
            currentUser._id,
        );

        currentUser.refreshToken = refreshToken;
        await currentUser.save();

        return res.status(200).json({
            message: "Login successful.",
            accessToken,
            refreshToken,
            user: {
                id: currentUser._id,
                name: currentUser.name,
                email: currentUser.email,

                isGoogleUser: false,
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong." });
    }
};

export const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                message: "Refresh token required.",
            });
        }

        const decodedUser = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const currentUser = await User.findById(decodedUser.id);

        if (!currentUser) {
            return res.status(404).json({ message: "User not found." });
        }

        if (currentUser.refreshToken !== refreshToken) {
            return res.status(403).json({
                message: "Invalid refresh token.",
            });
        }

        const accessToken = generateAccessToken(currentUser._id);

        return res.status(200).json({ accessToken });

    } catch (error) {
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError"
        ) {
            return res.status(403).json({
                message: "Invalid or expired refresh token.",
            });
        }

        console.log(error);
        return res.status(500).json({ message: "Something went wrong." });
    }
};

export const logoutUser = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                message: "Refresh token required.",
            });
        }

        const decodedUser = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        await User.findByIdAndUpdate(decodedUser.id, {
            refreshToken: null,
        });

        return res.status(200).json({
            message: "Logout successful.",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong.",
        });
    }
};
export const googleLoginUser = async (req, res) => {
    try {
        const { credential } = req.body;

        if(!credential){
            return res.status(400).json({
                message: "Google credential required."
            });
        }

        const googleUser = await verifyGoogleToken(credential);

        const {name, email, picture, sub} = googleUser;

        let currentUser = await User.findOne({ email });

        if (!currentUser) {
            currentUser = await User.create({
                name,
                email,
                profilePicture: picture,
                googleId: sub
            });
        }

        else if (!currentUser.googleId) {
            currentUser.googleId = sub;
            currentUser.profilePicture = picture;
            await currentUser.save();
        }

        const accessToken = generateAccessToken(currentUser._id);
        const refreshToken = generateRefreshToken(currentUser._id);

        currentUser.refreshToken = refreshToken;
        await currentUser.save();

        return res.status(200).json({
            message: "Google Login successful.",
            accessToken,
            refreshToken,
            user: {
                id: currentUser._id,
                name: currentUser.name,
                email: currentUser.email,
                profilePicture: currentUser.profilePicture,

                isGoogleUser: true,
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong." });
    }
}
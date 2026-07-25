import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/generateTokens.js";

export const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        if(!name?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({
                message: "User already exists."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully."
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong."
        });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;

        if(!email?.trim() || !password?.trim()) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const currentUser = await User.findOne({ email });
        
        if(!currentUser) {
            return res.status(400).json({
                message: "Invalid Credentials."
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, currentUser.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid Credentials."
            });
        }

        const accessToken =  generateAccessToken(currentUser._id);

        const refreshToken = generateRefreshToken(currentUser._id, rememberMe);

        res.status(200).json({
            message: "Login successful.",
            refreshToken,
            accessToken
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong."
        });
    }
};


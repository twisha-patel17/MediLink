import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";

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

        return res.status(201).json({
            message: "User created successfully."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
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

        const currentUser = await User.findOne({ email: email.toLowerCase() });
        
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

        currentUser.refreshToken = refreshToken;
        await currentUser.save();

        res.status(200).json({
            message: "Login successful.",
            refreshToken,
            accessToken,
            user: {
                id: currentUser._id,
                name: currentUser.name,
                email: currentUser.email
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong."
        });
    }
};

export const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if(!refreshToken) {
            return res.status(400).json({
                message: "Refresh token required."
            });
        }

        const decodedUser = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        
        const currentUser = await User.findById(decodedUser.id);
        if(!currentUser) {
            return res.status(404).json({
                message: "User not found."
            })
        }

        if(currentUser.refreshToken !== refreshToken) {
            return res.status(403).json({
                message: 'Invalid refresh token.'
            });
        }

        const accessToken = generateAccessToken(currentUser._id);
        return res.status(200).json({
            accessToken
        })
    } catch (error) {
        if(error.name === "JsonWebTokenError"){
            return res.status(403).json({
                message: "Invalid refresh token."
            });
        }
        if(error.name==="TokenExpiredError") {
            return res.status(403).json({
                message: "Refresh token expired."
            });
        }
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong."
        });
    }
}

export const logoutUser = async (req, res) => {
    try {
        const currentUser = await User.findByIdAndUpdate(req.user.id,
            { refreshToken: null },
        );

        if(!currentUser) {
            return res.status(404).json({
                message: "User not found."
            })
        }

        return res.status(200).json({
            message: "Logout successful."
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

        if(!oldPassword || !newPassword) {
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
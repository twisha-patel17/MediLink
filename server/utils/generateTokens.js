import jwt from "jsonwebtoken";

export const generateAccessToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "15m"});
}

export const generateRefreshToken = (id, rememberMe=false) => {
    return jwt.sign({id}, process.env.JWT_REFRESH_SECRET, 
        {expiresIn: rememberMe ? "30d" : "7d"}
    );
}
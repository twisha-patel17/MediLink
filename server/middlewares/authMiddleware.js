import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Authorization token required!"});
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "Invalid token!"});
    }
}

export default authMiddleware;
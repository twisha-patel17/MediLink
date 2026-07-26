import express from "express";

import { signupUser, loginUser, logoutUser, refreshAccessToken} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout",authMiddleware, logoutUser);
router.post("/refresh", refreshAccessToken);


export default router;
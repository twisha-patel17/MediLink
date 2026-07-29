import express from "express";

import { signupUser, loginUser, logoutUser, refreshAccessToken, googleLoginUser} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout",authMiddleware, logoutUser);
router.post("/refresh", refreshAccessToken);
router.post("/google-login", googleLoginUser);


export default router;
import express from "express";

import { signupUser, loginUser, logoutUser, deleteAccount } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout",authMiddleware, logoutUser);
router.delete("/delete",authMiddleware, deleteAccount);

export default router;
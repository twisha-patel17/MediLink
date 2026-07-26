import express from "express";

import { getCurrentUser, updateProfile, changePassword, deleteAccount } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.delete("/account",authMiddleware, deleteAccount);
router.get("/me",authMiddleware, getCurrentUser);
router.put("/profile",authMiddleware, updateProfile);
router.put("/change-password",authMiddleware, changePassword);

export default router;
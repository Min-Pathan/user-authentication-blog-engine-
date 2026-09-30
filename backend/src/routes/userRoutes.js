import express from "express";
import { registerUser, loginUser, profileUSer, getAllUsers, getUserById, updateUserController, deleteUserController } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleWare from "../middlewares/roleMiddleware.js";
import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema, } from "../validations/authValidation.js";
import validate from "../middlewares/validateMiddleware.js";
import {
    forgotPassword,
    resetPassword,
} from "../controllers/passwordController.js";

import {
    forgotPasswordLimiter,
    resetPasswordLimiter,
} from "../middlewares/passwordRateLimiter.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser)
router.post(
    "/forgot-password",
    forgotPasswordLimiter,
    validate(forgotPasswordSchema),
    forgotPassword,
);

router.post(
    "/reset-password",
    resetPasswordLimiter,
    validate(resetPasswordSchema),
    resetPassword,
);
router.get("/profile", authMiddleware, roleMiddleWare("admin"), profileUSer)
router.get("/", authMiddleware, roleMiddleWare("admin"), getAllUsers)
router.get("/:id", authMiddleware, getUserById)
router.put("/:id", authMiddleware, updateUserController)
router.delete("/:id", authMiddleware, roleMiddleWare('admin'), deleteUserController)

export default router;
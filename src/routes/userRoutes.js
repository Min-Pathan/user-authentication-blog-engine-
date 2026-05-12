import express from "express";
import { registerUser, loginUser, profileUSer } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleWare from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser)
router.get("/profile", authMiddleware, roleMiddleWare, profileUSer)

export default router;
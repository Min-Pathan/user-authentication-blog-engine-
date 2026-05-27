import express from "express";
import { registerUser, loginUser, profileUSer, getAllUsers, getUserById, updateUserController, deleteUserController } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleWare from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser)
router.get("/profile", authMiddleware, roleMiddleWare("admin"), profileUSer)
router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.put("/:id", updateUserController)
router.delete("/:id", deleteUserController)

export default router;
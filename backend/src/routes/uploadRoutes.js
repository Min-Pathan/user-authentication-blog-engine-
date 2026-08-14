import express from "express";
import authMiddleware from '../middlewares/authMiddleware.js';
import { uploadVideo, ImageUpload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();
router.post("/image",
    authMiddleware, ImageUpload.single("image"),
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image",
            });
        }
        return res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            file: {
                originalName: req.file.originalname,
                filename: req.file.filename,
                mimetype: req.file.mimetype,
                size: req.file.size,
                path: req.file.path,
            },
        });
    }
)

router.post(
    "/video",
    authMiddleware,
    uploadVideo.single("video"),
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a video",
            });
        }

        return res.status(201).json({
            success: true,
            message: "Video uploaded successfully",
            file: {
                originalName: req.file.originalname,
                filename: req.file.filename,
                mimetype: req.file.mimetype,
                size: req.file.size,
                path: req.file.path,
            },
        });
    }
);

export default router
import express from "express";
import rateLimit from "express-rate-limit";

import validate from "../middlewares/validateMiddleware.js";
import { contactSchema } from "../validations/contactValidation.js";
import { sendContactMessage } from "../controllers/contactController.js";

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many messages. Please try again in 15 minutes.",
  },
});

router.post(
  "/",
  contactLimiter,
  validate(contactSchema),
  sendContactMessage,
);

export default router;
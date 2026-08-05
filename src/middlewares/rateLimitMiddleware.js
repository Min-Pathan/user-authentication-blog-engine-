import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 100,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Try again later.",
  },
});

export default apiLimiter;
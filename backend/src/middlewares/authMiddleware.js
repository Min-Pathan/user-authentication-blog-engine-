import jwt from "jsonwebtoken";
import { findUserAuthById } from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Please log in.",
    });
  }

  const token = authHeader.slice(7).trim();

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Please log in again.",
      });
    }

    return next(error);
  }

  if (
    !decoded ||
    typeof decoded !== "object" ||
    !Number.isInteger(decoded.id) ||
    !Number.isInteger(decoded.tokenVersion)
  ) {
    return res.status(401).json({
      success: false,
      message: "Please log in again.",
    });
  }

  try {
    const user = await findUserAuthById(decoded.id);

    if (
      !user ||
      decoded.tokenVersion !== user.token_version
    ) {
      return res.status(401).json({
        success: false,
        message: "Please log in again.",
      });
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch (error) {
    // Database failures should not be reported as expired sessions.
    next(error);
  }
};

export default authMiddleware;

import crypto from "node:crypto";
import bcrypt from "bcrypt";

import AppError from "../Errors/AppError.js";
import sendEmail from "../utils/sendEmail.js";

import {
  findUserByEmail,
  savePasswordResetToken,
  clearPasswordResetToken,
  resetPasswordByToken,
} from "../models/userModel.js";

const resetRequestMessage =
  "If an account exists with this email, we’ve sent a password reset link.";

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.validatedData;

    if (!process.env.FRONTEND_URL) {
      throw new Error("FRONTEND_URL is missing");
    }

    // Build links from our configuration, not request headers.
    const resetUrl = new URL(
      "/reset-password",
      process.env.FRONTEND_URL,
    );

    const user = await findUserByEmail(email);

    if (user) {
      const token = crypto.randomBytes(32).toString("hex");
      const tokenHash = hashToken(token);
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

      await savePasswordResetToken(
        user.id,
        tokenHash,
        expiresAt,
      );

      resetUrl.searchParams.set("token", token);

      try {
        await sendEmail({
          to: user.email,
          subject: "Reset your Blogger password",
          text: [
            "You requested a password reset for your Blogger account.",
            "",
            "Open this link to choose a new password:",
            resetUrl.toString(),
            "",
            "This link expires in 15 minutes and can only be used once.",
            "",
            "If you did not request this, you can ignore this email.",
          ].join("\n"),
        });
      } catch (error) {
console.error("Password reset email failed:", {
  name: error.name,
  message: error.message,
  code: error.code,
  command: error.command,
});

        await clearPasswordResetToken(user.id, tokenHash);
      }
    }

    // Same response whether the account exists or not.
    return res.status(200).json({
      success: true,
      message: resetRequestMessage,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.validatedData;

    // bcrypt only processes up to 72 bytes.
    if (Buffer.byteLength(password, "utf8") > 72) {
      throw new AppError("Password is too long.", 400);
    }

    const tokenHash = hashToken(token);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Checks expiry, updates password, clears token,
    // and increments token_version in one SQL statement.
    const user = await resetPasswordByToken(
      tokenHash,
      hashedPassword,
    );

    if (!user) {
      throw new AppError(
        "This reset link is invalid or has expired.",
        400,
      );
    }

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. Please log in.",
    });
  } catch (error) {
    next(error);
  }
};
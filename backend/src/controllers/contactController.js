import sendEmail from "../utils/sendEmail.js";
import AppError from "../Errors/AppError.js";

export const sendContactMessage = async (req, res, next) => {
  const { name, email, subject, message } = req.validatedData;

  if (!process.env.CONTACT_EMAIL) {
    return next(
      new AppError("Contact service is currently unavailable.", 503),
    );
  }

  try {
    await sendEmail({
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `[Blogger Contact] ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    return res.status(200).json({
      success: true,
      message: "Your message has been sent. Thank you for contacting us!",
    });
  } catch (error) {
    console.error(
      "[CONTACT] Email delivery failed:",
      error.code || error.name,
    );

    return next(
      new AppError(
        "Could not send your message. Please try again later.",
        503,
      ),
    );
  }
};
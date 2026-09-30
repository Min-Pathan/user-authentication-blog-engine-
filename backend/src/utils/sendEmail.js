import nodemailer from "nodemailer";

let transporter;
const sendEmail = async ({ to, subject, text }) => {
    const { SMTP_HOST,
        SMTP_PORT,
        SMTP_USER,
        SMTP_PASS,
        EMAIL_FROM, } = process.env

    if (
        !SMTP_HOST ||
        !SMTP_PORT ||
        !SMTP_USER ||
        !SMTP_PASS ||
        !EMAIL_FROM
    ) {
        throw new Error("Email configuration is missing");
    }

    if (!transporter) {

        transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT),
            secure: Number(SMTP_PORT) === 465, requireTLS: true,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 15000
        })
    }

    await transporter.sendMail({
        from: EMAIL_FROM,
        to,
        subject,
        text,
    })
}

export default sendEmail
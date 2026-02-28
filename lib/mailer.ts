import nodemailer from "nodemailer";

type SendMailOptions = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const mailFrom = process.env.MAIL_FROM;

const ensureMailerConfig = () => {
  if (!smtpHost || !smtpUser || !smtpPass || !mailFrom) {
    throw new Error("SMTP configuration is missing.");
  }
};

const getTransporter = () => {
  ensureMailerConfig();
  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
};

export const sendMail = async ({ to, subject, html, replyTo }: SendMailOptions) => {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: mailFrom,
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });
};

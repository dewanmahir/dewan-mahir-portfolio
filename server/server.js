import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import handler from "../api/contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "25kb" }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  const hasResend =
    Boolean(process.env.RESEND_API_KEY) &&
    process.env.RESEND_API_KEY !== "re_your_resend_api_key_here";
  const hasGmail =
    Boolean(process.env.EMAIL_PASS) &&
    process.env.EMAIL_PASS !== "your_16_character_app_password_here";

  res.json({
    status: "ok",
    service: "Dewan Mahir Portfolio Mail Server",
    configured: hasResend || hasGmail,
    activeProvider: hasResend ? "Resend" : hasGmail ? "Gmail SMTP" : "None",
  });
});

// Delegate to the unified handler
app.all("/api/contact", (req, res) => {
  return handler(req, res);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  const hasResend =
    Boolean(process.env.RESEND_API_KEY) &&
    process.env.RESEND_API_KEY !== "re_your_resend_api_key_here";
  const hasGmail =
    Boolean(process.env.EMAIL_PASS) &&
    process.env.EMAIL_PASS !== "your_16_character_app_password_here";

  console.log(
    `Email Provider Status: ${
      hasResend
        ? "Resend API (Configured)"
        : hasGmail
        ? "Gmail SMTP (Configured)"
        : "Pending Credentials (Set RESEND_API_KEY in .env)"
    }`
  );
});

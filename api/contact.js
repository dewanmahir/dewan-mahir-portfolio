import { Resend } from "resend";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// In-memory rate limiting map for serverless / local instances
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes window
  const maxRequests = 5; // Max 5 requests per window per IP

  const entry = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };

  if (now > entry.resetTime) {
    entry.count = 0;
    entry.resetTime = now + windowMs;
  }

  entry.count += 1;
  rateLimitMap.set(ip, entry);

  return entry.count > maxRequests;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed. Use POST." });
  }

  // Parse body safely
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ success: false, error: "Invalid JSON payload." });
    }
  }
  body = body || {};

  const { name, email, subject, message, _gotcha } = body;

  // 1. Honeypot check for bots
  if (_gotcha) {
    console.log("[Anti-Spam] Bot submission dropped via honeypot.");
    return res.status(200).json({ success: true, message: "Message received." });
  }

  // 2. Client IP Rate Limiting
  const clientIp =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  if (checkRateLimit(clientIp)) {
    console.warn(`[RateLimit] Rate limit exceeded for IP: ${clientIp}`);
    return res.status(429).json({
      success: false,
      error: "Too many messages sent. Please wait a few minutes before trying again.",
    });
  }

  // 3. Strict Input Validation
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ success: false, error: "Name is required." });
  }
  if (name.trim().length > 100) {
    return res.status(400).json({ success: false, error: "Name must be 100 characters or fewer." });
  }

  if (!email || typeof email !== "string" || !email.trim()) {
    return res.status(400).json({ success: false, error: "Email is required." });
  }
  if (email.trim().length > 100) {
    return res.status(400).json({ success: false, error: "Email must be 100 characters or fewer." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, error: "Please provide a valid email address." });
  }

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ success: false, error: "Message is required." });
  }
  if (message.trim().length > 3000) {
    return res.status(400).json({ success: false, error: "Message must be 3000 characters or fewer." });
  }

  // Target recipient inbox
  const recipientEmail =
    process.env.EMAIL_TO ||
    process.env.CONTACT_EMAIL ||
    "dewanmahirofficial@gmail.com";

  const safeSubject = subject?.trim()
    ? subject.trim().slice(0, 150)
    : `New inquiry from ${name.trim()}`;

  const sentTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
    dateStyle: "full",
    timeStyle: "short",
  });

  const escapedName = escapeHtml(name.trim());
  const escapedEmail = escapeHtml(email.trim());
  const escapedSubject = escapeHtml(safeSubject);
  const escapedMessage = escapeHtml(message.trim());

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; color: #1e293b;">
      <div style="background: linear-gradient(135deg, #0b1020 0%, #1e1b4b 100%); padding: 32px 28px; text-align: left;">
        <p style="margin: 0 0 6px 0; font-size: 11px; letter-spacing: 2px; color: #67e8f9; text-transform: uppercase; font-family: monospace;">PORTFOLIO CONTACT INQUIRY</p>
        <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">New Message from ${escapedName}</h1>
      </div>
      
      <div style="padding: 28px;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; font-size: 13px; color: #64748b; width: 100px;"><strong>Sender:</strong></td>
            <td style="padding: 8px 0; font-size: 14px; color: #0f172a; font-weight: 600;">${escapedName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 13px; color: #64748b;"><strong>Email:</strong></td>
            <td style="padding: 8px 0; font-size: 14px; color: #7c3aed;">
              <a href="mailto:${escapedEmail}" style="color: #7c3aed; text-decoration: none;">${escapedEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 13px; color: #64748b;"><strong>Subject:</strong></td>
            <td style="padding: 8px 0; font-size: 14px; color: #0f172a;">${escapedSubject}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 13px; color: #64748b;"><strong>Time:</strong></td>
            <td style="padding: 8px 0; font-size: 13px; color: #64748b;">${sentTime} (BST)</td>
          </tr>
        </table>

        <div style="margin-top: 10px; padding: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
          <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: 700; color: #475569; letter-spacing: 1px; text-transform: uppercase;">Message Content:</p>
          <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #0f172a; white-space: pre-wrap;">${escapedMessage}</p>
        </div>

        <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
          <a href="mailto:${escapedEmail}?subject=${encodeURIComponent("Re: " + safeSubject)}" style="display: inline-block; background: #7c3aed; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 12px 24px; border-radius: 8px;">
            Reply directly to ${escapedName} &rarr;
          </a>
        </div>
      </div>
    </div>
  `;

  const plainText = `New inquiry from ${name.trim()} (${email.trim()}):\n\nSubject: ${safeSubject}\nReceived: ${sentTime}\n\nMessage:\n${message.trim()}`;

  // 4. Delivery: Try Resend first, then fallback to Nodemailer SMTP
  const resendApiKey = process.env.RESEND_API_KEY;
  const isResendConfigured =
    Boolean(resendApiKey) &&
    resendApiKey !== "re_your_resend_api_key_here" &&
    resendApiKey.startsWith("re_");

  const emailPass = process.env.EMAIL_PASS;
  const isNodemailerConfigured =
    Boolean(emailPass) &&
    emailPass !== "your_16_character_app_password_here" &&
    emailPass.length >= 8;

  // Case A: Resend API (Recommended for Vercel)
  if (isResendConfigured) {
    try {
      const resend = new Resend(resendApiKey);
      const fromEmail =
        process.env.RESEND_FROM_EMAIL || "Dewan Mahir Portfolio <onboarding@resend.dev>";

      const sendResult = await resend.emails.send({
        from: fromEmail,
        to: [recipientEmail],
        reply_to: email.trim(),
        subject: `[Portfolio Inquiry] ${safeSubject}`,
        text: plainText,
        html: htmlContent,
      });

      if (sendResult.error) {
        console.error("[Resend Error]", sendResult.error);
        return res.status(502).json({
          success: false,
          error: sendResult.error.message || "Failed to send email via Resend.",
        });
      }

      console.log(`[Resend Success] Email delivered. ID: ${sendResult.data?.id}`);
      return res.status(200).json({
        success: true,
        message: "Your message has been sent successfully! I will reply to you soon.",
      });
    } catch (err) {
      console.error("[Resend Exception]", err);
      return res.status(500).json({
        success: false,
        error: "An unexpected error occurred while delivering your email via Resend.",
        details: process.env.NODE_ENV === "development" ? err.message : undefined,
      });
    }
  }

  // Case B: Nodemailer with Gmail SMTP Fallback
  if (isNodemailerConfigured) {
    try {
      const emailUser = process.env.EMAIL_USER || "dewanmahirofficial@gmail.com";
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailUser,
          pass: emailPass.replace(/\s+/g, ""),
        },
      });

      await transporter.sendMail({
        from: `"${name.trim()} (via Portfolio)" <${emailUser}>`,
        to: recipientEmail,
        replyTo: `"${name.trim()}" <${email.trim()}>`,
        subject: `[Portfolio Inquiry] ${safeSubject}`,
        text: plainText,
        html: htmlContent,
      });

      console.log(`[Nodemailer Success] Email delivered to ${recipientEmail}`);
      return res.status(200).json({
        success: true,
        message: "Your message has been sent successfully! I will reply to you soon.",
      });
    } catch (err) {
      console.error("[Nodemailer Error]", err);
      return res.status(500).json({
        success: false,
        error: "Failed to send email via SMTP. Please verify your credentials or email directly.",
        details: process.env.NODE_ENV === "development" ? err.message : undefined,
      });
    }
  }

  // Case C: Neither provider configured
  console.warn(
    "[Configuration Warning] Neither RESEND_API_KEY nor EMAIL_PASS is configured in environment variables."
  );
  return res.status(503).json({
    success: false,
    requiresSetup: true,
    error:
      "Email delivery service is pending configuration. Please add your RESEND_API_KEY (from resend.com) to your environment variables.",
  });
}

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import contactHandler from "./api/contact.js";

// Load environment variables into process.env for local development
dotenv.config();

// Vite plugin to serve the /api/contact endpoint directly during local 'npm run dev'
function apiDevPlugin() {
  return {
    name: "vite-api-dev-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? req.url.split("?")[0] : "";

        if (url === "/api/contact") {
          let rawBody = "";
          req.on("data", (chunk) => {
            rawBody += chunk;
          });

          req.on("end", async () => {
            try {
              req.body = rawBody ? JSON.parse(rawBody) : {};
            } catch {
              req.body = {};
            }

            // Compatibility shims for ServerResponse (mimicking Express / Vercel res methods)
            if (!res.status) {
              res.status = function (code) {
                this.statusCode = code;
                return this;
              };
            }

            if (!res.json) {
              res.json = function (payload) {
                if (!this.headersSent) {
                  this.setHeader("Content-Type", "application/json");
                }
                this.end(JSON.stringify(payload));
                return this;
              };
            }

            try {
              await contactHandler(req, res);
            } catch (err) {
              console.error("[Vite Dev API Handler Error]", err);
              if (!res.headersSent) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(
                  JSON.stringify({
                    success: false,
                    error: "Internal error processing contact request.",
                  })
                );
              }
            }
          });
          return;
        }

        if (url === "/api/health") {
          const hasResend =
            Boolean(process.env.RESEND_API_KEY) &&
            process.env.RESEND_API_KEY !== "re_your_resend_api_key_here";
          const hasGmail =
            Boolean(process.env.EMAIL_PASS) &&
            process.env.EMAIL_PASS !== "your_16_character_app_password_here";

          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              status: "ok",
              environment: "vite-dev",
              configured: hasResend || hasGmail,
              provider: hasResend ? "Resend" : hasGmail ? "Gmail SMTP" : "None",
            })
          );
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), apiDevPlugin()],
  server: {
    port: 5173,
  },
});

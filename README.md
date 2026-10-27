# Dewan Mahir Portfolio

A responsive React portfolio built with Vite, React Router, Lucide icons, Express, and Nodemailer.

## Run locally

1. Install Node.js (LTS).
2. Open the project folder in VS Code.
3. Open the terminal and install dependencies:

   ```bash
   npm install
   ```

4. Configure your `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
   Add your 16-character Google App Password (see instructions below).

5. Run the frontend and backend:
   * **Terminal 1 (Backend Email Server):**
     ```bash
     npm run server
     ```
     *(Runs on http://localhost:5000)*

   * **Terminal 2 (Frontend Client):**
     ```bash
     npm run dev
     ```
     *(Vite proxies `/api/*` requests to http://localhost:5000 automatically)*

6. Open the local URL (usually `http://localhost:5173`) in your browser.

---

## Setting up your Gmail App Password

To deliver messages directly into your Gmail (`dewanmahirofficial@gmail.com`):

1. Go to your [Google Account Security Settings](https://myaccount.google.com/security).
2. Ensure **2-Step Verification** is turned ON.
3. Search for **"App Passwords"** in the search bar or visit [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
4. Enter an app name (e.g. `Portfolio Website`) and click **Create**.
5. Copy the 16-character code (e.g. `abcd efgh ijkl mnop`).
6. Paste it into your `.env` file for `EMAIL_PASS`:
   ```env
   EMAIL_USER=dewanmahirofficial@gmail.com
   EMAIL_PASS=abcdefghijklmnop
   EMAIL_TO=dewanmahirofficial@gmail.com
   ```

---

## Deployment

### Vercel (Serverless Function)
* The repository includes [api/contact.js](file:///c:/Web-Development/Ai%20Projects/dewan-mahir-portfolio/api/contact.js), which Vercel runs as a serverless function automatically without needing a dedicated server!
* In the Vercel Dashboard, go to **Settings > Environment Variables** and add:
  * `EMAIL_USER`: `dewanmahirofficial@gmail.com`
  * `EMAIL_PASS`: Your 16-character Gmail App Password
  * `EMAIL_TO`: `dewanmahirofficial@gmail.com`
* Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.

### Render / Railway / Node Server
* Build command: `npm run build`
* Start command: `npm run server`
* Add your environment variables in the host dashboard.

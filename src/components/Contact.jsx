import { useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  Copy,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { profile } from "../data/portfolioData.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Contact() {
  const [copiedType, setCopiedType] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    _gotcha: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [requiresSetup, setRequiresSetup] = useState(false);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleMailtoFallback = () => {
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name || "Portfolio Visitor"}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setRequiresSetup(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data = null;
      try {
        data = await response.json();
      } catch (parseErr) {
        console.warn("API response was not valid JSON:", parseErr);
      }

      if (response.ok && data?.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          _gotcha: "",
        });
      } else {
        const errorText =
          data?.error ||
          (response.status === 404
            ? "API route not found (/api/contact). Please ensure the backend is running."
            : response.status === 504 || response.status === 502
            ? "Server timeout. Please verify your email provider credentials."
            : "Unable to deliver message right now. Please try again or email directly.");
        setErrorMessage(errorText);
        if (data?.requiresSetup) {
          setRequiresSetup(true);
        }
      }
    } catch (err) {
      console.error("Contact form submission error:", err);
      setErrorMessage(
        "Could not connect to the backend email server. Please check your network connection or email directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-layout">
        <div>
          <SectionHeading
            eyebrow="GET IN TOUCH"
            title={
              <>
                Have a project in <span className="gradient-text">mind?</span>
              </>
            }
            description="Have a question, a freelance opportunity, or just want to discuss web engineering? My inbox is always open."
          />

          <div className="contact-details">
            <div className="contact-item">
              <span>
                <Mail size={19} />
              </span>
              <div>
                <small>EMAIL ME</small>
                <strong>{profile.email}</strong>
              </div>
              <div className="contact-item-actions">
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() => handleCopy(profile.email, "email")}
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedType === "email" ? (
                    <span className="copied-tag">
                      <Check size={13} /> Copied!
                    </span>
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
                <a
                  href={`mailto:${profile.email}`}
                  className="direct-link-btn"
                  title="Send email"
                  aria-label="Send email"
                >
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            <div className="contact-item">
              <span>
                <Phone size={19} />
              </span>
              <div>
                <small>CALL ME</small>
                <strong>{profile.phone}</strong>
              </div>
              <div className="contact-item-actions">
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() => handleCopy(profile.phone, "phone")}
                  title="Copy phone to clipboard"
                  aria-label="Copy phone number"
                >
                  {copiedType === "phone" ? (
                    <span className="copied-tag">
                      <Check size={13} /> Copied!
                    </span>
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
                <a
                  href={`tel:${profile.phone.replaceAll(" ", "")}`}
                  className="direct-link-btn"
                  title="Call number"
                  aria-label="Call phone number"
                >
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="contact-item"
            >
              <span>
                <MessageCircle size={19} />
              </span>
              <div>
                <small>WHATSAPP</small>
                <strong>Send me a message</strong>
              </div>
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="contact-location">
            <MapPin size={16} /> {profile.location} · GMT+6
          </div>
        </div>

        <div className="contact-card contact-form-card">
          <div className="contact-card-icon">
            <Sparkles size={24} />
          </div>
          <p className="eyebrow">SEND A MESSAGE</p>
          <h3>Let's start a conversation.</h3>

          {submitted ? (
            <div className="form-success-box">
              <Check size={28} className="success-icon" />
              <h4>Message Delivered!</h4>
              <p>
                Thank you for getting in touch! Your message has been sent
                directly to my Gmail inbox (<strong>{profile.email}</strong>). I
                will reply to your email as soon as possible.
              </p>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setSubmitted(false)}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Bot Honeypot */}
              <input
                type="text"
                name="_gotcha"
                value={formData._gotcha}
                onChange={handleChange}
                style={{ display: "none" }}
                tabIndex="-1"
                autoComplete="off"
              />

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Alex Smith"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Project inquiry or discussion"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project or what you have in mind..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {errorMessage && (
                <div className="form-error-alert" role="alert">
                  <strong>
                    <AlertCircle size={16} /> Delivery Notice
                  </strong>
                  <p>{errorMessage}</p>
                  {requiresSetup && (
                    <p style={{ fontSize: "11px", opacity: 0.9, margin: "2px 0 0" }}>
                      Tip: Set <code>RESEND_API_KEY</code> in your <code>.env</code> file or in Vercel Project Settings.
                    </p>
                  )}
                  <button
                    type="button"
                    className="form-error-fallback-btn"
                    onClick={handleMailtoFallback}
                  >
                    Send via Email Client instead &rarr;
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="button button-primary submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="spinner" /> Sending to inbox...
                  </>
                ) : (
                  <>
                    Send message <Send size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

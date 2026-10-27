import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { profile } from "../data/portfolioData.js";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToHero = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const heroElement = document.getElementById("home");
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const heroElement = document.getElementById("home");
        if (heroElement) {
          heroElement.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <a
          href="#home"
          className="brand footer-brand"
          onClick={handleScrollToHero}
          aria-label="Scroll to Hero section"
          title="Scroll back to top"
        >
          <span className="brand-mark">&lt;/&gt;</span>
          <span>
            Dewan<span className="accent">Mahir</span>
            <small>DEVELOPER PORTFOLIO</small>
          </span>
        </a>

        <p>Designed with curiosity. Built one line at a time.</p>

        <div className="footer-socials">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="#home"
            onClick={handleScrollToHero}
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()}{" "}
          <button
            type="button"
            className="footer-name-link"
            onClick={handleScrollToHero}
            title="Scroll back to top"
          >
            Dewan Mahir
          </button>
        </span>
        <span>
          Built with React <span className="accent">♥</span>
        </span>
      </div>
    </footer>
  );
}

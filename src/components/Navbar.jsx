import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Code2, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

const links = [
  ["About", "#about"],
  ["Services", "#services"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Certificates", "#certificates"],
  ["Education", "#education"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const close = () => setOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToHero = (e) => {
    e.preventDefault();
    close();
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
    <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
      <nav className="navbar container" aria-label="Main navigation">
        <a
          href="#home"
          className="brand"
          onClick={handleScrollToHero}
          aria-label="Scroll to Hero section"
          title="Scroll back to top"
        >
          <span className="brand-mark">
            <Code2 size={21} />
          </span>
          <span>
            Dewan<span className="accent">Mahir</span>
            <small>DEVELOPER PORTFOLIO</small>
          </span>
        </a>

        <div className="navbar-right">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className={`nav-links ${open ? "nav-links-open" : ""}`}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={close}>
              {label}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={close}>
            Let's talk <span>↗</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

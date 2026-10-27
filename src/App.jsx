import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Certificates from "./components/Certificates.jsx";
import Education from "./components/Education.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ProjectDetails from "./components/ProjectDetails.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Skills />
      <Projects />
      <Certificates />
      <Education />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <div className="app-shell">
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />
            <Route
              path="*"
              element={
                <div className="section container not-found">
                  <p className="eyebrow">404 / PAGE NOT FOUND</p>
                  <h1>This page wandered off.</h1>
                  <a className="button button-primary" href="/">
                    Back to home
                  </a>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

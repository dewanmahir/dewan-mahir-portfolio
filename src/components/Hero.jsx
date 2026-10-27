import { ArrowDown, ArrowUpRight, Download, Github, Linkedin } from 'lucide-react'
import { profile } from '../data/portfolioData.js'

export default function Hero() {
  return <section className="hero" id="home">
    <div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" />
    <div className="container hero-grid">
      <div className="hero-copy">
        <div className="availability"><span /> OPEN TO OPPORTUNITIES</div>
        <p className="eyebrow">HELLO, I'M</p>
        <h1>Dewan <span className="gradient-text">Mahir.</span></h1>
        <h2>Full-Stack Web Developer <span className="hero-cursor">_</span></h2>
        <p className="hero-description">I build clean, responsive web experiences and keep learning how to make them faster, more useful, and more delightful.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">Explore my work <ArrowUpRight size={18} /></a>
          <a
            className="button button-secondary"
            href={profile.resume}
            download="Dewan_Mahir_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download CV"
          >
            <Download size={17} /> Download CV
          </a>
        </div>
        <div className="hero-socials">
          <span>FIND ME ON</span>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a>
          <a href={profile.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="photo-frame"><div className="photo-orbit orbit-one" /><div className="photo-orbit orbit-two" /><img src="/images/profile-mahir.jpg" alt="Dewan Mahir, Full-Stack Web Developer" /></div>
        <div className="floating-card floating-code"><span className="floating-icon purple">&lt;/&gt;</span><span><strong>Clean code</strong><small>One component at a time</small></span></div>
        <div className="floating-card floating-location"><span className="status-dot" /><span><strong>Based in Bangladesh</strong><small>Always learning</small></span></div>
        <div className="hero-deco deco-top">✳</div><div className="hero-deco deco-bottom">✦</div>
      </div>
    </div>
    <a className="scroll-cue container" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
  </section>
}
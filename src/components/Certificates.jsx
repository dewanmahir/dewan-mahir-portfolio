import { Award, Calendar, ExternalLink } from "lucide-react";
import { certificates } from "../data/portfolioData.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Certificates() {
  return (
    <section className="section section-alt" id="certificates">
      <div className="container">
        <SectionHeading
          eyebrow="CREDENTIALS"
          title={
            <>
              Certifications &amp;{" "}
              <span className="gradient-text">milestones.</span>
            </>
          }
          description="Verified coursework, certifications, and specialized programs completed along the journey."
        />
        <div className="certificates-grid">
          {certificates.map((cert) => (
            <article className="certificate-card" key={cert.title}>
              <div className="cert-head">
                <div className="cert-icon">
                  <Award size={22} />
                </div>
                <div className="cert-meta-top">
                  <span className="cert-badge">{cert.issuer}</span>
                  <span className="cert-date">
                    <Calendar size={13} /> {cert.date}
                  </span>
                </div>
              </div>
              <h3>{cert.title}</h3>
              <div className="cert-tags">
                {cert.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cert-link"
                >
                  Verify credential <ExternalLink size={14} />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

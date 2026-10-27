import { Layout, Server, Sparkles, Zap } from "lucide-react";
import { services } from "../data/portfolioData.js";
import SectionHeading from "./SectionHeading.jsx";

const iconMap = {
  frontend: <Layout size={22} />,
  fullstack: <Server size={22} />,
  performance: <Zap size={22} />,
  uiux: <Sparkles size={22} />,
};

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHeading
          eyebrow="WHAT I DO"
          title={
            <>
              Services &amp; <span className="gradient-text">specializations.</span>
            </>
          }
          description="Transforming project goals into clean, responsive, and maintainable digital web applications."
        />
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.id}>
              <div className="service-icon">
                {iconMap[service.id] || <Sparkles size={22} />}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-tags">
                {service.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

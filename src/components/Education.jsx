import { BookOpen, GraduationCap } from "lucide-react";
import { education } from "../data/portfolioData.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Education() {
  return (
    <section className="section section-alt" id="education">
      <div className="container">
        <SectionHeading
          eyebrow="EDUCATION"
          title={
            <>
              Learning is a <span className="gradient-text">long game.</span>
            </>
          }
          description="Add your verified education details here before sharing the portfolio."
        />
        <div className="education-list">
          {education.map((item, i) => (
            <article className="education-card" key={i}>
              <div className="education-icon">
                <GraduationCap size={24} />
              </div>
              <div className="education-content">
                <span className="timeline-label">
                  <BookOpen size={14} /> EDUCATION
                </span>
                <h3>{item.qualification}</h3>
                <h4>{item.institution}</h4>
                <p>{item.details}</p>
              </div>
              <span className="education-period">{item.period}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

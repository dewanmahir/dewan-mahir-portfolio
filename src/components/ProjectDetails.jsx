import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Lightbulb,
  Wrench,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data/portfolioData.js";

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project)
    return (
      <section className="section container not-found">
        <p className="eyebrow">PROJECT NOT FOUND</p>
        <h1>That project isn't here.</h1>
        <Link className="button button-primary" to="/#projects">
          Back to projects
        </Link>
      </section>
    );
  return (
    <section className="section project-detail">
      <div className="container detail-container">
        <Link to="/#projects" className="back-link">
          <ArrowLeft size={16} /> Back to all projects
        </Link>
        <p className="eyebrow">PROJECT CASE STUDY</p>
        <h1>{project.name}</h1>
        <p className="detail-lead">{project.description}</p>
        <img
          className="detail-cover"
          src={project.image}
          alt={`${project.name} project preview`}
        />
        <div className="detail-links">
          <a
            className="button button-primary"
            href={project.live}
            target="_blank"
            rel="noreferrer"
          >
            Live project <ArrowUpRight size={17} />
          </a>
          <a
            className="button button-secondary"
            href={project.github}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} /> Client repository
          </a>
        </div>
        <div className="detail-info-grid">
          <article className="detail-panel">
            <h2>
              <Wrench size={19} /> Technology stack
            </h2>
            <div className="tag-list">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
          <article className="detail-panel">
            <h2>
              <Lightbulb size={19} /> Challenges faced
            </h2>
            <p>{project.challenges}</p>
          </article>
          <article className="detail-panel detail-panel-wide">
            <h2>
              <ArrowUpRight size={19} /> Future improvements
            </h2>
            <p>{project.improvements}</p>
          </article>
        </div>
        <p className="demo-warning">
          Demo content: update this case study with your real development
          process, working live URL, and repository before submission.
        </p>
      </div>
    </section>
  );
}

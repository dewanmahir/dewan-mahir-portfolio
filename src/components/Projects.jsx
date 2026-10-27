import { useState } from "react";
import { ArrowUpRight, ExternalLink, Github, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../data/portfolioData.js";
import SectionHeading from "./SectionHeading.jsx";

const filterCategories = ["All", "React", "Frontend"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter(
          (project) =>
            project.filterTag === activeFilter ||
            project.stack.includes(activeFilter) ||
            project.category.toLowerCase().includes(activeFilter.toLowerCase())
        );

  return (
    <section className="section section-alt" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow="SELECTED WORK"
          title={
            <>
              Projects that turn ideas{" "}
              <span className="gradient-text">into reality.</span>
            </>
          }
          description="Explore selected client and personal projects demonstrating full-stack engineering, clean UI architecture, and modern practices."
        />

        <div className="projects-filter-bar">
          <div className="filter-pills" role="tablist" aria-label="Project categories">
            {filterCategories.map((category) => (
              <button
                key={category}
                role="tab"
                aria-selected={activeFilter === category}
                className={`filter-pill ${
                  activeFilter === category ? "filter-pill-active" : ""
                }`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="filter-count">
            <Layers size={14} /> Showing {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <article className="project-card" key={project.slug}>
              <Link
                className="project-image-link"
                to={`/projects/${project.slug}`}
                aria-label={`View ${project.name} details`}
              >
                <img
                  src={project.image}
                  alt={`${project.name} preview`}
                  loading="lazy"
                />
                <span className="project-index">0{index + 1}</span>
              </Link>
              <div className="project-content">
                <p className="project-category">{project.category}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.stack.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-actions">
                  <Link
                    className="text-link"
                    to={`/projects/${project.slug}`}
                  >
                    View details <ArrowUpRight size={16} />
                  </Link>
                  <div className="project-external-links">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="icon-link"
                        aria-label={`Live demo for ${project.name}`}
                        title="Live Preview"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="icon-link"
                      aria-label={`GitHub repository for ${project.name}`}
                      title="GitHub Repository"
                    >
                      <Github size={17} />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

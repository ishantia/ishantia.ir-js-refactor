import React from "react";
import { useReveal } from "../hooks/useReveal.js";
import Icon from "./Icon.jsx";

const LINK_PATTERN = /^https?:\/\//i;

export default function ProjectCard({ project, index }) {
  const [ref, visible] = useReveal();
  const rawLink = project.link || "";
  const safeLink = LINK_PATTERN.test(rawLink)
    ? rawLink
    : "https://github.com/ishantia";
  const isExternalSite = !safeLink.includes("github.com");
  const tags = Array.isArray(project.tags) ? project.tags : [];
  const name = project.name || "Untitled Project";

  return (
    <article
      ref={ref}
      className={`project-card reveal${visible ? " visible" : ""}`}
      style={{ transitionDelay: `${Math.min(index * 50, 250)}ms` }}
    >
      <div className="project-card-header">
        <div className="project-type-indicator">
          <Icon name={isExternalSite ? "external-link" : "github"} size={16} />
          <span>{isExternalSite ? "Live Site" : "Open Source"}</span>
        </div>
        <a
          href={safeLink}
          className="project-corner-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${name} in a new tab`}
        >
          <Icon name="external-link" size={16} />
        </a>
      </div>

      <div className="project-body">
        <h3 className="project-title">{name}</h3>
        <p className="project-desc">{project.description || "Project details coming soon."}</p>
      </div>

      <div className="project-footer">
        <div className="project-tags">
          {tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={safeLink}
          className="project-action-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${name}`}
        >
          <span>{isExternalSite ? "Visit Site" : "Source Code"}</span>
          <Icon name={isExternalSite ? "external-link" : "arrow-up"} size={14} className="action-arrow" />
        </a>
      </div>
    </article>
  );
}

import React, { useMemo, useState } from "react";
import Reveal from "./Reveal.jsx";
import ProjectCard from "./ProjectCard.jsx";
import Icon from "./Icon.jsx";
import projectsData from "../data/projects.json";

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "python", label: "Python & Bots" },
  { id: "hardware", label: "Android & Hardware" },
  { id: "web", label: "Web & Tools" },
];

function matchesCategory(project, catId) {
  if (catId === "all") return true;
  const tagsStr = (project.tags || []).join(" ").toLowerCase();
  const descStr = (project.description || "").toLowerCase();
  const nameStr = (project.name || "").toLowerCase();
  const allStr = `${tagsStr} ${descStr} ${nameStr}`;

  if (catId === "python") {
    return allStr.includes("python") || allStr.includes("telegram") || allStr.includes("bot");
  }
  if (catId === "hardware") {
    return (
      allStr.includes("android") ||
      allStr.includes("arduino") ||
      allStr.includes("digispark") ||
      allStr.includes("twrp") ||
      allStr.includes("kernel") ||
      allStr.includes("root") ||
      allStr.includes("hardware") ||
      allStr.includes("firmware")
    );
  }
  if (catId === "web") {
    return (
      allStr.includes("web") ||
      allStr.includes("html") ||
      allStr.includes("react") ||
      allStr.includes("dns") ||
      allStr.includes("company") ||
      allStr.includes("menu") ||
      allStr.includes("typescript") ||
      allStr.includes("javascript") ||
      allStr.includes("php") ||
      allStr.includes("pwa") ||
      allStr.includes("tools")
    );
  }
  return true;
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const projects = Array.isArray(projectsData) && projectsData.length ? projectsData : [];

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return projects.filter((project) => {
      const inCategory = matchesCategory(project, activeCategory);
      if (!inCategory) return false;
      if (!q) return true;
      const combined = `${project.name || ""} ${project.description || ""} ${(project.tags || []).join(" ")}`.toLowerCase();
      return combined.includes(q);
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="projects-header">
          <div>
            <Reveal as="p" className="section-kicker">
              Featured Work
            </Reveal>
            <Reveal as="h2" className="section-title">
              Selected projects &amp; open-source tools.
            </Reveal>
          </div>
          <Reveal
            as="a"
            className="button"
            href="https://github.com/ishantia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit GitHub Profile"
          >
            <Icon name="github" size={18} />
            <span>GitHub Profile</span>
          </Reveal>
        </div>

        {/* Filter controls & Search */}
        <div className="projects-controls">
          <div className="category-pills" role="tablist" aria-label="Project Categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`category-pill${activeCategory === cat.id ? " active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="project-search-box">
            <Icon name="search" size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search projects or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search projects by title or tag"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <Icon name="xmark" size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="projects-grid" id="projects-grid" aria-live="polite">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.name ?? index}
                project={project}
                index={index}
              />
            ))
          ) : (
            <div className="no-projects-found">
              <p>No projects match your filter criteria.</p>
              <button
                type="button"
                className="button"
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

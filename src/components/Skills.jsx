import React from "react";
import Reveal from "./Reveal.jsx";
import { useReveal } from "../hooks/useReveal.js";
import Icon from "./Icon.jsx";

const SKILLS = [
  { name: "Python & Automation", value: 90, tag: "Primary" },
  { name: "Git & Version Control", value: 90, tag: "Workflow" },
  { name: "Java Development", value: 85, tag: "Backend/App" },
  { name: "C / C++ Systems", value: 80, tag: "Low-level" },
  { name: "Telegram API & Bots", value: 65, tag: "Services" },
  { name: "C# & .NET", value: 30, tag: "Basics" },
  { name: "Android Architecture", value: 25, tag: "Platform" },
];

const TECH_CHIPS = [
  { icon: "python", label: "Python" },
  { icon: "java", label: "Java" },
  { icon: "code", label: "C / C++" },
  { icon: "hashtag", label: "C#" },
  { icon: "github", label: "Git / GitHub" },
  { icon: "mobile-screen", label: "Android" },
  { icon: "telegram", label: "Telegram API" },
  { icon: "network-wired", label: "Linux / Cisco" },
];

function SkillCard({ name, value, tag }) {
  const [ref, visible] = useReveal();
  return (
    <article
      ref={ref}
      className={`skill-card reveal${visible ? " visible" : ""}`}
    >
      <div className="skill-top">
        <div className="skill-meta">
          <span className="skill-name">{name}</span>
          {tag && <span className="skill-badge">{tag}</span>}
        </div>
        <span className="skill-value">{value}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-progress"
          style={{ width: visible ? `${value}%` : "0%" }}
        ></div>
      </div>
    </article>
  );
}

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal as="p" className="section-kicker">
          Technical Arsenal
        </Reveal>
        <Reveal as="h2" className="section-title">
          A focused stack for systems, automation &amp; modern apps.
        </Reveal>
        <Reveal as="p" className="section-copy">
          From scripting complex workflows to managing low-level code and integrating REST/WebSocket APIs, here is an overview of my proficiency.
        </Reveal>

        <div className="skills-layout">
          <div className="skills-grid">
            {SKILLS.map((skill) => (
              <SkillCard
                key={skill.name}
                name={skill.name}
                value={skill.value}
                tag={skill.tag}
              />
            ))}
          </div>

          <Reveal as="aside" className="stack-panel profile-panel">
            <h3>Tech Ecosystem</h3>
            <p className="stack-desc">Technologies, protocols, and developer toolchains I work with.</p>
            <div className="tech-cloud">
              {TECH_CHIPS.map((chip) => (
                <span className="tech-chip" key={chip.label}>
                  <Icon name={chip.icon} size={16} />
                  <span>{chip.label}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

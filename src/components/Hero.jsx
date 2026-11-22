import React from "react";
import Magnetic from "./Magnetic.jsx";
import Icon from "./Icon.jsx";

export default function Hero() {
  return (
    <section className="hero section" id="home">
      <div className="container hero-grid">
        <div className="hero-copy hero-animate-in">
          <div className="hero-eyebrow">
            <span className="status-dot"></span>
            <span>Student &bull; Software Developer &bull; AI Enthusiast</span>
          </div>

          <h1 className="hero-name">
            <span>Shantia</span>
            <span className="gradient-text">Eslami</span>
          </h1>

          <p className="hero-subtitle">
            Crafting high-performance software with <strong>Python</strong>, <strong>Java</strong>, Android, Telegram APIs, and exploring AI model integrations.
          </p>

          <div className="hero-actions">
            <Magnetic href="#projects" className="button primary">
              <Icon name="rocket" size={18} />
              <span>Explore Projects</span>
            </Magnetic>
            <Magnetic href="#contact" className="button">
              <Icon name="envelope" size={18} />
              <span>Get In Touch</span>
            </Magnetic>
          </div>

          <div className="social-row" aria-label="Social profiles">
            <a
              className="social-link"
              href="https://github.com/ishantia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Icon name="github" size={18} />
              <span>GitHub</span>
            </a>
            <a
              className="social-link"
              href="https://t.me/ishantia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram Channel"
            >
              <Icon name="telegram" size={18} />
              <span>Telegram</span>
            </a>
          </div>

          <div className="metrics-strip" aria-label="Profile highlights">
            <div className="metric">
              <strong>Python</strong>
              <span>Core Specialization</span>
            </div>
            <div className="metric">
              <strong>Open Source</strong>
              <span>Mindset &amp; Builds</span>
            </div>
            <div className="metric">
              <strong>Hardware &amp; IoT</strong>
              <span>Arduino &amp; Digispark</span>
            </div>
          </div>
        </div>

        <div
          className="hero-visual hero-animate-in"
          data-parallax="0.08"
          aria-label="Interactive developer profile visual"
        >
          <div className="orbit-shell">
            <div className="avatar-core">
              <img
                src="/assets/images/mybot-320.webp"
                srcSet="/assets/images/mybot-160.webp 160w, /assets/images/mybot-320.webp 320w, /assets/images/mybot-480.webp 480w"
                sizes="(max-width: 640px) 130px, 154px"
                alt="Avatar illustration of Shantia Eslami"
                width="154"
                height="154"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div className="signal one">
              <Icon name="python" size={20} />
              <span>Python</span>
            </div>
            <div className="signal two">
              <Icon name="java" size={20} />
              <span>Java</span>
            </div>
            <div className="signal three">
              <Icon name="mobile-screen" size={20} />
              <span>Android</span>
            </div>
            <div className="signal four">
              <Icon name="network-wired" size={20} />
              <span>APIs</span>
            </div>
          </div>

          <div className="terminal">
            <div className="terminal-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="terminal-title">ishantia@dev:~</span>
            </div>
            <div className="terminal-body">
              <div>
                <span className="prompt">$</span> welcome --portfolio
              </div>
              <div>
                <span className="prompt">$</span> build: creative &amp; fast solutions
              </div>
              <div>
                <span className="prompt">$</span> status: continuous learning
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

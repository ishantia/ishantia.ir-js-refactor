import React from "react";
import Icon from "./Icon.jsx";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <span className="brand-mark">SE</span>
          <span className="footer-title">Shantia Eslami</span>
        </div>
        <p className="footer-copy">
          &copy; {currentYear} Shantia Eslami. Built with React &amp; Vite &bull; Ultra-optimized.
        </p>
        <div className="footer-links">
          <a
            href="https://github.com/ishantia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="footer-icon-link"
          >
            <Icon name="github" size={18} />
          </a>
          <a
            href="https://t.me/ishantia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="footer-icon-link"
          >
            <Icon name="telegram" size={18} />
          </a>
          <a
            href="mailto:shantiaeslami@gmail.com"
            aria-label="Email"
            className="footer-icon-link"
          >
            <Icon name="envelope" size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

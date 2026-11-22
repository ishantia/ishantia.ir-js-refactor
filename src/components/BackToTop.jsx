import React from "react";
import { prefersReducedMotion } from "../hooks/useReveal.js";
import Icon from "./Icon.jsx";

export default function BackToTop({ visible }) {
  return (
    <button
      className={`back-to-top${visible ? " show" : ""}`}
      id="backToTop"
      aria-label="Back to top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        })
      }
    >
      <Icon name="arrow-up" size={18} />
    </button>
  );
}

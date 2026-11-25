import { StrictMode, startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root")!;
const hasPrerenderedContent =
  rootElement.hasChildNodes() &&
  rootElement.firstChild?.nodeType !== Node.COMMENT_NODE;

if (hasPrerenderedContent) {
  startTransition(() => {
    hydrateRoot(
      rootElement,
      <StrictMode>
        <App />
      </StrictMode>,
    );
  });
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

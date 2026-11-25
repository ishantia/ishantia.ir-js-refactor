import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const ssrDir = path.join(rootDir, "dist-ssr");
const htmlPath = path.join(distDir, "index.html");
const serverEntryPath = path.join(ssrDir, "entry-server.js");

if (!fs.existsSync(htmlPath)) {
  throw new Error(`Missing client build output at ${htmlPath}`);
}
if (!fs.existsSync(serverEntryPath)) {
  throw new Error(`Missing SSR build output at ${serverEntryPath}`);
}

const { render } = await import(pathToFileURL(serverEntryPath).href);
const appHtml = render();
const template = fs.readFileSync(htmlPath, "utf-8");

if (!template.includes("<!--app-html-->")) {
  throw new Error("Placeholder <!--app-html--> not found in dist/index.html");
}

let finalHtml = template.replace("<!--app-html-->", appHtml);

// Inline critical stylesheet to eliminate render-blocking CSS requests on mobile
finalHtml = finalHtml.replace(
  /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g,
  (match, href) => {
    const cssPath = path.join(distDir, href.replace(/^\//, ""));
    if (fs.existsSync(cssPath)) {
      const cssContent = fs.readFileSync(cssPath, "utf-8");
      return `<style>${cssContent}</style>`;
    }
    return match;
  },
);

fs.writeFileSync(htmlPath, finalHtml, "utf-8");

// Also generate dist/resume/index.html so direct /resume hits have full SSG HTML
const resumeDir = path.join(distDir, "resume");
fs.mkdirSync(resumeDir, { recursive: true });
fs.writeFileSync(path.join(resumeDir, "index.html"), finalHtml, "utf-8");

// Clean up temporary SSR directory
fs.rmSync(ssrDir, { recursive: true, force: true });

// Sanity checks for SEO & prerendering
const requiredChecks = [
  'name="google-site-verification" content="jP8WfjgqcuWdUKcHf2yG7rcwRJIDOaTLQKLYTgtL0GE"',
  "Shantia Eslami",
  "SnowaTech",
  "application/ld+json",
];

for (const marker of requiredChecks) {
  if (!finalHtml.includes(marker)) {
    throw new Error(`Prerender verification failed: missing "${marker}"`);
  }
}

console.log(
  `✓ Prerendered dist/index.html (${Buffer.byteLength(finalHtml, "utf-8")} bytes) and dist/resume/index.html`,
);

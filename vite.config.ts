import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  // Custom domain CNAME (ishantia.ir) is present in public/CNAME
  base: "/",
  build: {
    target: "es2022",
    cssMinify: true,
    minify: "esbuild",
    rollupOptions: isSsrBuild
      ? undefined
      : {
          output: {
            manualChunks: {
              "react-vendor": ["react", "react-dom"],
              "icons-vendor": ["lucide-react"],
            },
          },
        },
  },
}));

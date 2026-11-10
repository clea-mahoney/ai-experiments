import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// One self-contained HTML file: double-click to open, no server needed.
export default defineConfig({
  root: "web",
  plugins: [react(), viteSingleFile()],
  build: { outDir: "../dist", emptyOutDir: true },
});

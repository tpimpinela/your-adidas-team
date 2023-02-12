/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import postcssNesting from "postcss-nesting";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
});

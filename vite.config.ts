import { defineConfig } from "vite";
import { UserConfig } from "vitest/node";

export default defineConfig({
  test: <UserConfig>{
    globals: true,
    environment: "jsdom",
    setupFiles: ["@testing-library/jest-dom"],
  },
});

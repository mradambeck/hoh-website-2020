import { defineConfig } from "vitest/config";

// Without a config file here, Vitest walks up and picks up the parent
// project's vite.config.ts (and its src/**/*.test.ts include pattern),
// which excludes this package's own .test.js files.
export default defineConfig({});


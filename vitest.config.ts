import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      exclude: [
        "node_modules/",
        "demo/",
        "dist/",
        "src/components/",
        "src/lib/",
        "*.config.ts",
        "**/*.d.ts",
      ],
    },
  },
});

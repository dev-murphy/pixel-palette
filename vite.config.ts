import { defineConfig } from "vite";
import { resolve } from "path";

import Vue from "@vitejs/plugin-vue";
import DTS from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    DTS({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/index.ts"),
      name: "PixelPalette",
      fileName: "pixel-palette",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});

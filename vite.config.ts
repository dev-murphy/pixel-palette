import { defineConfig } from "vite";
import { resolve } from "path";

import Vue from "@vitejs/plugin-vue";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import dts from "unplugin-dts/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    libInjectCss(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      processor: 'vue'
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

import { defineConfig } from "vite";
import autoImport from "unplugin-auto-import/vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    autoImport({
      imports: ["vue"],
      dts: "./auto-imports.d.ts",
    }),
  ],
  base: "/pixel-palette/",
});

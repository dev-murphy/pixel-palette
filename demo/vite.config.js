import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ command }) => {
  const config = {
    plugins: [vue()],
    build: {
      outDir: "dist",
      assetsDir: "assets",
    },
  };

  if (command === "build") {
    config.base =
      process.env.NODE_ENV === "production" ? "/pixel-palette/" : "./";
  }

  return config;
});

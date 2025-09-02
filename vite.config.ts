import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [Vue(), Tailwindcss()],
});

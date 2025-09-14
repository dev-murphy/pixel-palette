<script setup lang="ts">
import { ref, markRaw, computed, reactive } from "vue";
import { ColorPicker } from "pixel-palette";
import "pixel-palette/style.css";

// Component imports
import YarnIcon from "./components/icons/yarn.vue";
import NpmIcon from "./components/icons/npm.vue";
import PnpmIcon from "./components/icons/pnpm.vue";
import BunIcon from "./components/icons/bun.vue";
import Switch from "./components/Switch.vue";
import CopyIcon from "./components/icons/Copy.vue";
import CopyCheckIcon from "./components/icons/CopyCheck.vue";
import XSelect from "./components/XSelect.vue";

// Types
interface PackageManager {
  pkg: string;
  icon: any;
}

type ColorMode = "hex" | "hsl" | "rgb";

// Package managers configuration
const PACKAGE_MANAGERS: PackageManager[] = [
  { pkg: "npm", icon: markRaw(NpmIcon) },
  { pkg: "yarn", icon: markRaw(YarnIcon) },
  { pkg: "pnpm", icon: markRaw(PnpmIcon) },
  { pkg: "bun", icon: markRaw(BunIcon) },
];

const DEFAULT_COLOR_SWATCH = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#fbbf24",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
  "#4b5563",
  "#e5e7eb",
  "#1e40af",
  "#22c55e",
];

// State
const currentColor = ref("hsl(210, 100%, 50%)");
const selectedPackageManager = ref<PackageManager>(PACKAGE_MANAGERS[0]);
const copyState = reactive({
  copied: false,
  timer: null as number | null,
});

// Component props state
const componentProps = reactive({
  title: "Test",
  initialColor: "hsl(210, 100%, 50%)",
  enableAlpha: true,
  openAlphaByDefault: false,
  initialColorMode: "hex" as ColorMode,
  colorSwatch: DEFAULT_COLOR_SWATCH,
});

// Computed
const installCommand = computed(() => {
  const { pkg } = selectedPackageManager.value;
  const commandMap: Record<string, string> = {
    npm: "npm install pixel-palette",
    yarn: "yarn add pixel-palette",
    pnpm: "pnpm add pixel-palette",
    bun: "bun add pixel-palette",
  };
  return commandMap[pkg] || commandMap.npm;
});

const commandDisplay = computed(() => {
  const { pkg } = selectedPackageManager.value;
  const action = pkg === "npm" ? "install" : "add";
  return `${pkg} ${action} pixel-palette`;
});

// Methods
const handleColorChange = (color: string): void => {
  currentColor.value = color;
};

const selectPackageManager = (manager: PackageManager): void => {
  selectedPackageManager.value = manager;
};

const setColorMode = (mode: ColorMode): void => {
  componentProps.initialColorMode = mode;
};

const copyInstallCommand = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(installCommand.value);
    copyState.copied = true;

    // Clear existing timer
    if (copyState.timer) {
      clearTimeout(copyState.timer);
    }

    // Set new timer
    copyState.timer = window.setTimeout(() => {
      copyState.copied = false;
      copyState.timer = null;
    }, 1200);
  } catch (error) {
    console.error("Failed to copy install command:", error);
  }
};

// Color mode button configuration
const colorModeButtons = [
  { mode: "hex" as ColorMode, label: "HEX" },
  { mode: "hsl" as ColorMode, label: "HSL" },
  { mode: "rgb" as ColorMode, label: "RGB" },
];

const getColorModeButtonClasses = (mode: ColorMode, index: number) => {
  const isActive = componentProps.initialColorMode === mode;
  const isFirst = index === 0;
  const isLast = index === colorModeButtons.length - 1;

  return [
    "flex items-center justify-center px-3 py-1 uppercase border cursor-pointer text-sm",
    {
      "rounded-l-md": isFirst,
      "rounded-r-md": isLast,
      "border-r-0": !isLast,
      "border-blue-500 bg-blue-900": isActive,
      "border-neutral-500": !isActive,
    },
  ];
};

const getPackageManagerButtonClasses = (pkg: string) => [
  "hidden sm:flex group text-sm relative top-[3px] items-center justify-center gap-x-1.5 px-3 py-2 cursor-pointer",
  {
    "pkg text-white": selectedPackageManager.value.pkg === pkg,
    "hover:text-white text-neutral-500":
      selectedPackageManager.value.pkg !== pkg,
  },
];
</script>

<template>
  <div class="app-container">
    <!-- Background with dynamic color -->
    <div class="color-background" :style="{ backgroundColor: currentColor }" />

    <!-- Main content -->
    <div class="main-content">
      <!-- Color Picker Component -->
      <ColorPicker
        :title="componentProps.title"
        :initial-color="componentProps.initialColor"
        :enable-alpha="componentProps.enableAlpha"
        :open-alpha-by-default="componentProps.openAlphaByDefault"
        :initial-color-mode="componentProps.initialColorMode"
        :color-swatch="componentProps.colorSwatch"
        @set-color="handleColorChange"
      />

      <!-- Configuration Panel -->
      <div class="config-panel">
        <!-- Install Command Section -->
        <div class="install-command-section">
          <!-- Package Manager Tabs (Desktop) -->
          <div class="package-manager-tabs">
            <button
              v-for="manager in PACKAGE_MANAGERS"
              :key="manager.pkg"
              :class="getPackageManagerButtonClasses(manager.pkg)"
              @click="selectPackageManager(manager)"
            >
              <Component :is="manager.icon" class="w-5 h-5" />
              <p class="pb-0.5 font-semibold uppercase">
                {{ manager.pkg }}
              </p>
            </button>

            <!-- Package Manager Select (Mobile) -->
            <XSelect
              :commands="PACKAGE_MANAGERS"
              class="sm:hidden"
              v-model="selectedPackageManager"
            />
          </div>

          <!-- Command Display -->
          <div class="command-display">
            <div class="command-text">
              <span class="text-[#b392f0]">$</span>
              {{ commandDisplay }}
            </div>

            <button
              class="copy-button"
              @click="copyInstallCommand"
              :disabled="copyState.copied"
            >
              <p v-if="copyState.copied" class="copy-text">Copied</p>
              <div class="copy-icon">
                <CopyIcon v-if="!copyState.copied" class="w-5 h-5" />
                <CopyCheckIcon v-else class="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>

        <!-- Props Configuration Section -->
        <div class="props-section">
          <h2 class="props-title">Pixel Palette Props</h2>

          <!-- Title Input -->
          <div class="prop-row">
            <label class="prop-label">Title</label>
            <input
              v-model="componentProps.title"
              type="text"
              placeholder="Enter component title"
              class="prop-input"
            />
          </div>

          <!-- Initial Color Display -->
          <div class="prop-row">
            <label class="prop-label">Initial Color</label>
            <input
              v-model="componentProps.initialColor"
              type="text"
              placeholder="Enter component initial color"
              readonly
              class="prop-input prop-input--readonly"
            />
          </div>

          <!-- Toggle Options -->
          <div class="toggle-options">
            <div class="toggle-row">
              <label class="toggle-label">Enable Alpha?</label>
              <Switch v-model="componentProps.enableAlpha" />
            </div>

            <div class="toggle-row">
              <label class="toggle-label">
                Open Alpha
                <span class="hidden md:inline">Channel by default?</span>
              </label>
              <Switch v-model="componentProps.openAlphaByDefault" />
            </div>
          </div>

          <!-- Color Mode Selection -->
          <div class="prop-row">
            <label class="prop-label">Color Mode</label>
            <div class="color-mode-buttons">
              <button
                v-for="(button, index) in colorModeButtons"
                :key="button.mode"
                :class="getColorModeButtonClasses(button.mode, index)"
                @click="setColorMode(button.mode)"
              >
                {{ button.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "tailwindcss";

.app-container {
  @apply w-screen h-screen flex items-center justify-center;
  --size: 50px;
  --c1: #f2f2f2;
  --c2: #8f8f8f;

  background: conic-gradient(
      from 90deg,
      var(--c1) 25%,
      var(--c2) 0 50%,
      var(--c1) 0 75%,
      var(--c2) 0
    )
    0 0 / var(--size) var(--size);
  background-position: center;
}

.app-container::after {
  content: "";
  @apply absolute inset-0 bg-gradient-to-b from-neutral-50/80 via-transparent to-neutral-900/80;
}

.color-background {
  @apply absolute inset-0;
}

.main-content {
  @apply flex flex-col-reverse md:flex-row items-center md:items-start gap-3 z-10;
}

.config-panel {
  @apply flex flex-col gap-y-2 px-3;
}

.install-command-section {
  @apply w-full bg-neutral-800 text-white rounded-xl shadow-xl;
}

.package-manager-tabs {
  @apply w-full flex flex-col sm:flex-row border-b-2 border-neutral-900 sm:px-4;
}

.command-display {
  @apply flex items-center gap-5 justify-between px-4 font-mono;
}

.command-text {
  @apply text-sm text-[#90b9e7] py-4;
}

.copy-button {
  @apply flex bg-neutral-900 border-2 border-neutral-600 divide-x-2 divide-neutral-600 rounded-md overflow-hidden transition-opacity;
}

.copy-button:disabled {
  @apply opacity-75;
}

.copy-text {
  @apply hidden sm:inline-block text-sm p-1;
}

.copy-icon {
  @apply p-1 bg-neutral-800;
}

.props-section {
  @apply w-full bg-neutral-800 flex flex-col gap-y-3 p-3 text-white rounded-lg shadow-xl;
}

.props-title {
  @apply text-xl font-bold pb-2 border-b-2 border-black;
}

.prop-row {
  @apply w-full flex items-center gap-x-4;
}

.prop-label {
  @apply w-[80px] md:w-[160px] text-sm font-bold;
}

.prop-input {
  @apply flex-grow px-2 py-1 rounded bg-white text-black;
}

.prop-input--readonly {
  @apply bg-neutral-700 text-neutral-400 cursor-not-allowed;
}

.toggle-options {
  @apply flex flex-row md:flex-col gap-3;
}

.toggle-row {
  @apply flex flex-col md:flex-row items-center gap-x-4 gap-y-2;
}

.toggle-label {
  @apply w-[160px] text-sm text-center md:text-left font-bold;
}

.color-mode-buttons {
  @apply flex text-sm ml-auto sm:ml-0;
}

.pkg::before {
  content: "";
  @apply absolute top-full left-1/2 -translate-y-1 -translate-x-1/2 w-3/5 h-1 bg-blue-500 rounded;
}
</style>

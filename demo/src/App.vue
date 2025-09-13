<script setup>
import { ref } from "vue";
import { ColorPicker } from "pixel-palette";
import "pixel-palette/style.css";

import Yarn from "./components/icons/yarn.vue";
import npm from "./components/icons/npm.vue";
import Pnpm from "./components/icons/pnpm.vue";
import Bun from "./components/icons/bun.vue";
import Switch from "./components/Switch.vue";
import Copy from "./components/icons/Copy.vue";
import CopyCheck from "./components/icons/CopyCheck.vue";

const commands = ref(["npm", "yarn", "pnpm", "bun"]);
const selectedPackage = ref("npm");

const currentColor = ref("hsl(210, 100%, 50%)");
const componentProps = ref({
  title: "Test",
  initialColor: "hsl(210, 100%, 50%)",
  currentColor: "",
  enableAlpha: true,
  openAlphaByDefault: false,
  initialColorMode: "hex",
});

function handleColorChange(color) {
  console.log("Color changed:", color);
  currentColor.value = color;
}

let timer = null;
const copied = ref(false);
async function copyText() {
  try {
    let command = "npm install pixel-palette";
    if (selectedPackage.value === "yarn") {
      command = "yarn add pixel-palette";
    } else if (selectedPackage.value === "pnpm") {
      command = "pnpm add pixel-palette";
    } else if (selectedPackage.value === "bun") {
      command = "bun add pixel-palette";
    }

    await navigator.clipboard.writeText(command);
    copied.value = true;

    if (timer) clearTimeout(timer);
    timer = window.setTimeout(() => {
      copied.value = false;
    }, 1200);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
}

function setColorMode(mode) {
  componentProps.value.initialColorMode = mode;
}
</script>

<template>
  <div
    class="w-screen h-screen flex items-center justify-center"
    :style="{
      backgroundColor: currentColor,
    }"
  >
    <div
      class="flex flex-col-reverse md:flex-row items-center md:items-start gap-3"
    >
      <ColorPicker
        :title="componentProps.title"
        :initial-color="componentProps.initialColor"
        :enable-alpha="componentProps.enableAlpha"
        :open-alpha-by-default="componentProps.openAlphaByDefault"
        :initial-color-mode="co"
        @set-color="handleColorChange"
      />

      <div class="flex flex-col gap-y-2">
        <div class="bg-neutral-800 text-white rounded-xl shadow-xl">
          <div class="w-full flex border-b-2 border-neutral-900 px-4">
            <button
              v-for="command in commands"
              :key="command.packageManager"
              class="group text-sm relative top-[3px] flex items-center justify-center gap-x-1.5 px-3 py-2 cursor-pointer"
              :class="{
                pkg: selectedPackage === command,
              }"
              @click="
                () => {
                  selectedPackage = command;
                }
              "
            >
              <npm v-if="command === 'npm'" class="w-5 h-5" />
              <Yarn v-if="command === 'yarn'" class="w-5 h-5" />
              <Pnpm v-if="command === 'pnpm'" class="w-5 h-5" />
              <Bun v-if="command === 'bun'" class="w-5 h-5" />
              <p
                class="pb-0.5 font-semibold uppercase"
                :class="[
                  selectedPackage === command
                    ? 'text-white'
                    : 'group-hover:text-white text-neutral-500',
                ]"
              >
                {{ command }}
              </p>
            </button>
          </div>

          <div class="flex items-center justify-between px-4 font-mono">
            <div class="text-sm text-[#90b9e7] py-4">
              <span class="text-[#b392f0]">$</span>
              <span v-if="selectedPackage === 'npm'"> npm install </span>
              <span v-if="selectedPackage === 'pnpm'"> pnpm add </span>
              <span v-if="selectedPackage === 'yarn'"> yarn add </span>
              <span v-if="selectedPackage === 'bun'"> bun add </span>
              pixel-palette
            </div>
            <button
              class="flex bg-neutral-900 border-2 border-neutral-600 divide-x-2 divide-neutral-600 rounded-md overflow-hidden"
              @click.stop="copyText"
            >
              <p v-if="copied" class="text-sm p-1">Copied</p>
              <p class="p-1 bg-neutral-800">
                <Copy v-if="!copied" class="w-5 h-5" />
                <CopyCheck v-else class="w-5 h-5" />
              </p>
            </button>
          </div>
        </div>

        <div
          class="bg-neutral-800 flex flex-col gap-y-3 p-3 text-white rounded-lg shadow-xl"
        >
          <h2 class="text-xl font-bold pb-2 border-b-2 border-black">
            Pixel Palette Props
          </h2>
          <div class="flex items-center gap-x-4">
            <p class="w-[160px] text-sm font-bold">Title</p>
            <input
              type="text"
              placeholder="Enter component title"
              v-model="componentProps.title"
            />
          </div>

          <div class="flex items-center gap-x-4">
            <p class="w-[160px] text-sm font-bold">Initial Color</p>
            <input
              type="text"
              placeholder="Enter component initial color"
              v-model="componentProps.initialColor"
              readonly
              class="bg-neutral-700 text-neutral-400 px-2 rounded"
            />
          </div>

          <div class="flex items-center gap-x-4">
            <p class="w-[160px] text-sm font-bold">Enable Alpha?</p>
            <Switch v-model="componentProps.enableAlpha" />
          </div>

          <div class="flex items-center gap-x-4">
            <p class="w-[160px] text-sm font-bold">
              Open Alpha Channel by default?
            </p>
            <Switch v-model="componentProps.openAlphaByDefault" />
          </div>

          <div class="flex items-center gap-x-4">
            <p class="w-[160px] text-sm font-bold">Color Mode</p>
            <div class="flex text-sm">
              <button
                class="flex items-center justify-center px-3 py-1 uppercase border rounded-l-md cursor-pointer"
                :class="{
                  'border-neutral-500':
                    componentProps.initialColorMode !== 'hex',
                  'border-blue-500 bg-blue-900':
                    componentProps.initialColorMode === 'hex',
                  'border-r-0': componentProps.initialColorMode === 'hsl',
                }"
                @click="setColorMode('hex')"
              >
                hex
              </button>
              <button
                class="flex items-center justify-center px-3 py-1 uppercase border-y cursor-pointer"
                :class="{
                  'border-neutral-500':
                    componentProps.initialColorMode !== 'hsl',
                  'border-blue-500 bg-blue-900':
                    componentProps.initialColorMode === 'hsl',
                  'border-r border-l':
                    componentProps.initialColorMode === 'hsl',
                }"
                @click="setColorMode('hsl')"
              >
                hsl
              </button>
              <button
                class="flex items-center justify-center px-3 py-1 uppercase border rounded-r-md cursor-pointer"
                :class="{
                  'border-neutral-500':
                    componentProps.initialColorMode !== 'rgb',
                  'border-blue-500 bg-blue-900':
                    componentProps.initialColorMode === 'rgb',
                  'border-l-0': componentProps.initialColorMode === 'hsl',
                }"
                @click="setColorMode('rgb')"
              >
                rgb
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

.pkg::before {
  content: "";
  @apply absolute top-full left-1/2 -translate-y-1 -translate-x-1/2 w-3/5 h-1 bg-blue-500 rounded;
}
</style>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import tinycolor from "tinycolor2";
import type { ColorMode } from "../types";

import ColorSpace from "./common/ColorSpace.vue";
import HueSlider from "./common/HueSlider.vue";
import AlphaSlider from "./common/AlphaSlider.vue";
import ColorInput from "./common/ColorInput.vue";

import Picker from "./common/icons/Picker.vue";
import Copy from "./common/icons/Copy.vue";
import Random from "./common/icons/Random.vue";
import Switch from "./common/icons/Switch.vue";

const props = withDefaults(
  defineProps<{
    title?: string;
    initialColor?: string;
  }>(),
  {
    initialColor: "hsl(0, 100%, 50%)",
  }
);

const emits = defineEmits<{ (e: "set-color", val: string): void }>();

const hue = ref(0);
const alpha = ref(1);
const colorMode = ref<ColorMode>("hex");
const modes: ColorMode[] = ["rgb", "hsl", "hex"];
const hslColor = ref(props.initialColor);

const isEyeDropperSupported = ref(false);
const showCopiedTooltip = ref(false);
let copiedTooltipTimer: number | undefined;

const setHue = (colorHue: number) => {
  hue.value = colorHue;
};

const setAlpha = (colorAlpha: number) => {
  alpha.value = colorAlpha;
};

const setColor = (color: string) => {
  hslColor.value = color;
};

const setColorMode = (mode: ColorMode) => {
  colorMode.value = mode;
};

function toggleMode() {
  const currentIndex = modes.indexOf(colorMode.value);
  const nextIndex = (currentIndex + 1) % modes.length;
  colorMode.value = modes[nextIndex];
}

function extractColor() {
  let color = "";
  if (colorMode.value === "hsl") {
    color = tinycolor(hslColor.value).toHslString();
  } else if (colorMode.value === "rgb") {
    color = tinycolor(hslColor.value).toRgbString();
  } else if (colorMode.value === "hex") {
    color = tinycolor(hslColor.value).toHex8String();
  }
  return color;
}

function copyColor() {
  const color = extractColor();
  navigator.clipboard.writeText(color);

  // Show copied tooltip briefly
  showCopiedTooltip.value = true;
  if (copiedTooltipTimer) window.clearTimeout(copiedTooltipTimer);
  copiedTooltipTimer = window.setTimeout(() => {
    showCopiedTooltip.value = false;
  }, 1200);
}

// keep hue in sync when color changes (from inputs or space)
watch(
  hslColor,
  (val) => {
    const t = tinycolor(val);
    if (!t.isValid()) return;

    const hsv = t.toHsv();
    hue.value = Math.round(hsv.h);
    alpha.value = hsv.a ?? 1;

    emits("set-color", extractColor());
    document.body.style.setProperty("--hue", hue.value.toString());
  },
  { immediate: true }
);

onMounted(() => {
  isEyeDropperSupported.value =
    typeof (window as any).EyeDropper === "function";
});

async function pickWithEyeDropper() {
  try {
    const EyeDropperCtor = (window as any).EyeDropper;
    if (!EyeDropperCtor) return;
    const ed = new EyeDropperCtor();
    const result = await ed.open();
    if (result?.sRGBHex) {
      const tc = tinycolor(result.sRGBHex);
      if (tc.isValid()) setColor(tc.toHslString());
    }
  } catch (err) {
    // Silently ignore (e.g., user cancels or not secure context)
  }
}

function pickRandomColor() {
  alpha.value = 1;
  const randomColor = tinycolor.random();
  setColor(randomColor.toHslString());
}
</script>

<template>
  <div class="w-[320px] border-2 border-neutral-700 rounded-2xl">
    <h2
      v-if="props.title"
      class="pt-1 px-4 border-b-2 border-neutral-900 text-lg font-medium"
    >
      {{ props.title }}
    </h2>
    <div class="flex flex-col gap-y-2 pt-4 pb-2 px-3">
      <ColorSpace
        :hue="hue"
        :alpha="alpha"
        :color="hslColor"
        @set-color="setColor"
      />
      <ColorInput
        :color="hslColor"
        :mode="colorMode"
        @set-color="setColor"
        @set-color-mode="setColorMode"
      />
      <div class="flex flex-col gap-2">
        <HueSlider :hue="hue" @set-hue="setHue" />
        <AlphaSlider :alpha="alpha" @set-alpha="setAlpha" />
      </div>
    </div>

    <div
      class="relative flex items-center gap-x-2 p-2 border-t-2 border-neutral-900"
    >
      <button
        class="flex items-center gap-1 px-2 h-7 rounded text-neutral-900 font-medium hover:bg-neutral-200 hover:cursor-pointer transition"
        @click="toggleMode"
      >
        {{ colorMode.toUpperCase() }}
        <Switch class="w-5 h-5" />
      </button>

      <button
        v-if="isEyeDropperSupported"
        class="ml-auto px-1 h-7 rounded text-neutral-900 font-medium hover:bg-neutral-200 hover:cursor-pointer transition"
        @click="pickWithEyeDropper"
      >
        <Picker class="w-5 h-5" />
      </button>

      <button
        class="px-1 h-7 rounded text-neutral-900 font-medium hover:bg-neutral-200 hover:cursor-pointer transition"
        @click="pickRandomColor"
      >
        <Random class="w-5 h-5" />
      </button>

      <div class="relative h-7">
        <button
          class="px-1 h-full rounded text-neutral-900 font-medium hover:bg-neutral-200 hover:cursor-pointer transition"
          @click="copyColor"
        >
          <Copy class="w-5 h-5" />
        </button>

        <transition name="fade">
          <div
            v-if="showCopiedTooltip"
            class="absolute left-1/2 -translate-x-1/2 -top-[120%] whitespace-nowrap text-sm bg-neutral-900 text-white font-bold px-2 py-1 rounded shadow"
          >
            {{ colorMode.toUpperCase() }} Copied!
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>

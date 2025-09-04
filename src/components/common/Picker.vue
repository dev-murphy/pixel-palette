<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import tinycolor from "tinycolor2";
import type {
  ColorMode,
  ColorPickerEmits,
  ColorPickerProps,
} from "../../types";
import { copyColor } from "../../utils";

import ColorSpace from "../common/ColorSpace.vue";
import HueSlider from "../common/HueSlider.vue";
import AlphaSlider from "../common/AlphaSlider.vue";
import ColorInput from "../common/ColorInput.vue";

import Picker from "../common/icons/Picker.vue";
import Copy from "../common/icons/Copy.vue";
import Random from "../common/icons/Random.vue";
import Switch from "../common/icons/Switch.vue";
import Tooltip from "../common/Tooltip.vue";

const props = withDefaults(defineProps<ColorPickerProps>(), {
  initialColor: "hsl(0, 100%, 50%)",
});

const emits = defineEmits<ColorPickerEmits>();

const hue = ref(0);
const alpha = ref(1);
const colorMode = ref<ColorMode>(props.colorMode || "hex");
const modes: ColorMode[] = ["rgb", "hsl", "hex"];
const hslColor = ref(props.initialColor);

const isEyeDropperSupported = ref(false);
const showCopiedTooltip = ref(false);

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
  emits("set-color-mode", mode);
};

// Watch for external colorMode changes
watch(
  () => props.colorMode,
  (newMode) => {
    if (newMode && newMode !== colorMode.value) {
      colorMode.value = newMode;
    }
  },
  { immediate: true }
);

// Watch for colorMode changes and emit color in new format
watch(colorMode, () => {
  emits("set-color", extractColor());
});

function toggleMode() {
  const currentIndex = modes.indexOf(colorMode.value);
  const nextIndex = (currentIndex + 1) % modes.length;
  const newMode = modes[nextIndex];
  colorMode.value = newMode;
  emits("set-color-mode", newMode);
}

function extractColor() {
  let color = "";
  if (colorMode.value === "hsl") {
    color = tinycolor(hslColor.value).toHslString();
  } else if (colorMode.value === "rgb") {
    color = tinycolor(hslColor.value).toRgbString();
  } else if (colorMode.value === "hex") {
    if (alpha.value !== 1) {
      color = tinycolor(hslColor.value).toHex8String();
    } else {
      color = tinycolor(hslColor.value).toHexString();
    }
  }
  return color;
}

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
  <div class="color-picker__container border-primary">
    <h2 v-if="props.title" class="color-picker__title border-primary">
      {{ props.title }}
    </h2>

    <div class="color-picker-colors__container">
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

      <HueSlider :hue="hue" @set-hue="setHue" />
      <AlphaSlider :alpha="alpha" @set-alpha="setAlpha" />
    </div>

    <div class="color-picker-options__container border-primary">
      <button
        class="color-picker-options__toggle-btn color-picker-options__btn text-primary"
        @click="toggleMode"
      >
        {{ colorMode.toUpperCase() }}
        <Switch class="icon" />
      </button>

      <button
        v-if="isEyeDropperSupported"
        class="color-picker-options__btn text-primary hover-secondary"
        @click="pickWithEyeDropper"
      >
        <Picker class="icon" />
      </button>

      <button
        class="color-picker-options__btn text-primary hover-secondary"
        @click="pickRandomColor"
      >
        <Random class="icon" />
      </button>

      <Tooltip
        :text="colorMode.toUpperCase()"
        v-model="showCopiedTooltip"
        class="color-picker-options__tooltip"
      >
        <button
          class="color-picker-options__btn text-primary hover-secondary"
          @click="
            () => {
              showCopiedTooltip = copyColor(extractColor());
            }
          "
        >
          <Copy class="icon" />
        </button>
      </Tooltip>
    </div>
  </div>
</template>

<style scoped>
.color-picker__container {
  width: 300px;
  background-color: white;

  border: 2px solid;
  border-radius: 0.125rem;
}

.color-picker__title {
  padding: 0.25rem 1rem 0 1rem;
  border-bottom: 0.125rem solid;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.55;
}

.color-picker-colors__container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem 0.5rem;
}

.color-picker-colors__container:last-child {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.color-picker-options__container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-top: 0.125rem solid;
}

.color-picker-options__btn {
  padding: 0 0.5rem;
  height: 1.75rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.color-picker-options__btn:hover {
  background-color: var(--neutral-200);
}

.color-picker-options__toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-right: auto;
}

.color-picker-options__tooltip {
  height: 1.75rem;
}
</style>

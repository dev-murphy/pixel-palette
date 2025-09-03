<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import tinycolor from "tinycolor2";

import type { ColorMode, ColorMap } from "../../../types";

const props = defineProps<{ color: string; mode: ColorMode }>();
const emits = defineEmits<{ (e: "set-color", val: string): void }>();

const colorRef = ref<ColorMap[typeof props.mode]>();

function getColorCodes(color: string, mode: ColorMode) {
  const t = tinycolor(color);
  if (mode === "rgb") return t.toRgb();
  if (mode === "hsl") return t.toHsl();
}

// keep colorRef in sync with props
watch(
  () => [props.color, props.mode],
  ([color, mode]) => {
    colorRef.value = getColorCodes(color, mode as ColorMode);
  },
  { immediate: true }
);

const firstValue = computed<string>({
  get: () => {
    if (!colorRef.value) return "";

    if (props.mode === "rgb") {
      return (colorRef.value as ColorMap["rgb"]).r.toFixed(0);
    }

    if (props.mode === "hsl") {
      return (colorRef.value as ColorMap["hsl"]).h.toFixed(0);
    }

    return "";
  },
  set: (newValue: string) => {
    if (!colorRef.value) return;

    if (props.mode === "rgb") {
      (colorRef.value as ColorMap["rgb"]).r = Number(newValue);
    }

    if (props.mode === "hsl") {
      (colorRef.value as ColorMap["hsl"]).h = Number(newValue);
    }
    emitColorDebounced();
  },
});

const secondValue = computed<string>({
  get: () => {
    if (!colorRef.value) return "";

    if (props.mode === "rgb") {
      return Math.ceil((colorRef.value as ColorMap["rgb"]).g).toString();
    }

    if (props.mode === "hsl") {
      return Math.ceil((colorRef.value as ColorMap["hsl"]).s * 100).toString();
    }

    return "";
  },
  set: (newValue: string) => {
    if (!colorRef.value) return;

    if (props.mode === "rgb") {
      (colorRef.value as ColorMap["rgb"]).g = Number(newValue);
    }

    if (props.mode === "hsl") {
      (colorRef.value as ColorMap["hsl"]).s = Number(newValue) / 100;
    }
    emitColorDebounced();
  },
});

const thirdValue = computed<string>({
  get: () => {
    if (!colorRef.value) return "";

    if (props.mode === "rgb") {
      return Math.ceil((colorRef.value as ColorMap["rgb"]).b).toString();
    }

    if (props.mode === "hsl") {
      return Math.ceil((colorRef.value as ColorMap["hsl"]).l * 100).toString();
    }

    return "";
  },
  set: (newValue: string) => {
    if (!colorRef.value) return;

    if (props.mode === "rgb") {
      (colorRef.value as ColorMap["rgb"]).b = Number(newValue);
    }

    if (props.mode === "hsl") {
      (colorRef.value as ColorMap["hsl"]).l = Number(newValue) / 100;
    }
    emitColorDebounced();
  },
});

// sanitize numeric input and clamp
function sanitizeNumeric(raw: string, min: number, max: number): number {
  const numeric = raw.replace(/[^0-9.-]/g, "");
  const n = Number(numeric || "0");
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function emitColor() {
  if (!colorRef.value) return;

  if (props.mode === "rgb") {
    const { r, g, b } = colorRef.value as ColorMap["rgb"];
    const tc = tinycolor({ r, g, b });
    if (tc.isValid()) emits("set-color", tc.toHslString());
    return;
  }

  if (props.mode === "hsl") {
    const { h, s, l } = colorRef.value as ColorMap["hsl"];
    const tc = tinycolor({ h, s, l });
    if (tc.isValid()) emits("set-color", tc.toHslString());
    return;
  }
}

let debounceTimer: number | undefined;
function emitColorDebounced(delay = 250) {
  if (debounceTimer) window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(() => emitColor(), delay);
}

function handleBlur() {
  // flush debounced emit immediately on blur
  if (debounceTimer) {
    window.clearTimeout(debounceTimer);
    debounceTimer = undefined;
  }
  emitColor();
}

function handleInput(which: "first" | "second" | "third", event: Event) {
  const target = event.target as HTMLInputElement;
  if (props.mode === "rgb") {
    const min = 0;
    const max = 255;
    const sanitized = sanitizeNumeric(target.value, min, max).toString();
    if (sanitized !== target.value) target.value = sanitized;
    if (which === "first") firstValue.value = sanitized;
    if (which === "second") secondValue.value = sanitized;
    if (which === "third") thirdValue.value = sanitized;
    return;
  }

  // HSL: H 0-360, S/L 0-100 (percent inputs)
  if (which === "first") {
    const sanitized = sanitizeNumeric(target.value, 0, 360).toString();
    if (sanitized !== target.value) target.value = sanitized;
    firstValue.value = sanitized;
  } else {
    const sanitized = sanitizeNumeric(target.value, 0, 100).toString();
    if (sanitized !== target.value) target.value = sanitized;
    if (which === "second") secondValue.value = sanitized;
    if (which === "third") thirdValue.value = sanitized;
  }
}

function stepValue(which: "first" | "second" | "third", direction: 1 | -1) {
  if (props.mode === "rgb") {
    const min = 0;
    const max = 255;
    const step = 1;
    if (which === "first")
      firstValue.value = String(
        Math.max(
          min,
          Math.min(max, Number(firstValue.value || 0) + step * direction)
        )
      );
    if (which === "second")
      secondValue.value = String(
        Math.max(
          min,
          Math.min(max, Number(secondValue.value || 0) + step * direction)
        )
      );
    if (which === "third")
      thirdValue.value = String(
        Math.max(
          min,
          Math.min(max, Number(thirdValue.value || 0) + step * direction)
        )
      );
    return;
  }

  if (which === "first") {
    const min = 0,
      max = 360,
      step = 1;
    firstValue.value = String(
      Math.max(
        min,
        Math.min(max, Number(firstValue.value || 0) + step * direction)
      )
    );
  } else {
    const min = 0,
      max = 100,
      step = 1;
    if (which === "second")
      secondValue.value = String(
        Math.max(
          min,
          Math.min(max, Number(secondValue.value || 0) + step * direction)
        )
      );
    if (which === "third")
      thirdValue.value = String(
        Math.max(
          min,
          Math.min(max, Number(thirdValue.value || 0) + step * direction)
        )
      );
  }
}

function handleKeydown(
  which: "first" | "second" | "third",
  event: KeyboardEvent
) {
  if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
  event.preventDefault();
  stepValue(which, event.key === "ArrowUp" ? 1 : -1);
}
</script>

<template>
  <div class="flex divide-x-2 divide-neutral-900">
    <div class="flex w-1/3 items-center gap-x-2 py-2 px-2">
      <label for="first" class="text-neutral-900 font-bold select-none">{{
        mode === "rgb" ? "R" : mode === "hsl" ? "H" : "Hex"
      }}</label>
      <input
        type="text"
        name="first"
        v-model="firstValue"
        @input="(e) => handleInput('first', e)"
        @keydown="(e) => handleKeydown('first', e)"
        @blur="handleBlur"
        class="w-full text-center"
      />
    </div>

    <div class="w-1/3 flex items-center gap-2 px-2">
      <label for="second" class="text-neutral-900 font-bold select-none">{{
        mode === "rgb" ? "G" : "S"
      }}</label>
      <input
        type="text"
        name="second"
        v-model="secondValue"
        @input="(e) => handleInput('second', e)"
        @keydown="(e) => handleKeydown('second', e)"
        @blur="handleBlur"
        class="w-full text-center"
      />
    </div>

    <div class="w-1/3 flex items-center gap-2 px-2">
      <label for="third" class="text-neutral-900 font-bold select-none">{{
        mode === "rgb" ? "B" : "L"
      }}</label>
      <input
        type="text"
        name="third"
        v-model="thirdValue"
        @input="(e) => handleInput('third', e)"
        @keydown="(e) => handleKeydown('third', e)"
        @blur="handleBlur"
        class="w-full text-center"
      />
    </div>
  </div>
</template>

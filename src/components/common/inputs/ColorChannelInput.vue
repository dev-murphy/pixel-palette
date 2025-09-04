<script lang="ts" setup>
import { ref, watch } from "vue";
import tinycolor from "tinycolor2";

import type { ColorMode, ColorMap } from "../../../types";

const props = defineProps<{ color: string; mode: ColorMode }>();
const emits = defineEmits<{ (e: "set-color", val: string): void }>();

const firstValue = ref<string>("");
const secondValue = ref<string>("");
const thirdValue = ref<string>("");

function getColorCodes(color: string, mode: ColorMode) {
  const t = tinycolor(color);
  if (mode === "rgb") return t.toRgb();
  if (mode === "hsl") return t.toHsl();
}

function updateInputsFromProps() {
  const colorCodes = getColorCodes(props.color, props.mode);
  if (!colorCodes) return;

  if (props.mode === "rgb") {
    const { r, g, b } = colorCodes as ColorMap["rgb"];
    firstValue.value = Math.round(r).toString();
    secondValue.value = Math.round(g).toString();
    thirdValue.value = Math.round(b).toString();
  }

  if (props.mode === "hsl") {
    const { h, s, l } = colorCodes as ColorMap["hsl"];
    firstValue.value = Math.round(h).toString();
    secondValue.value = Math.round(s * 100).toString();
    thirdValue.value = Math.round(l * 100).toString();
  }
}

// Only sync from props when the color prop actually changes
// Don't sync when we're the ones emitting the change
let isInternalUpdate = false;
watch(
  () => [props.color, props.mode],
  () => {
    if (!isInternalUpdate) {
      updateInputsFromProps();
    }
    isInternalUpdate = false;
  },
  { immediate: true }
);

// sanitize numeric input and clamp
function sanitizeNumeric(raw: string, min: number, max: number): number {
  const numeric = raw.replace(/[^0-9.-]/g, "");
  const n = Number(numeric || "0");
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function emitColor() {
  const first = Number(firstValue.value || 0);
  const second = Number(secondValue.value || 0);
  const third = Number(thirdValue.value || 0);

  let tc;
  if (props.mode === "rgb") {
    tc = tinycolor({ r: first, g: second, b: third });
  } else if (props.mode === "hsl") {
    tc = tinycolor({ h: first, s: second / 100, l: third / 100 });
  }

  if (tc && tc.isValid()) {
    isInternalUpdate = true;
    emits("set-color", tc.toHslString());
  }
}

function handleBlur() {
  emitColor();
}

function handleInput(which: "first" | "second" | "third", event: Event) {
  const target = event.target as HTMLInputElement;
  const rawValue = target.value;

  if (props.mode === "rgb") {
    const min = 0;
    const max = 255;
    const sanitized = sanitizeNumeric(rawValue, min, max);

    // Update the appropriate ref directly
    if (which === "first") firstValue.value = sanitized.toString();
    if (which === "second") secondValue.value = sanitized.toString();
    if (which === "third") thirdValue.value = sanitized.toString();

    // Only update input value if it was actually sanitized
    if (sanitized.toString() !== rawValue) {
      target.value = sanitized.toString();
    }

    return;
  }

  // HSL: H 0-360, S/L 0-100 (percent inputs)
  if (which === "first") {
    const sanitized = sanitizeNumeric(rawValue, 0, 360);
    firstValue.value = sanitized.toString();
    if (sanitized.toString() !== rawValue) {
      target.value = sanitized.toString();
    }
  } else {
    const sanitized = sanitizeNumeric(rawValue, 0, 100);
    if (which === "second") secondValue.value = sanitized.toString();
    if (which === "third") thirdValue.value = sanitized.toString();
    if (sanitized.toString() !== rawValue) {
      target.value = sanitized.toString();
    }
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

  // Emit color change immediately for arrow key interactions
  emitColor();
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
    <div class="flex w-1/3 items-center gap-x-2 py-0.5">
      <label for="first" class="text-neutral-900 font-bold select-none">{{
        mode === "rgb" ? "R" : mode === "hsl" ? "H" : "Hex"
      }}</label>

      <input
        type="text"
        id="first"
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
        id="second"
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
        id="third"
        v-model="thirdValue"
        @input="(e) => handleInput('third', e)"
        @keydown="(e) => handleKeydown('third', e)"
        @blur="handleBlur"
        class="w-full text-center"
      />
    </div>
  </div>
</template>

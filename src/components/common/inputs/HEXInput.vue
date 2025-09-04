<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import tinycolor from "tinycolor2";

import type { ColorMap } from "../../../types";

const props = defineProps<{ color: string }>();
const emits = defineEmits<{ (e: "set-color", val: string): void }>();

const colorRef = ref<ColorMap["hex"]>();

function getColorCodes(color: string) {
  return { hex: tinycolor(color).toHex() };
}

watch(
  () => props.color,
  (color) => {
    colorRef.value = getColorCodes(color);
  },
  { immediate: true }
);

const firstValue = computed<string>({
  get: () => {
    if (!colorRef.value) return "";
    return colorRef.value.hex;
  },
  set: (newValue: string) => {
    if (!colorRef.value) return;
    colorRef.value.hex = newValue;
  },
});

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const raw = target.value || "";
  const sanitized = raw.replace(/[^0-9a-fA-F]/g, "").slice(0, 6);
  if (sanitized !== raw) {
    target.value = sanitized;
  }
  firstValue.value = sanitized;
}

function emitColor() {
  const value = firstValue.value || "";
  const tc = tinycolor(`#${value}`);
  if (tc.isValid()) {
    emits("set-color", tc.toHslString());
  }
}
</script>

<template>
  <div class="hex_input__wrapper">
    <label for="code">hex <span>#</span></label>
    <input
      type="text"
      id="code"
      v-model="firstValue"
      @input="handleInput"
      @blur="emitColor"
    />
  </div>
</template>

<style scoped>
.hex_input__wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.125rem 0;
}

.hex_input__wrapper label {
  flex-shrink: 0;
  font-weight: 700;
  text-transform: uppercase;
}

.hex_input__wrapper label span {
  color: #737373;
}

.hex_input__wrapper input {
  width: 100%;
  text-transform: uppercase;
}
</style>

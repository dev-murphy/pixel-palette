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
    emitColorDebounced();
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

let debounceTimer: number | undefined;
function emitColorDebounced(delay = 250) {
  if (debounceTimer) window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(() => {
    const value = firstValue.value || "";
    const tc = tinycolor(`#${value}`);
    if (tc.isValid()) {
      emits("set-color", tc.toHslString());
    }
  }, delay);
}
</script>

<template>
  <div class="flex divide-x-2 divide-neutral-200">
    <div class="flex items-center p-2">
      <label for="code" class="flex-shrink-0 font-bold uppercase"
        >hex <span class="text-neutral-500">#</span></label
      >
      <input
        type="text"
        name="code"
        v-model="firstValue"
        @input="handleInput"
        class="w-full uppercase"
      />
    </div>
  </div>
</template>

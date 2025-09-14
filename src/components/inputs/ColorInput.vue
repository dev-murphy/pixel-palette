<script lang="ts" setup>
import HEXInput from "./HEXInput.vue";
import RGBInputs from "./RGBInputs.vue";
import HSLInputs from "./HSLInputs.vue";
import Color from "../Color.vue";

import { useColors } from "../../composables/useColors";
import ColorSwatch from "../icons/ColorSwatch.vue";

defineProps<{ modelValue: boolean }>();
defineEmits<{ (e: "update:modelValue", val: boolean): void }>();

const { colorMode } = useColors();
</script>

<template>
  <div class="color-input">
    <div class="color-input-wrapper border-primary">
      <Color class="color-box" />

      <HEXInput v-if="colorMode === 'hex'" />
      <RGBInputs v-if="colorMode === 'rgb'" />
      <HSLInputs v-if="colorMode === 'hsl'" />
    </div>
    <button
      class="color-swatch-btn"
      :class="{ selected: modelValue }"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <ColorSwatch class="color-input-icon" />
    </button>
  </div>
</template>

<style scoped>
.color-input {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.color-input-wrapper {
  display: flex;
  border-width: 0.125rem;
  border-style: solid;
  border-radius: 0.5rem;
  overflow: hidden;
}

.color-box {
  width: 3.5rem;
  flex-shrink: 0;
  border-radius: 0.375rem;
}

.color-swatch-btn {
  width: 3rem;
  height: 38px;
  aspect-ratio: square;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
}

.color-swatch-btn:hover {
  background-color: #e5e5e5;
}

.color-swatch-btn.selected {
  background-color: #e5e5e5;
}

.color-input-icon {
  width: 1.25rem;
  height: 1.25rem;
}
</style>

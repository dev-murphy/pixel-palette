<script lang="ts" setup>
import HEXInput from "./inputs/HEXInput.vue";
import RGBInputs from "./inputs/RGBInputs.vue";
import HSLInputs from "./inputs/HSLInputs.vue";
import Color from "./Color.vue";

import { useColors } from "../composables/useColors";

const { colorMode } = useColors();
</script>

<template>
  <div class="color-input-wrapper border-primary">
    <Color class="color-box" />

    <HEXInput v-if="colorMode === 'hex'" />
    <RGBInputs v-if="colorMode === 'rgb'" />
    <HSLInputs v-if="colorMode === 'hsl'" />
  </div>
</template>

<style scoped>
.color-input-wrapper {
  display: flex;
  border-width: 0.125rem;
  border-style: solid;
  border-radius: 0.5rem;
  overflow: hidden;
}

.color-box {
  width: 3.5rem;
  height: 2.125rem;
  flex-shrink: 0;
  border-radius: 0.375rem;
}
</style>

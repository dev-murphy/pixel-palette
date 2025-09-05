<script lang="ts" setup>
import HEXInput from "./inputs/HEXInput.vue";
import RGBInput from "./inputs/ColorChannelInput.vue";
import Color from "../common/Color.vue";

import { useColors } from "../../composables/useColors";

const { colorMode } = useColors();
</script>

<template>
  <div class="color-input-wrapper">
    <Color class="color-box" />

    <HEXInput v-if="colorMode === 'hex'" />
    <RGBInput v-else />
  </div>
</template>

<style scoped>
.color-input-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* gap-x-2 */
  border: 2px solid #171717; /* border-neutral-900 */
  border-radius: 0.5rem; /* rounded-lg */
  overflow: hidden;
}

.color-box {
  width: 3rem; /* w-12 */
  height: 1.75rem; /* h-7 */
  flex-shrink: 0; /* flex-shrink-0 */
  border-radius: 0.375rem; /* rounded-md */
}
</style>

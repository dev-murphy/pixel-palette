<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
import { useColors } from "../composables/useColors";
import { copyColor } from "../utils";
import {
  generateColorHarmonies,
  type ColorHarmony,
} from "../utils/color-utils";

import Tooltip from "./Tooltip.vue";
import ArrowDown from "./icons/ArrowDown.vue";

const { exportColor, colorMode } = useColors();
const harmonies = ref<ColorHarmony>();

const isCopying = ref(false);
let timer: number | null = null;
const copyToClipboard = async (color: string) => {
  if (timer) window.clearTimeout(timer);

  isCopying.value = copyColor(color);
  timer = window.setTimeout(() => {
    isCopying.value = false;
  }, 500);
};

// Toggle Controls
const harmonyLabels: Array<keyof ColorHarmony> = [
  "monochromatic",
  "complementary",
  "analogous",
  "triadic",
];
const selectedHarmonyIndex = ref(0);
function moveTo(increment: number) {
  const n = harmonyLabels.length;
  selectedHarmonyIndex.value = (selectedHarmonyIndex.value + increment + n) % n;
}

const selectedHarmony = computed(
  () => harmonyLabels[selectedHarmonyIndex.value]
);

// watch color changes
watch([exportColor, colorMode], ([newColor, newMode]) => {
  harmonies.value = generateColorHarmonies(newColor, newMode);
});

onMounted(() => {
  harmonies.value = generateColorHarmonies(exportColor.value, colorMode.value);
});
</script>

<template>
  <div class="color-picker-container border-primary">
    <!-- Colors -->
    <div v-if="harmonies && harmonies[selectedHarmony]" class="swatch-row">
      <Tooltip
        v-for="(color, index) in harmonies[selectedHarmony]"
        :key="`${color}_${index}`"
        :text="`${isCopying ? 'Copied!' : color.toUpperCase()}`"
        class="color-compare-tooltip"
        on-hover
      >
        <div
          class="color-swatch"
          :style="{ backgroundColor: color }"
          @click="copyToClipboard(color)"
        ></div>
      </Tooltip>
    </div>

    <div class="compare-switch">
      <p>
        {{ harmonyLabels[selectedHarmonyIndex] }}
      </p>
      <button @click="moveTo(-1)" class="btn-hoverable">
        <ArrowDown class="prev" />
      </button>
      <button @click="moveTo(1)" class="btn-hoverable">
        <ArrowDown class="next" />
      </button>
    </div>
  </div>
</template>

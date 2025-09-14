<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
import { useColors } from "../composables/useColors";
import { copyColor } from "../utils";
import {
  generateColorHarmonies,
  type ColorHarmony,
} from "../utils/color-utils";

import Tooltip from "./Tooltip.vue";
import XSelect from "./inputs/XSelect.vue";

// composable
const { exportColor, colorMode } = useColors();

// data
const harmonies = ref<ColorHarmony>();

// harmony labels
const harmonyLabels: Record<string, string> = {
  mono: "Monochromatic",
  complementary: "Complementary",
  analogous: "Analogous",
  triadic: "Triadic",
};

const isCopying = ref(false);
let timer: number | null = null;
const copyToClipboard = async (color: string) => {
  if (timer) window.clearTimeout(timer);

  isCopying.value = copyColor(color);
  timer = window.setTimeout(() => {
    isCopying.value = false;
  }, 500);
};

const options = computed<{ label: string; value: keyof ColorHarmony | "" }[]>(
  () => {
    const keys = Object.keys(harmonyLabels);

    let options = keys.map((key) => {
      return {
        label: harmonyLabels[key],
        value: key as keyof ColorHarmony,
      };
    });

    return options;
  }
);
const selectedOption = ref(options.value[0]);
const selectedHarmony = computed(() => selectedOption.value.value);

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
    <div
      v-if="harmonies && selectedHarmony !== '' && harmonies[selectedHarmony]"
      class="swatch-row"
    >
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

    <!-- Dropdown -->
    <XSelect
      :options="options"
      v-model="selectedOption"
      class="color-comparison-select"
    />
  </div>
</template>

<style scoped>
.color-picker-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 0.75rem 0;
  font-family: system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  border-top-width: 2px;
  border-top-style: solid;
}

.color-comparison-select {
  padding: 0.5rem 0.5rem 0 0.5rem;
}

/* Dropdown */
.dropdown-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dropdown-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.dropdown {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  background-color: #fff;
  font-size: 0.9rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.dropdown:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  outline: none;
}

/* Swatches */
.swatch-row {
  display: flex;
  padding: 0 0.5rem;
  border-radius: 0.25rem;
}

.color-swatch {
  position: relative;
  height: 2rem;
  width: 100%;
  flex: 1;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.swatch-row > div:first-child .color-swatch {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}

.swatch-row > div:last-child .color-swatch {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.color-compare-tooltip {
  flex: 1;
}
</style>

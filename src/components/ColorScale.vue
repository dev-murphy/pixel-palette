<script lang="ts" setup>
import { onMounted, ref, watch, onUnmounted } from "vue";
import { copyColor } from "../utils";
import { useColors } from "../composables/useColors";
import { generateColorScale, getContrastColor } from "../utils/color-utils";

const { exportColor, colorMode } = useColors();

const colorRanges = ref<string[]>([]);
const colorCopied = ref("");
let timeoutId: ReturnType<typeof setTimeout> | null = null;

async function copy(color: string) {
  if (color === exportColor.value) return;
  try {
    await copyColor(color);
    colorCopied.value = color;

    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      colorCopied.value = "";
      timeoutId = null;
    }, 1200);
  } catch (err) {
    console.error("Failed to copy color:", err);
  }
}

watch([exportColor, colorMode], ([newColor, newMode]) => {
  const mode = newMode as "hex" | "hsl" | "rgb";
  colorRanges.value = generateColorScale(newColor, mode);
});

onMounted(() => {
  const mode = colorMode.value as "hex" | "hsl" | "rgb";
  colorRanges.value = generateColorScale(exportColor.value, mode);
});

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId);
});
</script>

<template>
  <div class="color__container">
    <div
      v-for="color in colorRanges"
      :key="color"
      tabindex="0"
      role="button"
      :aria-label="`Copy color ${color}`"
      class="color border-primary"
      :class="{
        current: color === exportColor,
        copied: color === colorCopied,
      }"
      :style="{ backgroundColor: color }"
      @click.stop="copy(color)"
      @keyup.enter="copy(color)"
    >
      <p :style="{ color: getContrastColor(color) }">
        <span v-if="colorCopied === color">Color Copied!</span>
        <span v-else>{{ color }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.color__container {
  display: flex;
  flex-direction: column;
  height: 275px;
}

.color {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.color.current {
  border-top-width: 2px;
  border-bottom-width: 2px;
  border-top-style: solid;
  border-bottom-style: solid;
}

.color p {
  text-transform: uppercase;
  font-size: 0.85rem;
  font-weight: 600;
  display: none;
  user-select: none;
}

.color:hover p,
.color.current p,
.color.copied p {
  display: inline-block;
}
</style>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useColors } from "../composables/useColors";
import { getContrastColor } from "../utils/color-utils";

const props = defineProps<{
  colors: string[];
}>();

const { exportColor, setColorFromString } = useColors();
const prevColor = ref<string | null>(null);

function selectColor(color: string) {
  if (exportColor.value === color) {
    if (prevColor.value) setColorFromString(prevColor.value);
  } else {
    setColorFromString(color);
  }
}

onMounted(() => {
  prevColor.value = exportColor.value;
});
</script>

<template>
  <div class="swatch-container">
    <button
      v-for="(color, index) in props.colors"
      :key="index"
      class="swatch"
      :class="{ selected: exportColor === color }"
      :style="{
        backgroundColor: color,
        '--glow-color': color,
        '--border-color': getContrastColor(color),
      }"
      @click="selectColor(color)"
    />
  </div>
</template>

<style scoped>
.swatch-container {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-width: 100%;
}

.swatch {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: none;
}

.swatch:hover {
  transform: scale(1.1);
}

.swatch.selected {
  border: 2px solid var(--border-color, black);
  box-shadow: 0 0 6px 0px var(--glow-color, rgba(0, 0, 0, 0.4));
}
</style>

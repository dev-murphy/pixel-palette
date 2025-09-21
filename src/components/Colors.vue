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
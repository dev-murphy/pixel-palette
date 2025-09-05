<script lang="ts" setup>
import { ref, useTemplateRef, onMounted, watch, computed, nextTick } from "vue";
import { useDraggable } from "../../composables/useDraggable";
import { useColors } from "../../composables/useColors";

const knob = useTemplateRef<HTMLElement>("space-knob");
const containerRef = useTemplateRef<HTMLElement>("container");

const elementSize = computed(() => {
  if (!knob.value) return 20;

  const rect = knob.value.getBoundingClientRect();
  const width = rect.width;
  return width || knob.value.offsetWidth || knob.value.clientWidth || 20;
});

const { startDrag, position, setPosition } = useDraggable(knob, {
  elementSize,
});

const finalSize = computed(() => {
  if (!containerRef.value)
    return {
      height: 0,
      width: 0,
    };

  const rect = containerRef.value;

  return {
    height: rect.offsetHeight - elementSize.value,
    width: rect.offsetWidth - elementSize.value,
  };
});

const { color, setColor } = useColors();

const getColorFromPosition = (x: number, y: number) => {
  const xPercentage = x / finalSize.value.width;
  const yPercentage = y / finalSize.value.height;

  const saturation = Math.round(xPercentage * 100);
  const value = Math.round(100 - yPercentage * 100);

  // Clamp values to valid ranges
  const clampedSaturation = Math.max(0, Math.min(100, saturation));
  const clampedValue = Math.max(0, Math.min(100, value));

  if (isReady.value) {
    setColor({ s: clampedSaturation / 100, v: clampedValue / 100 }); // Fixed: normalize to 0-1
  }
};

function setPositionFromSV(s: number, v: number) {
  const x = s * finalSize.value.width; // Fixed: removed /100 multiplication
  const y = (1 - v) * finalSize.value.height; // Fixed: use (1 - v) and removed /100
  setPosition({ x, y });
}

const isReady = ref(false);
const isInternalUpdate = ref(false);

onMounted(async () => {
  await nextTick(); // Ensure DOM is ready
  setPositionFromSV(color.value.s, color.value.v); // Fixed: use direct values
  isReady.value = true;
});

watch(
  () => position.value,
  ({ x, y }) => {
    if (!isInternalUpdate.value) {
      getColorFromPosition(x, y);
    }
  },
  { deep: true }
);

watch(
  () => [color.value.s, color.value.v],
  ([s, v]) => {
    if (!isReady.value || s === undefined || v === undefined) return;

    isInternalUpdate.value = true;
    setPositionFromSV(s, v); // Fixed: use direct values
    nextTick(() => {
      isInternalUpdate.value = false;
    });
  },
  { immediate: false } // Fixed: changed to false to avoid issues during setup
);
</script>

<template>
  <div ref="container" class="current-hue-gradient" @mousedown="startDrag">
    <div
      ref="space-knob"
      class="space-knob border-primary shadow-lg"
      :style="{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }"
    ></div>
  </div>
</template>

<style scoped>
.space-knob {
  width: 1.25rem;
  height: 1.25rem;

  position: absolute;
  top: 0;
  left: 0;
  background-color: white;

  border-radius: 999px;
  border-width: 0.125rem;
  border-style: solid;
  pointer-events: none;
}
</style>

<script lang="ts" setup>
import tinycolor from "tinycolor2";
import { ref, useTemplateRef, onMounted, watch, computed } from "vue";
import { useDraggable } from "../../composables/useDraggable";

const props = defineProps<{ hue: number; alpha: number; color?: string }>();
const emits = defineEmits<{ (e: "set-color", val: string): void }>();

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

const containerBounds = ref({
  width: 0,
  height: 0,
});

// Function to get HSL color based on knob position
const getColorFromPosition = (x: number, y: number) => {
  // Calculate lightness (0-100%) based on x position
  // Left edge = 0% lightness, right edge = 100% lightness
  const saturation = Math.round(
    (x / (containerBounds.value.width - elementSize.value)) * 100
  );

  // Calculate saturation (100% to 0%) based on y position
  // Top edge = 100% saturation, bottom edge = 0% saturation
  const value = Math.round(
    100 - (y / (containerBounds.value.height - elementSize.value)) * 100
  );

  // Clamp values to valid ranges
  const clampedSaturation = Math.max(0, Math.min(100, saturation));
  const clampedValue = Math.max(0, Math.min(100, value));

  const color = tinycolor({
    h: props.hue,
    s: clampedSaturation / 100,
    v: clampedValue / 100,
    a: props.alpha,
  }).toHslString();

  if (isReady.value) {
    emits("set-color", color);
  }
};

function setPositionFromHSV(_unusedHue: number, s: number, v: number) {
  const x = (s / 100) * (containerBounds.value.width - elementSize.value);
  const y =
    ((100 - v) / 100) * (containerBounds.value.height - elementSize.value);
  setPosition({ x, y });
}

const isReady = ref(false);

onMounted(() => {
  if (!containerRef.value) return;

  containerBounds.value.width = containerRef.value.offsetWidth;
  containerBounds.value.height = containerRef.value.offsetHeight;

  // If an external color is provided, the watcher below will set the position.
  // Only set a default position if no valid color prop was passed.
  const hasExternalColor = !!props.color && tinycolor(props.color).isValid();
  if (!hasExternalColor) {
    const posX = containerRef.value.clientWidth;
    setPosition({ x: posX });
    getColorFromPosition(posX, 0);
  } else {
    // Apply initial color now that bounds are available
    const t = tinycolor(props.color as string);
    const { h, s, v } = t.toHsv();
    setPositionFromHSV(h, s * 100, v * 100);
  }
  // mark ready after initial positioning
  isReady.value = true;
});

watch(
  () => [position, props],
  () => {
    getColorFromPosition(position.value.x, position.value.y);
  },
  { deep: true }
);

// respond to external color changes
watch(
  () => props.color,
  (newColor) => {
    if (!newColor) return;
    const t = tinycolor(newColor);
    if (!t.isValid()) return;
    const { h, s, v } = t.toHsv();
    setPositionFromHSV(h, s * 100, v * 100);
  },
  { immediate: true }
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
  border: 0.125rem solid;
  pointer-events: none;
}
</style>

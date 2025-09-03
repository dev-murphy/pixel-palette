<script lang="ts" setup>
import tinycolor from "tinycolor2";
import { ref, useTemplateRef, onMounted, watch } from "vue";
import { useDraggable } from "../../composables/useDraggable";

const props = defineProps<{ hue: number; alpha: number; color?: string }>();
const emits = defineEmits<{ (e: "set-color", val: string): void }>();

const sliderRef = useTemplateRef<HTMLElement>("space-knob");
const containerRef = useTemplateRef<HTMLElement>("container");

const knobSize = 20;
const { isDragging, startDrag, position, setPosition } = useDraggable(
  sliderRef,
  {
    elementSize: knobSize,
  }
);

const containerBounds = ref({
  width: 0,
  height: 0,
});

// Function to get HSL color based on knob position
const getColorFromPosition = (x: number, y: number) => {
  // Calculate lightness (0-100%) based on x position
  // Left edge = 0% lightness, right edge = 100% lightness
  const saturation = Math.round(
    (x / (containerBounds.value.width - knobSize)) * 100
  );

  // Calculate saturation (100% to 0%) based on y position
  // Top edge = 100% saturation, bottom edge = 0% saturation
  const value = Math.round(
    100 - (y / (containerBounds.value.height - knobSize)) * 100
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
  const x = (s / 100) * (containerBounds.value.width - knobSize);
  const y = ((100 - v) / 100) * (containerBounds.value.height - knobSize);
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
  <div
    ref="container"
    class="current-hue-gradient relative w-full aspect-video rounded-lg overflow-hidden cursor-crosshair"
    @mousedown="startDrag"
  >
    <div
      ref="space-knob"
      class="absolute w-5 h-5 border-2 border-neutral-900 rounded-full bg-white shadow-lg pointer-events-none"
      :class="{ 'cursor-grabbing': isDragging }"
      :style="{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }"
    ></div>
  </div>
</template>

<style scoped>
.current-hue-gradient {
  background: linear-gradient(
    to right,
    transparent,
    hsl(var(--hue), 100%, 50%)
  );
}

.current-hue-gradient::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent, black);
}
</style>

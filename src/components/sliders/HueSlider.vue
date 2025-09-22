<script lang="ts" setup>
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { useDraggable } from "../../composables/useDraggable";
import { useColors } from "../../composables/useColors";

// knob element
const knob = ref<HTMLElement | null>(null);

// size of knob
const elementSize = computed(() => {
  if (!knob.value) return 20;
  const rect = knob.value.getBoundingClientRect();
  return rect.width || knob.value.offsetWidth || knob.value.clientWidth || 20;
});

// offset for centering knob
const offset = computed(() => elementSize.value / 2);

// usable width of slider track
const finalWidth = computed(() => {
  if (!knob.value?.parentElement) return 0;
  return knob.value.parentElement.getBoundingClientRect().width - offset.value;
});

// colors composable
const { hue, setHue } = useColors();

// draggable composable
const { startDrag, position, setPosition, isDragging } = useDraggable(knob, {
  elementSize,
  offset,
});

/**
 * Handle both mouse and touch events
 */
const handlePointerStart = (event: MouseEvent | TouchEvent) => {
  startDrag(event);
};

// sync hue -> position and emit
function updatePositionFromHue(newHue: number) {
  if (!knob.value?.parentElement || finalWidth.value <= 0) return;
  const x = (newHue / 360) * finalWidth.value;
  setPosition({ x });
}

watch(
  () => position.value.x,
  (x) => {
    if (isDragging.value && finalWidth.value > 0) {
      const percentage = x / finalWidth.value;
      setHue(Math.round(percentage * 360));
    }
  }
);

watch(
  () => hue.value,
  (newHue) => {
    document.body.style.setProperty("--hue", newHue.toString());
    if (!isDragging.value) {
      updatePositionFromHue(newHue);
    }
  },
  { immediate: true }
);

onMounted(async () => {
  await nextTick();
  updatePositionFromHue(hue.value);
});
</script>

<template>
  <div class="slider__container">
    <div
      class="hue-slider"
      @mousedown="handlePointerStart"
      @touchstart="handlePointerStart"
    >
      <div
        ref="knob"
        class="hue-slider-knob current-hue border-primary"
        data-pw="cp-hue-knob"
        :style="{ left: `${position.x}px` }"
      ></div>
    </div>
  </div>
</template>

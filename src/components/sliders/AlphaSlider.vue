<script lang="ts" setup>
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { useDraggable } from "../../composables/useDraggable";
import { useColors } from "../../composables/useColors";

const knob = ref<HTMLElement | null>(null);

const elementSize = computed(() => {
  const el = knob.value;
  if (!el) return 20;
  const rect = el.getBoundingClientRect();
  return rect.width || el.offsetWidth || el.clientWidth || 20;
});

const offset = computed(() => elementSize.value / 2);

const finalWidth = computed(() => {
  const el = knob.value?.parentElement;
  if (!el) return 0;
  return el.getBoundingClientRect().width - offset.value;
});

const { startDrag, position, setPosition, isDragging } = useDraggable(knob, {
  elementSize,
  offset,
});

const { alpha, setAlpha } = useColors();

const updatePositionFromAlpha = (newAlpha: number) => {
  if (!knob.value?.parentElement || finalWidth.value <= 0) return;
  const x = Math.max(0, Math.min(1, newAlpha)) * finalWidth.value;
  setPosition({ x });
};

const handlePointerStart = (event: MouseEvent | TouchEvent) => {
  startDrag(event);
};

watch(
  () => alpha.value,
  (newAlpha) => {
    if (!isDragging.value) {
      updatePositionFromAlpha(newAlpha);
    }
  },
  { immediate: true }
);

watch(
  () => position.value.x,
  (x) => {
    if (isDragging.value && finalWidth.value > 0) {
      setAlpha(x / finalWidth.value);
    }
  }
);

onMounted(async () => {
  await nextTick();
  updatePositionFromAlpha(alpha.value);
});
</script>

<template>
  <div class="slider__container border-primary">
    <div
      class="checker"
      @mousedown="handlePointerStart"
      @touchstart="handlePointerStart"
    >
      <div
        ref="knob"
        class="hue-slider-knob current-hue border-primary"
        :style="{ left: `${position.x}px` }"
      ></div>
    </div>
  </div>
</template>

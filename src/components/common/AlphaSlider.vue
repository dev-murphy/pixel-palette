<script lang="ts" setup>
import { useTemplateRef, computed, watch, onMounted } from "vue";
import { useDraggable } from "../../composables/useDraggable";

const props = defineProps<{ alpha?: number }>();
const emits = defineEmits<{ (e: "set-alpha", val: number): void }>();

const knob = useTemplateRef<HTMLElement>("knob");

const elementSize = computed(() => {
  if (!knob.value) return 20;

  const rect = knob.value.getBoundingClientRect();
  const width = rect.width;
  return width || knob.value.offsetWidth || knob.value.clientWidth || 20;
});

const offset = computed(() => {
  const size = elementSize.value;
  return size / 2;
});

const initialPosition = computed(() => {
  if (!knob.value || !knob.value.parentElement) {
    return { width: 0 };
  }
  return knob.value?.parentElement.getBoundingClientRect();
});

const { startDrag, position, setPosition } = useDraggable(knob, {
  elementSize,
  offset,
});

const currentAlpha = computed(() => {
  if (!knob.value || !knob.value.parentElement) return 0;

  const bounds = knob.value.parentElement.getBoundingClientRect();
  return position.value.x / (bounds.width - offset.value);
});

watch(
  currentAlpha,
  (value) => {
    emits("set-alpha", value);
  },
  { immediate: false }
);

onMounted(() => {
  const boundsWidth = initialPosition.value.width || 0;
  const initial = (props.alpha ?? 1) * Math.max(0, boundsWidth - offset.value);
  setPosition({ x: initial });
});

watch(
  () => props.alpha,
  (newAlpha) => {
    if (!knob.value || !knob.value.parentElement) return;
    const bounds = knob.value.parentElement.getBoundingClientRect();
    const x =
      Math.max(0, Math.min(1, newAlpha ?? 0)) * (bounds.width - offset.value);
    setPosition({ x });
  },
  { immediate: true }
);
</script>

<template>
  <div class="slider__container border-primary">
    <div class="checker" @mousedown="startDrag">
      <div
        ref="knob"
        class="hue-slider-knob current-hue border-primary"
        :style="{
          left: `${position.x}px`,
        }"
      ></div>
    </div>
  </div>
</template>

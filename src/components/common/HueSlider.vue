<script lang="ts" setup>
import { useTemplateRef, computed, watch, onMounted } from "vue";
import { useDraggable } from "../../composables/useDraggable";

const props = defineProps<{ hue?: number }>();
const emits = defineEmits<{ (e: "set-hue", val: number): void }>();
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

const currentHue = computed(() => {
  if (!knob.value || !knob.value.parentElement) return 0;

  const bounds = knob.value.parentElement.getBoundingClientRect();
  return Math.round((position.value.x / (bounds.width - offset.value)) * 360);
});

const { startDrag, position, setPosition } = useDraggable(knob, {
  elementSize,
  offset,
});

watch(currentHue, (colorValue) => {
  emits("set-hue", colorValue);
  document.body.style.setProperty("--hue", colorValue.toString());
});

watch(
  () => props.hue,
  (newHue) => {
    if (newHue === undefined || !knob.value || !knob.value.parentElement)
      return;
    const bounds = knob.value.parentElement.getBoundingClientRect();
    const x = (newHue / 360) * (bounds.width - offset.value);
    setPosition({ x });
  },
  { immediate: true }
);

onMounted(() => {
  if (props.hue === undefined || !knob.value || !knob.value.parentElement)
    return;
  const bounds = knob.value.parentElement.getBoundingClientRect();
  const x = (props.hue / 360) * (bounds.width - offset.value);
  setPosition({ x });
});
</script>

<template>
  <div class="slider__container border-primary">
    <div class="hue-slider" @mousedown="startDrag">
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

<script lang="ts" setup>
import { useTemplateRef, computed, watch, onMounted } from "vue";
import { useDraggable } from "../../composables/useDraggable";

const props = defineProps<{ hue?: number }>();
const emits = defineEmits<{ (e: "set-hue", val: number): void }>();
const knob = useTemplateRef<HTMLElement>("knob");
const offset = 8;

const elementSize = computed(() => {
  return knob.value?.getBoundingClientRect().width || 20;
});

const { startDrag, position, setPosition } = useDraggable(knob, {
  elementSize: elementSize.value,
  offset,
});

const currentHue = computed(() => {
  if (!knob.value || !knob.value.parentElement) return 0;

  const bounds = knob.value.parentElement.getBoundingClientRect();
  return Math.round((position.value.x / (bounds.width - offset)) * 360);
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
    const x = (newHue / 360) * (bounds.width - offset);
    setPosition({ x });
  },
  { immediate: true }
);

onMounted(() => {
  if (props.hue === undefined || !knob.value || !knob.value.parentElement)
    return;
  const bounds = knob.value.parentElement.getBoundingClientRect();
  const x = (props.hue / 360) * (bounds.width - offset);
  setPosition({ x });
});
</script>

<template>
  <div class="relative w-full h-10 border-2 border-neutral-900 p-1 rounded-lg">
    <div class="hue-slider w-full h-full rounded" @mousedown="startDrag">
      <div
        ref="knob"
        class="hue-slider-knob current-hue absolute w-4 h-[125%] top-1/2 left-0 -translate-y-1/2 -transalte-x-1/2 border-2 border-neutral-900 rounded-full"
        :style="{
          left: `${position.x}px`,
        }"
      ></div>
    </div>
  </div>
</template>


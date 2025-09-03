<script lang="ts" setup>
import { useTemplateRef, computed, watch, onMounted } from "vue";
import { useDraggable } from "../../composables/useDraggable";

const props = defineProps<{ alpha?: number }>();
const emits = defineEmits<{ (e: "set-alpha", val: number): void }>();

const knob = useTemplateRef<HTMLElement>("knob");
const offset = 8;

const elementSize = computed(() => {
  return knob.value?.getBoundingClientRect().width || 20; // fallback to 20
});

const initialPosition = computed(() => {
  if (!knob.value || !knob.value.parentElement) {
    return { width: 0 };
  }
  return knob.value?.parentElement.getBoundingClientRect();
});

const { startDrag, position, setPosition } = useDraggable(knob, {
  elementSize: elementSize.value,
  offset,
});

const currentAlpha = computed(() => {
  if (!knob.value || !knob.value.parentElement) return 0;

  const bounds = knob.value.parentElement.getBoundingClientRect();
  return position.value.x / (bounds.width - offset);
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
  const initial = (props.alpha ?? 1) * Math.max(0, boundsWidth - offset);
  setPosition({ x: initial });
});

watch(
  () => props.alpha,
  (newAlpha) => {
    if (!knob.value || !knob.value.parentElement) return;
    const bounds = knob.value.parentElement.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, newAlpha ?? 0)) * (bounds.width - offset);
    setPosition({ x });
  },
  { immediate: true }
);
</script>

<template>
  <div class="relative w-full h-10 border-2 border-neutral-900 p-1 rounded-lg">
    <div class="checker w-full h-full rounded" @mousedown="startDrag">
      <div
        ref="knob"
        class="hue-slider-knob current-hue absolute w-4 h-[125%] top-1/2 left-full -translate-y-1/2 -transalte-x-1/2 border-2 border-neutral-900 rounded-full"
        :style="{
          left: `${position.x}px`,
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.current-hue {
  background-color: hsl(var(--hue), 100%, 50%);
}

.checker::before {
  position: absolute;
  content: "";
  inset: 4px;
  border-radius: 5px;
  background: linear-gradient(
    to right,
    transparent,
    hsl(var(--hue), 100%, 50%)
  );
}

.checker {
  --size: 20px; /* tile size */
  --c1: #f2f2f2; /* light color */
  --c2: #cccccc; /* dark color */

  background: conic-gradient(
      from 90deg,
      var(--c1) 25%,
      var(--c2) 0 50%,
      var(--c1) 0 75%,
      var(--c2) 0
    )
    0 0 / var(--size) var(--size);
}
.hue-slider-knob::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  border: 3px solid white;
  border-radius: 99px;
}
</style>

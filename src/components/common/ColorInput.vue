<script lang="ts" setup>
import type { ColorMode } from "../../types";
import HEXInput from "./inputs/HEXInput.vue";
import RGBInput from "./inputs/ColorChannelInput.vue";

const props = defineProps<{ color: string; mode: ColorMode }>();
const emits = defineEmits<{
  (e: "set-color-mode", val: ColorMode): void;
  (e: "set-color", val: string): void;
}>();
</script>

<template>
  <div class="flex items-center gap-x-2 border-2 border-neutral-900 rounded-lg">
    <div
      class="w-12 h-7 flex-shrink-0 ml-1.5 rounded-md"
      :style="{
        background: props.color,
      }"
    ></div>
    <HEXInput
      v-if="props.mode === 'hex'"
      :color="props.color"
      @set-color="(val) => emits('set-color', val)"
    />

    <RGBInput
      v-else
      :color="props.color"
      :mode="props.mode"
      @set-color="(val) => emits('set-color', val)"
    />
  </div>
</template>

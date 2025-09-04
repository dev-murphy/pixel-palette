<script lang="ts" setup>
import { watch } from "vue";

const props = defineProps<{ text: string; modelValue: boolean }>();
const emits = defineEmits<{ (e: "update:modelValue", val: boolean): void }>();

let copiedTooltipTimer: number | undefined;

watch(
  () => props.modelValue,
  () => {
    if (copiedTooltipTimer) window.clearTimeout(copiedTooltipTimer);
    copiedTooltipTimer = window.setTimeout(() => {
      emits("update:modelValue", false);
    }, 1200);
  }
);
</script>

<template>
  <div class="relative">
    <slot></slot>
    <transition name="fade">
      <div
        v-if="modelValue"
        class="absolute left-1/2 -translate-x-1/2 -top-[120%] whitespace-nowrap text-sm bg-neutral-900 text-white font-bold px-2 py-1 rounded shadow"
      >
        {{ text }} Copied!
      </div>
    </transition>
  </div>
</template>

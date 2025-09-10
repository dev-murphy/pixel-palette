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
  <div class="tooltip__container">
    <slot></slot>

    <transition name="fade">
      <div v-if="modelValue" class="tooltip__text">{{ text }} Copied!</div>
    </transition>
  </div>
</template>

<style scoped>
.tooltip__container {
  position: relative;
  cursor: pointer;
}

.tooltip__text {
  position: absolute;
  top: -120%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--neutral-900);
  color: white;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  font-size: 0.875rem;
}
</style>

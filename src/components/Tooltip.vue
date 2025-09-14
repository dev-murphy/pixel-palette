<script lang="ts" setup>
import { ref } from "vue";

type Position = "bottom" | "top";

const props = withDefaults(
  defineProps<{
    text: string;
    onHover?: boolean;
    position?: Position;
  }>(),
  {
    position: "top",
    onHover: false,
  }
);

const isTooltipOpen = ref(false);
let tooltipTimer: number | undefined;

function showTooltip() {
  isTooltipOpen.value = true;
  if (tooltipTimer) clearTimeout(tooltipTimer);

  if (!props.onHover) {
    tooltipTimer = window.setTimeout(() => {
      isTooltipOpen.value = false;
    }, 1200);
  }
}

function hideTooltip() {
  if (props.onHover) {
    isTooltipOpen.value = false;
  }
}
</script>

<template>
  <div
    class="tooltip__container"
    @mouseenter="onHover && showTooltip()"
    @mouseleave="onHover && hideTooltip()"
    @click.stop="!onHover && showTooltip()"
  >
    <!-- Trigger element -->
    <slot></slot>

    <!-- Tooltip -->
    <div v-if="isTooltipOpen" class="tooltip__text" :class="[position]">
      {{ text }}
    </div>
  </div>
</template>

<style scoped>
.tooltip__container {
  position: relative;
  cursor: pointer;
}

.tooltip__text {
  position: absolute;
  transform: translateX(-50%);
  background-color: var(--neutral-900, #111);
  color: #fff;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  font-size: 0.75rem;
  z-index: 50;
}

.tooltip__text.bottom {
  top: 110%;
  left: 50%;
}

.tooltip__text.top {
  bottom: 110%;
  left: 50%;
}
</style>

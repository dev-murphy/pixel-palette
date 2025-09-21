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
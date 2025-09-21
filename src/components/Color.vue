<script lang="ts" setup>
import { useColors } from "../composables/useColors";

const { exportColor } = useColors();
</script>

<template>
  <div class="checkered">
    <div
      class="color"
      :style="{
        background: exportColor,
      }"
    ></div>
  </div>
</template>

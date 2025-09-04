<script lang="ts" setup>
defineProps<{ color: string }>();
</script>

<template>
  <div class="checkered">
    <div
      class="color"
      :style="{
        background: color,
      }"
    ></div>
  </div>
</template>

<style scoped>
.color {
  width: 100%;
  height: 100%;
}
</style>

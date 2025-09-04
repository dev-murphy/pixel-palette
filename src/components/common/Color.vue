<script lang="ts" setup>
defineProps<{ color: string }>();
</script>

<template>
  <div class="checkered">
    <div
      class="w-full h-full"
      :style="{
        background: color,
      }"
    ></div>
  </div>
</template>

<template>
  <div class="app">
    <h1>Pixel Palette Test</h1>
    <div class="test-container">
      <ColorPicker
        title="Test Color Picker"
        :initialColor="'hsl(210, 100%, 50%)'"
        @set-color="handleColorChange"
      />
      <div class="color-display">
        <h3>Selected Color:</h3>
        <div
          class="color-preview"
          :style="{ backgroundColor: currentColor }"
        ></div>
        <p>{{ currentColor }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ColorPicker } from "pixel-palette";
import "pixel-palette/style";

const currentColor = ref("hsl(210, 100%, 50%)");

function handleColorChange(color) {
  console.log("Color changed:", color);
  currentColor.value = color;
}
</script>

<style>
.app {
  padding: 2rem;
  font-family: system-ui, sans-serif;
}

.test-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.color-display {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.color-preview {
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  margin: 1rem 0;
}
</style>

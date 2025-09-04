<script lang="ts" setup>
import { ref, useTemplateRef } from "vue";
import type { ColorMode, ColorPickerEmits, ColorPickerProps } from "../types";
import { copyColor } from "../utils";
import { useClickOutside } from "../composables/useClickOutside";

import Picker from "./common/Picker.vue";
import Color from "./common/Color.vue";
import Tooltip from "./common/Tooltip.vue";
import Copy from "./common/icons/Copy.vue";

const props = withDefaults(defineProps<ColorPickerProps>(), {
  initialColor: "#ff0000",
  colorMode: "hex",
  showAlpha: true,
});

const emits = defineEmits<ColorPickerEmits>();

const showCopiedTooltip = ref(false);

const currentColor = ref(props.initialColor);
const showColor = (color: string) => {
  currentColor.value = color;
  emits("set-color", color);
};

const currentColorMode = ref(props.colorMode);
const setColorMode = (mode: ColorMode) => {
  currentColorMode.value = mode;
  emits("set-color-mode", mode);
};

const isPickerOpen = ref(false);
const togglePicker = () => {
  isPickerOpen.value = !isPickerOpen.value;
};

const colorPicker = useTemplateRef<HTMLElement>("colorPicker");
useClickOutside(colorPicker, () => {
  isPickerOpen.value = false;
});
</script>

<template>
  <div ref="colorPicker" class="color-picker">
    <button class="color-btn" @click="togglePicker">
      <Color class="color-icon" :color="currentColor" />

      <div class="color-info">
        <p class="color-text">{{ currentColor }}</p>
        <Tooltip
          :text="currentColorMode.toUpperCase()"
          v-model="showCopiedTooltip"
        >
          <div
            @click.stop="
              () => {
                showCopiedTooltip = copyColor(currentColor);
              }
            "
          >
            <Copy class="icon" />
          </div>
        </Tooltip>
      </div>
    </button>

    <Picker
      v-if="isPickerOpen"
      :title="title"
      :initial-color="currentColor"
      :show-alpha
      :color-mode="currentColorMode"
      class="picker-popup"
      @set-color="showColor"
      @set-color-mode="setColorMode"
    />
  </div>
</template>

<style scoped>
.color-picker {
  position: relative;
}

.color-btn {
  min-width: 300px;
  display: flex;
  align-items: center;
  gap: 0.5rem; /* same as gap-2 */
  border: 2px solid #171717; /* neutral-900 */
}

.color-icon {
  width: 2.25rem; /* w-9 */
  height: 2.25rem; /* h-9 */
}

.color-info {
  display: flex;
  flex-grow: 1;
  align-items: center;
  gap: 0.5rem; /* gap-x-2 */
  padding-right: 0.25rem; /* pr-1 */
}

.color-text {
  margin-left: auto;
  margin-right: auto;
  font-size: 0.875rem; /* text-sm */
  text-transform: uppercase;
}

.picker-popup {
  position: absolute;
  top: 100%; /* top-full */
  right: 0;
  transform: translateY(0.5rem); /* translate-y-2 */
  z-index: 10;
}
</style>

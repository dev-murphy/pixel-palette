<script lang="ts" setup>
import { onMounted, ref, useTemplateRef, watch } from "vue";
import { copyColor } from "../utils";
import { useClickOutside } from "../composables/useClickOutside";

import Picker from "../components/Picker.vue";
import Color from "../components/Color.vue";
import Tooltip from "../components/Tooltip.vue";
import Copy from "../components/icons/Copy.vue";
import { useColors } from "../composables/useColors";

const props = withDefaults(
  defineProps<{
    title?: string;
    initialColor?: string;
    colorMode?: "hex" | "rgb" | "hsl";
    showAlpha?: boolean;
  }>(),
  {
    initialColor: "#ff0000",
    colorMode: "hex",
    showAlpha: true,
  }
);

const { exportColor, colorMode, setColorFromString } = useColors();
const emits = defineEmits<{ (e: "set-color", color: string): void }>();

const showCopiedTooltip = ref(false);

const isPickerOpen = ref(false);
const togglePicker = () => {
  isPickerOpen.value = !isPickerOpen.value;
};

const colorPicker = useTemplateRef<HTMLElement>("colorPicker");
useClickOutside(colorPicker, () => {
  isPickerOpen.value = false;
});

watch(
  () => exportColor.value,
  (newColor) => {
    emits("set-color", newColor);
  }
);

onMounted(() => {
  setColorFromString(props.initialColor);
  colorMode.value = props.colorMode;
});
</script>

<template>
  <div ref="colorPicker" class="color-picker">
    <button class="color-btn" @click="togglePicker">
      <Color class="color-icon" />

      <div class="color-info">
        <p class="color-text">{{ exportColor }}</p>
        <Tooltip :text="colorMode.toUpperCase()" v-model="showCopiedTooltip">
          <div
            class="picker-copy-btn"
            @click.stop="
              () => {
                showCopiedTooltip = copyColor(exportColor);
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
      :show-alpha
      class="picker-popup"
    />
  </div>
</template>

<style scoped>
.color-picker {
  position: relative;
  width: fit-content;
}

.color-btn {
  min-width: 300px;
  display: flex;
  align-items: center;
  gap: 0.5rem; /* same as gap-2 */
  border-width: 0.125rem;
  border-style: solid;
  border-color: #171717;
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
  transform: translateY(0.5rem); /* translate-y-2 */
  z-index: 10;
}

.picker-copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

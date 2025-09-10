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
  <div ref="colorPicker" class="pixel-palette color-picker">
    <button class="color-btn" @click="togglePicker">
      <Color class="color-icon" />
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
    </button>

    <Transition name="fade">
      <Picker
        v-if="isPickerOpen"
        :title="title"
        :show-alpha
        class="picker-popup"
      />
    </Transition>
  </div>
</template>

<style scoped>
.color-picker {
  position: relative;
  width: fit-content;
}

.color-btn {
  width: 320px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  padding: 0.375rem;

  border-width: 0.125rem;
  border-style: solid;
  border-color: #171717;
  border-radius: 0.625rem;
}

.color-icon {
  width: 2.5rem;
  height: 2rem;

  border-radius: 0.25rem;
  overflow: hidden;
}

.color-info {
  background-color: white;

  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 0.5rem;

  padding-right: 0.25rem;
}

.color-text {
  width: 90%;
  margin-left: auto;
  margin-right: auto;

  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;

  user-select: none;
}

.picker-popup {
  position: absolute;
  top: 100%;
  transform: translateY(0.5rem);
  z-index: 10;
}

.picker-copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.25rem;
  height: 1.75rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.picker-copy-btn:hover {
  background-color: #cccccc;
}
</style>

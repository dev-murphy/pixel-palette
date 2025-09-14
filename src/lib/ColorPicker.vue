<script lang="ts" setup>
import {
  onMounted,
  onUnmounted,
  ref,
  useTemplateRef,
  watch,
  nextTick,
} from "vue";
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
    initialColorMode?: "hex" | "rgb" | "hsl";
    enableAlpha?: boolean;
    openAlphaByDefault: boolean;
    colorSwatch?: string[];
  }>(),
  {
    initialColor: "#ff0000",
    initialColorMode: "hex",
    enableAlpha: true,
    openAlphaByDefault: false,
  }
);
const emits = defineEmits<{ (e: "set-color", color: string): void }>();

const { exportColor, colorMode, setColorFromString } = useColors();
const showCopiedTooltip = ref(false);

const isPickerOpen = ref(false);
function togglePicker() {
  isPickerOpen.value = !isPickerOpen.value;
}

const popupRef = useTemplateRef<HTMLElement>("popupRef");
const triggerRef = useTemplateRef<HTMLElement>("triggerRef");
const positionTop = ref(false);

function calculatePosition() {
  if (!popupRef.value || !triggerRef.value) return;

  const triggerRect = triggerRef.value.getBoundingClientRect();
  const popupRect = popupRef.value.getBoundingClientRect();
  const viewpointHeight = window.innerHeight;

  const spaceBelow = viewpointHeight - triggerRect.bottom;
  const popHeight = popupRect.height || 250;

  positionTop.value = spaceBelow < popHeight + 10;
}

const colorPicker = useTemplateRef<HTMLElement>("colorPicker");
useClickOutside(colorPicker, () => {
  isPickerOpen.value = false;
});

watch(isPickerOpen, () => {
  nextTick(() => {
    calculatePosition();
  });
});

watch(
  () => exportColor.value,
  (newColor) => {
    emits("set-color", newColor);
  }
);

watch(
  () => props.initialColorMode,
  (newColorMode) => {
    colorMode.value = newColorMode;
  }
);

onMounted(() => {
  setColorFromString(props.initialColor);
  colorMode.value = props.initialColorMode;
  window.addEventListener("scroll", calculatePosition);
});

onUnmounted(() => {
  window.removeEventListener("scroll", calculatePosition);
});
</script>

<template>
  <div ref="colorPicker" class="pixel-palette color-picker">
    <button ref="triggerRef" class="color-btn" @click="togglePicker">
      <Color class="color-icon" />
      <p class="color-text">{{ exportColor }}</p>
      <Tooltip :text="`${colorMode.toUpperCase()} Copied!`" position="top">
        <div
          class="picker-copy-btn"
          @click="
            () => {
              showCopiedTooltip = copyColor(exportColor);
            }
          "
        >
          <Copy class="icon" />
        </div>
      </Tooltip>
    </button>

    <div
      v-if="isPickerOpen"
      ref="popupRef"
      class="picker-popup"
      :class="{
        top: positionTop,
      }"
    >
      <Picker
        :title="title"
        :enable-alpha="enableAlpha"
        :open-alpha-by-default="openAlphaByDefault"
        :colors="colorSwatch"
      />
    </div>
  </div>
</template>

<style scoped>
.color-picker {
  position: relative;
  width: fit-content;
}

.color-btn {
  width: 300px;
  box-sizing: border-box;
  background-color: white;

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
  flex-grow: 1;
  margin: auto;
  vertical-align: middle;

  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;

  user-select: none;
}

.picker-popup {
  position: absolute;
  top: 100%;
  transform: translateY(0.5rem);
  width: 100%;
  z-index: 999999;
}

.picker-popup.top {
  top: -0.5rem;
  transform: translateY(-100%);
}

.picker-copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  width: min-content;
  height: 1.75rem;

  padding: 0 0.25rem;
  border-radius: 0.375rem;

  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.picker-copy-btn:hover {
  background-color: #e5e5e5;
}
</style>

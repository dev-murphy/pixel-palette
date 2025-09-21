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
import { getContrastColor } from "../utils/color-utils";

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

const { hex, exportColor, colorMode, setColorFromString, alpha } = useColors();
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
      <p
        :class="[
          'color-text',
          {
            black: alpha !== 1 && getContrastColor(`#${hex}`) === 'black',
            white: alpha !== 1 && getContrastColor(`#${hex}`) === 'white',
          },
        ]"
        :style="{
          color: getContrastColor(`#${hex}`),
        }"
      >
        {{ exportColor }}
      </p>
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
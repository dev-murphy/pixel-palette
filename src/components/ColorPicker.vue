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
  <div ref="colorPicker" class="relative">
    <button
      class="min- w-[300px] flex items-center gap-2 border-2 border-neutral-900"
      @click="togglePicker"
    >
      <Color class="w-9 h-9" :color="currentColor" />

      <div class="flex flex-grow items-center gap-x-2 pr-1">
        <p class="mx-auto text-sm uppercase">{{ currentColor }}</p>
        <Tooltip
          :text="currentColorMode.toUpperCase()"
          v-model="showCopiedTooltip"
          class="cursor-pointer"
        >
          <div
            @click.stop="
              () => {
                showCopiedTooltip = copyColor(currentColor);
              }
            "
          >
            <Copy class="w-6 h-6" />
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
      class="absolute top-full translate-y-2 right-0 z-10"
      @set-color="showColor"
      @set-color-mode="setColorMode"
    />
  </div>
</template>

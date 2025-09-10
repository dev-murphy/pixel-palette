<script setup lang="ts">
import { ref, onMounted } from "vue";
import { copyColor } from "../utils";
import { useColors } from "../composables/useColors";

import ColorSpace from "./ColorSpace.vue";
import HueSlider from "./HueSlider.vue";
import AlphaSlider from "./AlphaSlider.vue";
import ColorInput from "./ColorInput.vue";

import Picker from "./icons/Picker.vue";
import Copy from "./icons/Copy.vue";
import Random from "./icons/Random.vue";
import Switch from "./icons/Switch.vue";
import ArrowDown from "./icons/ArrowDown.vue";
import Tooltip from "./Tooltip.vue";

const props = defineProps<{
  title?: string;
  enableAlpha: boolean;
  openAlphaByDefault: boolean;
}>();

const { exportColor, colorMode, toggleMode, randomColor, setColorFromString } =
  useColors();

const isEyeDropperSupported = ref(false);
const showCopiedTooltip = ref(false);
const showAlphaChannel = ref(false);

const toogleShowAlpha = () => {
  showAlphaChannel.value = !showAlphaChannel.value;
};

onMounted(() => {
  isEyeDropperSupported.value =
    typeof (window as any).EyeDropper === "function";

  showAlphaChannel.value = props.openAlphaByDefault;
});

async function pickWithEyeDropper() {
  try {
    const EyeDropperCtor = (window as any).EyeDropper;
    if (!EyeDropperCtor) return;
    const ed = new EyeDropperCtor();
    const result = await ed.open();

    if (result?.sRGBHex) {
      setColorFromString(result.sRGBHex);
    }
  } catch (err) {}
}
</script>

<template>
  <div class="color-picker__container border-primary">
    <h2 v-if="props.title" class="color-picker__title border-primary">
      {{ props.title }}
    </h2>

    <div class="color-picker-colors__container">
      <ColorSpace />
      <ColorInput />
      <div class="hue-slider_and_alpha-toogle">
        <HueSlider />
        <button
          v-if="enableAlpha"
          class="alpha-toogle border-primary"
          :class="{
            rotate: showAlphaChannel,
          }"
          @click="toogleShowAlpha"
        >
          <ArrowDown class="icon text-primary" />
        </button>
      </div>
      <AlphaSlider v-if="showAlphaChannel && enableAlpha" />
    </div>

    <div class="color-picker-options__container border-primary">
      <button
        class="color-picker-options__toggle-btn color-picker-options__btn text-primary"
        @click="toggleMode"
      >
        {{ colorMode.toUpperCase() }}
        <Switch class="icon" />
      </button>

      <button
        v-if="isEyeDropperSupported"
        class="color-picker-options__btn text-primary hover-secondary"
        @click="pickWithEyeDropper"
      >
        <Picker class="icon" />
      </button>

      <button
        class="color-picker-options__btn text-primary hover-secondary"
        @click="randomColor()"
      >
        <Random class="icon" />
      </button>

      <Tooltip
        :text="colorMode.toUpperCase()"
        v-model="showCopiedTooltip"
        class="color-picker-options__tooltip"
      >
        <button
          class="color-picker-options__btn text-primary hover-secondary"
          @click="
            () => {
              showCopiedTooltip = copyColor(exportColor);
            }
          "
        >
          <Copy class="icon" />
        </button>
      </Tooltip>
    </div>
  </div>
</template>

<style scoped>
.color-picker__container {
  width: 100%;
  background-color: white;

  border-width: 0.125rem;
  border-style: solid;
  border-radius: 0.625rem;
}

.color-picker__title {
  padding: 0.25rem 1rem 0 1rem;
  border-bottom-width: 0.125rem;
  border-bottom-style: solid;

  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.55;
}

.color-picker-colors__container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem 0.5rem;
}

.color-picker-colors__container:last-child {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hue-slider_and_alpha-toogle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.alpha-toogle {
  width: 1.85rem;
  height: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-width: 0.125rem;
  border-style: solid;
  border-radius: 0.5rem;
}

.alpha-toogle .icon {
  width: 1.25rem;
  height: 1.25rem;
}

.alpha-toogle.rotate .icon {
  transform: rotateX(180deg);
}

.color-picker-options__container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  border-top-width: 0.125rem;
  border-top-style: solid;
}

.color-picker-options__btn {
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

.color-picker-options__btn:hover {
  background-color: var(--neutral-200);
}

.color-picker-options__toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0 0.5rem;
  margin-right: auto;
}

.color-picker-options__tooltip {
  height: 1.75rem;
}
</style>

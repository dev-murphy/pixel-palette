<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useColors } from "../composables/useColors";

import ColorSpace from "./sliders/ColorSpace.vue";
import HueSlider from "./sliders/HueSlider.vue";
import AlphaSlider from "./sliders/AlphaSlider.vue";
import ColorInput from "./inputs/ColorInput.vue";
import ColorShades from "./ColorScale.vue";
import ColorSelectCompare from "./ColorSelectCompare.vue";
import Picker from "./icons/Picker.vue";
import Random from "./icons/Random.vue";
import Switch from "./icons/Switch.vue";
import ArrowDown from "./icons/ArrowDown.vue";
import Gradient from "./icons/Gradient.vue";
import ColorFilter from "./icons/ColorFilter.vue";

const props = defineProps<{
  title?: string;
  enableAlpha: boolean;
  openAlphaByDefault: boolean;
}>();

const { colorMode, toggleMode, randomColor, setColorFromString } = useColors();
const isEyeDropperSupported = ref(false);

const showAlphaChannel = ref(false);
function toggleShowAlpha() {
  showAlphaChannel.value = !showAlphaChannel.value;
}

const showColorShades = ref(false);
function toggleShowColorShades() {
  showColorShades.value = !showColorShades.value;
}

const showColorComparisons = ref(false);
function toggleShowColorComparison() {
  showColorComparisons.value = !showColorComparisons.value;
}

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

onMounted(() => {
  isEyeDropperSupported.value =
    typeof (window as any).EyeDropper === "function";

  showAlphaChannel.value = props.openAlphaByDefault;
});
</script>

<template>
  <div class="color-picker__container border-primary">
    <h2 v-if="props.title" class="color-picker__title border-primary">
      {{ props.title }}
    </h2>

    <div v-if="!showColorShades" class="color-picker-colors__container">
      <ColorSpace />
      <ColorInput />
      <div class="hue-slider_and_alpha-toggle">
        <HueSlider />
        <button
          v-if="enableAlpha"
          class="alpha-toggle border-primary"
          :class="{
            rotate: showAlphaChannel,
          }"
          @click="toggleShowAlpha"
        >
          <ArrowDown class="icon text-primary" />
        </button>
      </div>
      <AlphaSlider v-if="showAlphaChannel && enableAlpha" />
    </div>

    <ColorShades v-else />

    <ColorSelectCompare v-if="showColorComparisons" />

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

      <button
        class="color-picker-options__btn text-primary hover-secondary"
        :class="{
          active: showColorShades,
        }"
        @click="toggleShowColorShades()"
      >
        <Gradient class="icon" />
      </button>

      <button
        class="color-picker-options__btn text-primary hover-secondary"
        :class="{
          active: showColorComparisons,
        }"
        @click="toggleShowColorComparison()"
      >
        <ColorFilter class="icon" />
      </button>
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

.hue-slider_and_alpha-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.alpha-toggle {
  width: 1.85rem;
  height: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-width: 0.125rem;
  border-style: solid;
  border-radius: 0.5rem;
}

.alpha-toggle .icon {
  width: 1.25rem;
  height: 1.25rem;
}

.alpha-toggle.rotate .icon {
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

.color-picker-options__btn:hover,
.color-picker-options__btn.active {
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

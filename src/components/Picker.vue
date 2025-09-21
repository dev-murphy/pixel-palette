<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useColors } from "../composables/useColors";

import ColorSpace from "./sliders/ColorSpace.vue";
import HueSlider from "./sliders/HueSlider.vue";
import AlphaSlider from "./sliders/AlphaSlider.vue";
import ColorInput from "./inputs/ColorInput.vue";
import ColorSelectCompare from "./ColorSelectCompare.vue";
import Colors from "./Colors.vue";

import Picker from "./icons/Picker.vue";
import Random from "./icons/Random.vue";
import ArrowDown from "./icons/ArrowDown.vue";
import ColorFilter from "./icons/ColorFilter.vue";

const props = defineProps<{
  title?: string;
  enableAlpha: boolean;
  openAlphaByDefault: boolean;
  colors?: string[];
}>();

const { randomColor, setColorFromString } = useColors();
const isEyeDropperSupported = ref(false);
const showSwatch = ref(false);

const showAlphaChannel = ref(false);
function toggleShowAlpha() {
  showAlphaChannel.value = !showAlphaChannel.value;
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
    <h2
      v-if="props.title"
      class="color-picker__title border-primary text-primary"
    >
      {{ props.title }}
    </h2>

    <div class="color-picker-colors__container">
      <ColorSpace />
      <ColorInput v-model="showSwatch" />
      <div v-if="!showSwatch" class="slider-container">
        <div class="hue-slider_and_alpha-toggle">
          <HueSlider />
          <button
            v-if="enableAlpha"
            class="alpha-toggle"
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
      <Colors v-if="colors && showSwatch" :colors="colors" />
    </div>

    <ColorSelectCompare v-if="showColorComparisons" />

    <div class="color-picker-options__container border-primary">
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
          active: showColorComparisons,
        }"
        @click="toggleShowColorComparison()"
      >
        <ColorFilter class="icon" />
      </button>
    </div>
  </div>
</template>

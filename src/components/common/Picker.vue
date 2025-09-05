<script setup lang="ts">
import { ref, onMounted } from "vue";
import { copyColor } from "../../utils";
import { useColors } from "../../composables/useColors";

import ColorSpace from "../common/ColorSpace.vue";
import HueSlider from "../common/HueSlider.vue";
import AlphaSlider from "../common/AlphaSlider.vue";
import ColorInput from "../common/ColorInput.vue";

import Picker from "../common/icons/Picker.vue";
import Copy from "../common/icons/Copy.vue";
import Random from "../common/icons/Random.vue";
import Switch from "../common/icons/Switch.vue";
import Tooltip from "../common/Tooltip.vue";

const props = defineProps<{
  title?: string;
}>();

const { exportColor, colorMode, toggleMode, randomColor, setColorFromString } =
  useColors();

const isEyeDropperSupported = ref(false);
const showCopiedTooltip = ref(false);

onMounted(() => {
  isEyeDropperSupported.value =
    typeof (window as any).EyeDropper === "function";
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
  } catch (err) {
    // Silently ignore (e.g., user cancels or not secure context)
  }
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
      <HueSlider />
      <AlphaSlider />
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
  width: 300px;
  background-color: white;

  border-width: 0.125rem;
  border-style: solid;
  border-radius: 0.125rem;
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

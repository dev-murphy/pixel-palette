<script lang="ts" setup>
import { ref, watch } from "vue";
import { useColors } from "../../../composables/useColors";

const { colorMode, rgbR, rgbG, rgbB, hslH, hslS, hslL } = useColors();

// Input strings
const firstValue = ref<string>("");
const secondValue = ref<string>("");
const thirdValue = ref<string>("");

// Map refs for convenience
const channelRefs = {
  rgb: [rgbR, rgbG, rgbB],
  hsl: [hslH, hslS, hslL],
};

// Min/Max values for each mode
const channelLimits = {
  rgb: [
    { min: 0, max: 255 },
    { min: 0, max: 255 },
    { min: 0, max: 255 },
  ],
  hsl: [
    { min: 0, max: 360 },
    { min: 0, max: 100 },
    { min: 0, max: 100 },
  ],
};

// Initialize input values from channels
function updateInputsFromChannels() {
  const mode = colorMode.value as "rgb" | "hsl";
  const channels = channelRefs[mode];
  if (mode === "rgb") {
    firstValue.value = Math.round(channels[0].value).toString();
    secondValue.value = Math.round(channels[1].value).toString();
    thirdValue.value = Math.round(channels[2].value).toString();
  } else {
    // HSL: scale S/L to 0–100
    firstValue.value = Math.round(channels[0].value).toString();
    secondValue.value = Math.round(channels[1].value * 100).toString();
    thirdValue.value = Math.round(channels[2].value * 100).toString();
  }
}

// Watch for mode changes
watch(colorMode, () => {
  updateInputsFromChannels();
});

// Sanitize input
function sanitizeNumeric(raw: string, min: number, max: number) {
  const n = parseInt(raw.replace(/\D/g, ""), 10) || min;
  return Math.min(Math.max(n, min), max);
}

// Update channel from input
function updateChannelFromInput() {
  const mode = colorMode.value as "rgb" | "hsl";
  const limits = channelLimits[mode];
  const channels = channelRefs[mode];

  const values = [firstValue.value, secondValue.value, thirdValue.value].map(
    (v, i) => sanitizeNumeric(v, limits[i].min, limits[i].max)
  );

  if (mode === "rgb") {
    channels.forEach((c, i) => (c.value = values[i]));
  } else {
    channels[0].value = values[0];
    channels[1].value = values[1] / 100;
    channels[2].value = values[2] / 100;
  }

  // Update inputs in case sanitization changed them
  updateInputsFromChannels();
}

// Handle input events
function handleInput(which: "first" | "second" | "third", event: Event) {
  const target = event.target as HTMLInputElement;
  let val = target.value;

  const mode = colorMode.value as "rgb" | "hsl";
  const index = which === "first" ? 0 : which === "second" ? 1 : 2;
  const limits = channelLimits[mode][index];

  const sanitized = sanitizeNumeric(val, limits.min, limits.max);
  if (index === 0) firstValue.value = sanitized.toString();
  if (index === 1) secondValue.value = sanitized.toString();
  if (index === 2) thirdValue.value = sanitized.toString();

  if (sanitized.toString() !== val) target.value = sanitized.toString();
}

// Handle blur
function handleBlur() {
  updateChannelFromInput();
}

// Arrow key stepping
function stepValue(which: "first" | "second" | "third", direction: 1 | -1) {
  const mode = colorMode.value as "rgb" | "hsl";
  const index = which === "first" ? 0 : which === "second" ? 1 : 2;
  const limits = channelLimits[mode][index];

  const refMap = [firstValue, secondValue, thirdValue];
  const val = parseInt(refMap[index].value) || limits.min;
  const stepped = Math.min(Math.max(val + direction, limits.min), limits.max);
  refMap[index].value = stepped.toString();

  updateChannelFromInput();
}

function handleKeydown(
  which: "first" | "second" | "third",
  event: KeyboardEvent
) {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    stepValue(which, 1);
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    stepValue(which, -1);
  }
}

// Initialize
updateInputsFromChannels();
</script>

<template>
  <div class="color_channel-input__container border-primary">
    <div class="color_channel-input__wrapper">
      <label for="first" class="text-primary">
        {{ colorMode === "rgb" ? "R" : "H" }}
      </label>
      <input
        type="text"
        id="first"
        v-model="firstValue"
        @input="(e) => handleInput('first', e)"
        @keydown="(e) => handleKeydown('first', e)"
        @blur="handleBlur"
        class="text-primary"
      />
    </div>

    <div class="color_channel-input__wrapper">
      <label for="second" class="text-primary">
        {{ colorMode === "rgb" ? "G" : "S" }}
      </label>
      <input
        type="text"
        id="second"
        v-model="secondValue"
        @input="(e) => handleInput('second', e)"
        @keydown="(e) => handleKeydown('second', e)"
        @blur="handleBlur"
        class="text-primary"
      />
    </div>

    <div class="color_channel-input__wrapper">
      <label for="third" class="text-primary">
        {{ colorMode === "rgb" ? "B" : "L" }}
      </label>
      <input
        type="text"
        id="third"
        v-model="thirdValue"
        @input="(e) => handleInput('third', e)"
        @keydown="(e) => handleKeydown('third', e)"
        @blur="handleBlur"
        class="text-primary"
      />
    </div>
  </div>
</template>

<style scoped>
.color_channel-input__container {
  display: flex;
  gap: 0.5rem;
}

.color_channel-input__container > :not(:last-child) {
  border-right-width: 0.125rem;
  border-right-style: solid;
}

.color_channel-input__wrapper {
  width: 33.3333%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.color_channel-input__wrapper:first-child {
  padding: 0 0.5rem;
}

.color_channel-input__wrapper label {
  text-align: center;
  font-weight: 700;
  user-select: none;
}

.color_channel-input__wrapper input {
  width: 100%;
  text-align: center;
}
</style>

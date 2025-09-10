<script lang="ts" setup>
import { ref, watch } from "vue";
import { useColors } from "../../composables/useColors";

const { rgbR, rgbG, rgbB } = useColors();

const rValue = ref<string>("");
const gValue = ref<string>("");
const bValue = ref<string>("");

const channels = [rgbR, rgbG, rgbB];
const limits = [
  { min: 0, max: 255 },
  { min: 0, max: 255 },
  { min: 0, max: 255 },
];

let isUpdatingFromChannels = false;

function updateInputsFromChannels() {
  if (isUpdatingFromChannels) return;

  rValue.value = Math.round(channels[0].value).toString();
  gValue.value = Math.round(channels[1].value).toString();
  bValue.value = Math.round(channels[2].value).toString();
}

watch([rgbR, rgbG, rgbB], () => {
  updateInputsFromChannels();
});

function sanitizeNumeric(raw: string, min: number, max: number) {
  const n = parseInt(raw.replace(/\D/g, ""), 10) || min;
  return Math.min(Math.max(n, min), max);
}

function updateChannelFromInput() {
  isUpdatingFromChannels = true;

  const values = [rValue.value, gValue.value, bValue.value].map((v, i) =>
    sanitizeNumeric(v, limits[i].min, limits[i].max)
  );

  channels.forEach((c, i) => (c.value = values[i]));

  setTimeout(() => {
    updateInputsFromChannels();
    isUpdatingFromChannels = false;
  }, 0);
}

function handleInput(which: "r" | "g" | "b", event: Event) {
  const target = event.target as HTMLInputElement;
  let val = target.value;

  const index = which === "r" ? 0 : which === "g" ? 1 : 2;
  const sanitized = sanitizeNumeric(val, limits[index].min, limits[index].max);

  if (which === "r") rValue.value = sanitized.toString();
  else if (which === "g") gValue.value = sanitized.toString();
  else bValue.value = sanitized.toString();

  if (sanitized.toString() !== val) target.value = sanitized.toString();
}

function handleBlur() {
  updateChannelFromInput();
}

function stepValue(which: "r" | "g" | "b", direction: 1 | -1) {
  const index = which === "r" ? 0 : which === "g" ? 1 : 2;
  const refMap = [rValue, gValue, bValue];

  const val = parseInt(refMap[index].value) || limits[index].min;
  const stepped = Math.min(
    Math.max(val + direction, limits[index].min),
    limits[index].max
  );
  refMap[index].value = stepped.toString();

  updateChannelFromInput();
}

function handleKeydown(which: "r" | "g" | "b", event: KeyboardEvent) {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    stepValue(which, 1);
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    stepValue(which, -1);
  }
}

updateInputsFromChannels();
</script>

<template>
  <div class="color_channel-input__container border-primary">
    <div class="color_channel-input__wrapper">
      <label for="r" class="text-primary">R</label>
      <input
        type="text"
        id="r"
        v-model="rValue"
        @input="(e) => handleInput('r', e)"
        @keydown="(e) => handleKeydown('r', e)"
        @blur="handleBlur"
        @keypress.enter="handleBlur"
        class="text-primary"
      />
    </div>

    <div class="color_channel-input__wrapper">
      <label for="g" class="text-primary">G</label>
      <input
        type="text"
        id="g"
        v-model="gValue"
        @input="(e) => handleInput('g', e)"
        @keydown="(e) => handleKeydown('g', e)"
        @blur="handleBlur"
        @keypress.enter="handleBlur"
        class="text-primary"
      />
    </div>

    <div class="color_channel-input__wrapper">
      <label for="b" class="text-primary">B</label>
      <input
        type="text"
        id="b"
        v-model="bValue"
        @input="(e) => handleInput('b', e)"
        @keydown="(e) => handleKeydown('b', e)"
        @blur="handleBlur"
        @keypress.enter="handleBlur"
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

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useColors } from "../../composables/useColors";

const { hslH, hslS, hslL } = useColors();

const hValue = ref<string>("");
const sValue = ref<string>("");
const lValue = ref<string>("");

const channels = [hslH, hslS, hslL];
const limits = [
  { min: 0, max: 360 },
  { min: 0, max: 100 },
  { min: 0, max: 100 },
];

let isUpdatingFromChannels = false;

function updateInputsFromChannels() {
  if (isUpdatingFromChannels) return;

  hValue.value = Math.round(channels[0].value).toString();
  sValue.value = Math.round(channels[1].value * 100).toString();
  lValue.value = Math.round(channels[2].value * 100).toString();
}

watch([hslH, hslS, hslL], () => {
  updateInputsFromChannels();
});

function sanitizeNumeric(raw: string, min: number, max: number) {
  const n = parseInt(raw.replace(/\D/g, ""), 10) || min;
  return Math.min(Math.max(n, min), max);
}

function updateChannelFromInput() {
  isUpdatingFromChannels = true;

  const values = [hValue.value, sValue.value, lValue.value].map((v, i) =>
    sanitizeNumeric(v, limits[i].min, limits[i].max)
  );

  channels[0].value = values[0];
  channels[1].value = values[1] / 100;
  channels[2].value = values[2] / 100;

  setTimeout(() => {
    updateInputsFromChannels();
    isUpdatingFromChannels = false;
  }, 0);
}

function handleInput(which: "h" | "s" | "l", event: Event) {
  const target = event.target as HTMLInputElement;
  let val = target.value;

  const index = which === "h" ? 0 : which === "s" ? 1 : 2;
  const sanitized = sanitizeNumeric(val, limits[index].min, limits[index].max);

  if (which === "h") hValue.value = sanitized.toString();
  else if (which === "s") sValue.value = sanitized.toString();
  else lValue.value = sanitized.toString();

  if (sanitized.toString() !== val) target.value = sanitized.toString();
}

function handleBlur() {
  updateChannelFromInput();
}

function stepValue(which: "h" | "s" | "l", direction: 1 | -1) {
  const index = which === "h" ? 0 : which === "s" ? 1 : 2;
  const refMap = [hValue, sValue, lValue];

  const val = parseInt(refMap[index].value) || limits[index].min;
  const stepped = Math.min(
    Math.max(val + direction, limits[index].min),
    limits[index].max
  );
  refMap[index].value = stepped.toString();

  updateChannelFromInput();
}

function handleKeydown(which: "h" | "s" | "l", event: KeyboardEvent) {
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
    <div class="color_channel-input__wrapper highlight">
      <label for="h" class="text-primary">H</label>
      <input
        type="text"
        id="h"
        class="text-primary"
        data-pw="cp-hue-input"
        v-model="hValue"
        @input="(e) => handleInput('h', e)"
        @keydown="(e) => handleKeydown('h', e)"
        @blur="handleBlur"
        @keypress.enter="handleBlur"
      />
    </div>

    <div class="color_channel-input__wrapper highlight">
      <label for="s" class="text-primary">S</label>
      <input
        type="text"
        id="s"
        class="text-primary"
        data-pw="cp-sat-input"
        v-model="sValue"
        @input="(e) => handleInput('s', e)"
        @keydown="(e) => handleKeydown('s', e)"
        @blur="handleBlur"
        @keypress.enter="handleBlur"
      />
    </div>

    <div class="color_channel-input__wrapper highlight">
      <label for="l" class="text-primary">L</label>
      <input
        type="text"
        id="l"
        class="text-primary"
        data-pw="cp-lig-input"
        v-model="lValue"
        @input="(e) => handleInput('l', e)"
        @keydown="(e) => handleKeydown('l', e)"
        @blur="handleBlur"
        @keypress.enter="handleBlur"
      />
    </div>
  </div>
</template>
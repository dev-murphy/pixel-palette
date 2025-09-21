<script lang="ts" setup>
import { ref } from "vue";

import HEXInput from "./HEXInput.vue";
import RGBInputs from "./RGBInputs.vue";
import HSLInputs from "./HSLInputs.vue";
import Switch from "../icons/Switch.vue";

import { useColors } from "../../composables/useColors";

defineProps<{ modelValue: boolean }>();
defineEmits<{ (e: "update:modelValue", val: boolean): void }>();

const { toggleMode, colorMode } = useColors();
let timer: number | null = null;

const rotateAnim = ref(false);
function rotateAnimation() {
  toggleMode();
  rotateAnim.value = true;
  if (timer !== null) clearTimeout(timer);

  timer = window.setTimeout(() => {
    rotateAnim.value = false;
  }, 500);
}
</script>

<template>
  <div class="color-input border-primary">
    <button class="color-mode-btn btn-hoverable" @click="rotateAnimation">
      {{ colorMode.toUpperCase() }}
      <Switch
        class="color-mode-icon"
        :class="{
          rotate: rotateAnim,
        }"
      />
    </button>
    <div class="color-input-wrapper">
      <HEXInput v-if="colorMode === 'hex'" />
      <RGBInputs v-if="colorMode === 'rgb'" />
      <HSLInputs v-if="colorMode === 'hsl'" />
    </div>
  </div>
</template>

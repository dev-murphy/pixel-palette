<script lang="ts" setup>
import { useColors } from "../../composables/useColors";

const { hex } = useColors();

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const raw = target.value || "";
  const sanitized = raw.replace(/[^0-9a-fA-F]/g, "").slice(0, 6);

  if (sanitized !== raw) {
    target.value = sanitized;
  }

  hex.value = sanitized;
}
</script>

<template>
  <div class="hex_input__wrapper text-primary">
    <label for="code">hex <span>#</span></label>
    <input
      type="text"
      id="code"
      :value="hex"
      @change="handleInput"
      maxlength="7"
      placeholder="000000"
    />
  </div>
</template>

<style scoped>
.hex_input__wrapper {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
}

.hex_input__wrapper label {
  flex-shrink: 0;
  font-weight: 700;
  text-transform: uppercase;
  user-select: none;
}

.hex_input__wrapper label span {
  color: #737373;
}

.hex_input__wrapper input {
  width: 100%;
  text-transform: uppercase;
}
</style>

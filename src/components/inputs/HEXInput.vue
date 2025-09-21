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
  <div class="hex_input__wrapper highlight text-primary">
    <label for="code">#</label>
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

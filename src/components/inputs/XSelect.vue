<script lang="ts" setup>
import { ref } from "vue";
import ArrowDown from "../icons/ArrowDown.vue";

interface Option {
  label: string;
  value: string;
}

withDefaults(
  defineProps<{
    options: Option[];
    modelValue?: Option;
    placeholder?: string;
  }>(),
  {
    placeholder: "Select an option",
  }
);

const emits = defineEmits<{ (e: "update:modelValue", val: Option): void }>();

const isMenuOpen = ref(false);
const selectOption = (option: Option) => {
  emits("update:modelValue", option);
  isMenuOpen.value = false;
};
</script>

<template>
  <div ref="selectDropdown" class="x-select">
    <button
      class="x-select__selected-container"
      @click="
        () => {
          isMenuOpen = !isMenuOpen;
        }
      "
    >
      <p
        class="x-select__selected-text"
        :class="{ 'x-select__placeholder': !modelValue }"
      >
        {{ modelValue?.label || placeholder }}
      </p>
      <ArrowDown
        class="x-select__icon"
        :class="{
          active: isMenuOpen,
        }"
      />
    </button>

    <!-- Dropdown -->
    <div v-if="isMenuOpen" class="x-select__dropdown">
      <button
        v-for="option in options"
        :key="option.value"
        :class="[
          'x-select__option',
          { selected: modelValue?.label === option.label },
        ]"
        @click.stop="selectOption(option)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Container */
.x-select {
  position: relative;
  width: 100%;
  font-family: system-ui, sans-serif;
  font-size: 0.9rem;
}

/* Selected/trigger button */
.x-select__selected-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 0.6rem 0.75rem;

  background-color: #fff;
  border: 1.5px solid #d1d5db;
  border-radius: 0.6rem;
  cursor: pointer;

  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.x-select__selected-container:hover {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.x-select__selected-text {
  flex: 1;
  text-align: left;
  font-weight: 500;
  color: #111827;
}

.x-select__placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.x-select__icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #6b7280;
  transition: transform 0.2s ease;
}

.x-select__icon.active {
  transform: rotate(180deg);
}

/* Dropdown menu */
.x-select__dropdown {
  position: absolute;
  top: calc(100% + 0.35rem);

  display: flex;
  flex-direction: column;
  width: 95%;

  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.6rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);

  z-index: 1000;
  animation: dropdown-fade 0.15s ease;
}

@keyframes dropdown-fade {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Options */
.x-select__option {
  width: 100%;
  text-align: left;
  padding: 0.6rem 0.75rem;
  background: #fff;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.x-select__option:hover {
  background: #f3f4f6;
}

.x-select__option.selected {
  background: #e5e7eb;
  font-weight: 600;
  color: #2563eb;
  pointer-events: none;
}
</style>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  size: { type: String, default: "md" }, // sm, md, lg
  labelPosition: { type: String, default: "right" }, // left, right
  label: { type: String, default: "" }, // <-- now correctly defined
});

const emit = defineEmits(["update:modelValue"]);

const sizeClasses = computed(() => {
  const sizes = {
    sm: {
      switch: "w-9 h-5",
      thumb: "w-4 h-4",
      translate: "translate-x-4",
    },
    md: {
      switch: "w-11 h-6",
      thumb: "w-5 h-5",
      translate: "translate-x-5",
    },
    lg: {
      switch: "w-14 h-7",
      thumb: "w-6 h-6",
      translate: "translate-x-7",
    },
  };
  return sizes[props.size] || sizes.md; // fallback to md
});

const toggle = () => {
  if (props.disabled) return;
  emit("update:modelValue", !props.modelValue);
};
</script>

<template>
  <div class="inline-flex items-center gap-3">
    <!-- Label on left -->
    <label
      v-if="label && labelPosition === 'left'"
      class="text-sm font-medium text-gray-700 dark:text-gray-300"
      :class="{ 'opacity-50 cursor-not-allowed': disabled }"
      @click="toggle"
    >
      {{ label }}
    </label>

    <!-- Toggle Switch -->
    <button
      type="button"
      :class="[
        'relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500',
        sizeClasses.switch,
        modelValue ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700',
        disabled && 'opacity-50 cursor-not-allowed',
      ]"
      :disabled="disabled"
      @click="toggle"
    >
      <!-- Thumb -->
      <span
        :class="[
          'pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out',
          sizeClasses.thumb,
          modelValue ? sizeClasses.translate : 'translate-x-0',
        ]"
      />
    </button>

    <!-- Label on right -->
    <label
      v-if="label && labelPosition === 'right'"
      class="text-sm font-medium text-gray-700 dark:text-gray-300"
      :class="{ 'opacity-50 cursor-not-allowed': disabled }"
      @click="toggle"
    >
      {{ label }}
    </label>
  </div>
</template>

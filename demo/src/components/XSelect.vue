<script setup>
import { ref, computed } from "vue";
import ArrowDown from "./icons/ArrowDown.vue";

const props = defineProps(["modelValue", "commands"]);
defineEmits(["update:modelValue"]);

const isMenuOpen = ref(false);
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

const filterCommands = computed(() => {
  return props.commands.filter((x) => x.pkg !== props.modelValue.pkg);
});
</script>

<template>
  <div>
    <!-- selected -->
    <button
      class="relative w-full h-9 flex items-center justify-center px-2 rounded-t-xl"
      @click="toggleMenu"
    >
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 font-semibold uppercase"
      >
        <Component :is="modelValue.icon" />
        <p>{{ modelValue.pkg }}</p>
      </div>

      <ArrowDown
        class="w-5 h-7 ml-auto"
        :class="{ 'rotate-180': isMenuOpen }"
      />
    </button>

    <!-- expanded section -->
    <div
      class="bg-neutral-900 overflow-hidden transition-all duration-300"
      :class="{
        'max-h-0': !isMenuOpen,
        'max-h-[999px]': isMenuOpen,
      }"
    >
      <div
        v-for="cmd in filterCommands"
        :key="cmd.pkg"
        class="w-full flex items-center justify-center gap-1 py-1 hover:bg-black uppercase cursor-pointer"
        @click="
          () => {
            $emit('update:modelValue', cmd);
            isMenuOpen = false;
          }
        "
      >
        <Component :is="cmd.icon" />
        <p>{{ cmd.pkg }}</p>
      </div>
    </div>
  </div>
</template>

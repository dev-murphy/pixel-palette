import { onMounted, onUnmounted, type ShallowRef } from "vue";

export function useClickOutside(
  elementRef: Readonly<ShallowRef<HTMLElement | null>>,
  callback: () => void
) {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      elementRef.value &&
      !elementRef.value.contains(event.target as HTMLElement)
    ) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });

  return {
    handleClickOutside,
  };
}

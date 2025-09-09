import { ref, computed } from "vue";
import {
  hsvToRgb,
  rgbToHex,
  hexToRgb,
  rgbToHsl,
  rgbToHsv,
} from "../utils/color-utils"; // adjust path as needed

interface Color {
  h: number;
  s: number;
  v: number;
  a: number;
}

const color = ref<Color>({
  h: 0,
  s: 1,
  v: 1,
  a: 1,
});

const colorMode = ref<"hex" | "rgb" | "hsl">("hex");
const modes = ["hex", "rgb", "hsl"] as const;

export const useColors = () => {
  // Cache RGB values from HSV
  const rgbValues = computed(() =>
    hsvToRgb(color.value.h, color.value.s, color.value.v)
  );

  function toggleMode() {
    const currentIndex = modes.indexOf(colorMode.value);
    const nextIndex = (currentIndex + 1) % modes.length;
    colorMode.value = modes[nextIndex];
  }

  function setColor(newColor: Partial<Color>) {
    color.value = { ...color.value, ...newColor };
  }

  function setColorFromString(colorString: string) {
    // Very simple HEX input only (you can extend this with regex parsing for rgb()/hsl())
    try {
      if (colorString.startsWith("#")) {
        const { r, g, b } = hexToRgb(colorString);
        // Convert RGB → HSV manually
        const { h, s, v } = rgbToHsv(r, g, b);
        color.value = { h, s, v, a: 1 };
      }
    } catch {
      console.warn("Invalid color string:", colorString);
    }
  }

  // Direct HSV access
  const hue = computed(() => color.value.h);
  const alpha = computed(() => color.value.a);

  function setHue(newHue: number) {
    color.value.h = newHue;
  }

  function setAlpha(newAlpha: number) {
    color.value.a = newAlpha;
  }

  const hex = computed({
    get: () => {
      const { r, g, b } = rgbValues.value;
      return rgbToHex(r, g, b).slice(1); // drop leading "#"
    },
    set: (newHex: string) => {
      const { r, g, b } = hexToRgb(newHex);
      const { h, s, v } = rgbToHsv(r, g, b);
      color.value = { h, s, v, a: 1 };
    },
  });

  // HSL Channel computeds
  const hslValues = computed(() => {
    const { r, g, b } = rgbValues.value;
    return rgbToHsl(r, g, b);
  });

  const hslH = computed({
    get: () => hslValues.value.h,
    set: (newH: number) => {
      color.value.h = newH;
    },
  });

  const hslS = computed({
    get: () => hslValues.value.s / 100,
    set: (newS: number) => {
      color.value.s = newS;
    },
  });

  const hslL = computed({
    get: () => hslValues.value.l / 100,
    set: (newL: number) => {
      // convert HSL L → HSV V (approximate)
      const { s } = color.value;
      const denominator = 1 - s / 2;
      const newV = denominator !== 0 ? newL / denominator : newL;
      color.value.v = Math.max(0, Math.min(1, newV));
    },
  });

  // RGB Channels
  const rgbR = computed({
    get: () => rgbValues.value.r,
    set: (newR: number) => {
      const { g, b } = rgbValues.value;
      const { h, s, v } = rgbToHsv(newR, g, b);
      color.value = { h, s, v, a: color.value.a };
    },
  });

  const rgbG = computed({
    get: () => rgbValues.value.g,
    set: (newG: number) => {
      const { r, b } = rgbValues.value;
      const { h, s, v } = rgbToHsv(r, newG, b);
      color.value = { h, s, v, a: color.value.a };
    },
  });

  const rgbB = computed({
    get: () => rgbValues.value.b,
    set: (newB: number) => {
      const { r, g } = rgbValues.value;
      const { h, s, v } = rgbToHsv(r, g, newB);
      color.value = { h, s, v, a: color.value.a };
    },
  });

  const exportColor = computed(() => {
    const { r, g, b } = rgbValues.value;

    if (colorMode.value === "rgb") {
      return `rgb(${r}, ${g}, ${b})`;
    } else if (colorMode.value === "hsl") {
      const { h, s, l } = rgbToHsl(r, g, b);
      return `hsl(${h}, ${s}%, ${l}%)`;
    }

    // default hex
    return color.value.a === 1
      ? rgbToHex(r, g, b)
      : `${rgbToHex(r, g, b)}${Math.round(color.value.a * 255)
          .toString(16)
          .padStart(2, "0")}`;
  });

  function randomColor() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.random();
    const v = Math.random();
    color.value = { h, s, v, a: 1 };
  }

  return {
    colorMode,
    toggleMode,
    color,
    setColor,
    setColorFromString,
    hue,
    setHue,
    alpha,
    setAlpha,
    hex,
    hslH,
    hslS,
    hslL,
    rgbR,
    rgbG,
    rgbB,
    exportColor,
    randomColor,
  };
};

// @ts-ignore
import tinycolor from "tinycolor2";
import { ref, computed } from "vue";

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
  // Cache tinycolor instance to avoid recreating it constantly
  const tinyColorInstance = computed(() => tinycolor(color.value));

  // Cache RGB values to avoid repeated conversions
  const rgbValues = computed(() => tinyColorInstance.value.toRgb());

  function toggleMode() {
    const currentIndex = modes.indexOf(colorMode.value);
    const nextIndex = (currentIndex + 1) % modes.length;
    const newMode = modes[nextIndex];
    colorMode.value = newMode;
  }

  function setColor(newColor: Partial<Color>) {
    color.value = { ...color.value, ...newColor };
  }

  function setColorFromString(colorString: string) {
    const tc = tinycolor(colorString);
    if (tc.isValid()) {
      color.value = tc.toHsv();
    }
  }

  // Direct HSV access (no tinycolor needed)
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
      return tinyColorInstance.value.toHexString().slice(1);
    },
    set: (newHex: string) => {
      const tc = tinycolor(newHex);
      if (tc.isValid()) {
        color.value = tc.toHsv();
      }
    },
  });

  // HSL Channel computeds (direct access, no tinycolor needed)
  const hslH = computed({
    get: () => color.value.h,
    set: (newH: number) => {
      color.value.h = newH;
    },
  });

  const hslS = computed({
    get: () => color.value.s,
    set: (newS: number) => {
      color.value.s = newS;
    },
  });

  const hslL = computed({
    get: () => {
      // Convert HSV to HSL lightness using math formula
      const { s, v } = color.value;
      return v * (1 - s / 2);
    },
    set: (newL: number) => {
      // Convert HSL lightness back to HSV
      const { s } = color.value;
      const denominator = 1 - s / 2;
      const newV = denominator !== 0 ? newL / denominator : newL;
      color.value.v = Math.max(0, Math.min(1, newV));
    },
  });

  // RGB Channel computeds (use cached RGB values)
  const rgbR = computed({
    get: () => rgbValues.value.r,
    set: (newR: number) => {
      const currentRgb = rgbValues.value;
      const updatedColor = tinycolor({
        r: newR,
        g: currentRgb.g,
        b: currentRgb.b,
        a: currentRgb.a,
      });
      color.value = updatedColor.toHsv();
    },
  });

  const rgbG = computed({
    get: () => rgbValues.value.g,
    set: (newG: number) => {
      const currentRgb = rgbValues.value;
      const updatedColor = tinycolor({
        r: currentRgb.r,
        g: newG,
        b: currentRgb.b,
        a: currentRgb.a,
      });
      color.value = updatedColor.toHsv();
    },
  });

  const rgbB = computed({
    get: () => rgbValues.value.b,
    set: (newB: number) => {
      const currentRgb = rgbValues.value;
      const updatedColor = tinycolor({
        r: currentRgb.r,
        g: currentRgb.g,
        b: newB,
        a: currentRgb.a,
      });
      color.value = updatedColor.toHsv();
    },
  });

  const exportColor = computed(() => {
    const tc = tinyColorInstance.value;

    if (colorMode.value === "rgb") {
      return tc.toRgbString();
    } else if (colorMode.value === "hsl") {
      return tc.toHslString();
    }

    if (color.value.a === 1) {
      return tc.toHexString();
    } else {
      return tc.toHex8String();
    }
  });

  function randomColor() {
    const tc = tinycolor.random();
    color.value = tc.toHsv();
  }

  return {
    colorMode,
    toggleMode,
    color,
    setColor,
    setColorFromString,
    // hue and alpha (direct access)
    hue,
    setHue,
    alpha,
    setAlpha,
    hex,
    // HSL channels (direct access)
    hslH,
    hslS,
    hslL,
    // RGB channels (cached)
    rgbR,
    rgbG,
    rgbB,
    exportColor,
    randomColor,
  };
};

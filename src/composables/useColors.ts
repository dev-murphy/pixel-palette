import { ref, computed } from "vue";

interface Color {
  h: number;
  s: number;
  v: number;
  a: number;
}

interface RGB {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
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

// Utility functions for color conversions
function round(num: number, precision: number = 3): number {
  return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
}

function hsvToRgb(h: number, s: number, v: number, a: number = 1): RGB {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r: number, g: number, b: number;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
    a: round(a),
  };
}

function rgbToHsv(r: number, g: number, b: number, a: number = 1): Color {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  if (diff !== 0) {
    if (max === r) {
      h = ((g - b) / diff) % 6;
    } else if (max === g) {
      h = (b - r) / diff + 2;
    } else {
      h = (r - g) / diff + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : diff / max;
  const v = max;

  return {
    h: round(h),
    s: round(s),
    v: round(v),
    a: round(a),
  };
}

function hsvToHsl(h: number, s: number, v: number, a: number = 1): HSL {
  const l = v * (1 - s / 2);
  const sHsl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);

  return {
    h: round(h),
    s: round(sHsl),
    l: round(l),
    a: round(a),
  };
}

function hslToHsv(h: number, s: number, l: number, a: number = 1): Color {
  const v = l + s * Math.min(l, 1 - l);
  const sHsv = v === 0 ? 0 : 2 * (1 - l / v);

  return {
    h: round(h),
    s: round(sHsv),
    v: round(v),
    a: round(a),
  };
}

function hexToRgb(hex: string): RGB | null {
  // Remove # if present
  hex = hex.replace(/^#/, "");

  let r: number,
    g: number,
    b: number,
    a: number = 1;

  if (hex.length === 3) {
    // Short hex format
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    // Long hex format
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else if (hex.length === 8) {
    // Long hex format with alpha
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
    a = parseInt(hex.substring(6, 8), 16) / 255;
  } else {
    return null;
  }

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return null;
  }

  return { r, g, b, a: round(a) };
}

function rgbToHex(r: number, g: number, b: number, a: number = 1): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hexString = toHex(r) + toHex(g) + toHex(b);

  if (a < 1) {
    return "#" + hexString + toHex(Math.round(a * 255));
  }

  return "#" + hexString;
}

function parseColorString(colorString: string): Color | null {
  const trimmed = colorString.trim().toLowerCase();

  // Hex color
  if (trimmed.startsWith("#")) {
    const rgb = hexToRgb(trimmed);
    if (rgb) {
      return rgbToHsv(rgb.r, rgb.g, rgb.b, rgb.a);
    }
  }

  // RGB/RGBA
  const rgbMatch = trimmed.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/
  );
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    const a = rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1;

    if (
      r >= 0 &&
      r <= 255 &&
      g >= 0 &&
      g <= 255 &&
      b >= 0 &&
      b <= 255 &&
      a >= 0 &&
      a <= 1
    ) {
      return rgbToHsv(r, g, b, a);
    }
  }

  // HSL/HSLA
  const hslMatch = trimmed.match(
    /hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+))?\s*\)/
  );
  if (hslMatch) {
    const h = parseFloat(hslMatch[1]);
    const s = parseFloat(hslMatch[2]) / 100;
    const l = parseFloat(hslMatch[3]) / 100;
    const a = hslMatch[4] ? parseFloat(hslMatch[4]) : 1;

    if (
      h >= 0 &&
      h <= 360 &&
      s >= 0 &&
      s <= 1 &&
      l >= 0 &&
      l <= 1 &&
      a >= 0 &&
      a <= 1
    ) {
      return hslToHsv(h, s, l, a);
    }
  }

  return null;
}

function randomColor(): Color {
  return {
    h: Math.floor(Math.random() * 360),
    s: Math.random(),
    v: Math.random(),
    a: 1,
  };
}

export const useColors = () => {
  // Cache RGB values to avoid repeated conversions
  const rgbValues = computed(() =>
    hsvToRgb(color.value.h, color.value.s, color.value.v, color.value.a)
  );

  // Cache HSL values to avoid repeated conversions
  const hslValues = computed(() =>
    hsvToHsl(color.value.h, color.value.s, color.value.v, color.value.a)
  );

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
    const parsedColor = parseColorString(colorString);
    if (parsedColor) {
      color.value = parsedColor;
    }
  }

  // Direct HSV access
  const hue = computed(() => color.value.h);
  const alpha = computed(() => color.value.a);

  function setHue(newHue: number) {
    color.value.h = Math.max(0, Math.min(360, newHue));
  }

  function setAlpha(newAlpha: number) {
    color.value.a = Math.max(0, Math.min(1, newAlpha));
  }

  const hex = computed({
    get: () => {
      const rgb = rgbValues.value;
      return rgbToHex(rgb.r, rgb.g, rgb.b, rgb.a).slice(1); // Remove # prefix
    },
    set: (newHex: string) => {
      const parsedColor = parseColorString("#" + newHex);
      if (parsedColor) {
        color.value = parsedColor;
      }
    },
  });

  // HSL Channel computeds
  const hslH = computed({
    get: () => color.value.h,
    set: (newH: number) => {
      color.value.h = Math.max(0, Math.min(360, newH));
    },
  });

  const hslS = computed({
    get: () => hslValues.value.s,
    set: (newS: number) => {
      const clampedS = Math.max(0, Math.min(1, newS));
      const hsl = hslValues.value;
      const hsv = hslToHsv(hsl.h, clampedS, hsl.l, hsl.a);
      color.value = hsv;
    },
  });

  const hslL = computed({
    get: () => hslValues.value.l,
    set: (newL: number) => {
      const clampedL = Math.max(0, Math.min(1, newL));
      const hsl = hslValues.value;
      const hsv = hslToHsv(hsl.h, hsl.s, clampedL, hsl.a);
      color.value = hsv;
    },
  });

  // RGB Channel computeds
  const rgbR = computed({
    get: () => rgbValues.value.r,
    set: (newR: number) => {
      const clampedR = Math.max(0, Math.min(255, Math.round(newR)));
      const rgb = rgbValues.value;
      const hsv = rgbToHsv(clampedR, rgb.g, rgb.b, rgb.a);
      color.value = hsv;
    },
  });

  const rgbG = computed({
    get: () => rgbValues.value.g,
    set: (newG: number) => {
      const clampedG = Math.max(0, Math.min(255, Math.round(newG)));
      const rgb = rgbValues.value;
      const hsv = rgbToHsv(rgb.r, clampedG, rgb.b, rgb.a);
      color.value = hsv;
    },
  });

  const rgbB = computed({
    get: () => rgbValues.value.b,
    set: (newB: number) => {
      const clampedB = Math.max(0, Math.min(255, Math.round(newB)));
      const rgb = rgbValues.value;
      const hsv = rgbToHsv(rgb.r, rgb.g, clampedB, rgb.a);
      color.value = hsv;
    },
  });

  const exportColor = computed(() => {
    const rgb = rgbValues.value;
    const hsl = hslValues.value;

    if (colorMode.value === "rgb") {
      if (color.value.a === 1) {
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      } else {
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a.toFixed(2)})`;
      }
    } else if (colorMode.value === "hsl") {
      if (color.value.a === 1) {
        return `hsl(${Math.round(hsl.h)}, ${Math.round(
          hsl.s * 100
        )}%, ${Math.round(hsl.l * 100)}%)`;
      } else {
        return `hsla(${Math.round(hsl.h)}, ${Math.round(
          hsl.s * 100
        )}%, ${Math.round(hsl.l * 100)}%, ${hsl.a.toFixed(2)})`;
      }
    }

    // Hex mode
    return rgbToHex(rgb.r, rgb.g, rgb.b, rgb.a);
  });

  function randomColorGenerator() {
    color.value = randomColor();
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
    // HSL channels
    hslH,
    hslS,
    hslL,
    // RGB channels
    rgbR,
    rgbG,
    rgbB,
    exportColor,
    randomColor: randomColorGenerator,
  };
};

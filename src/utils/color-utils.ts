// Import your existing utility functions
function hexToHsl(hex: string): [number, number, number] {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((x) => x + x)
      .join("");
  }
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    Math.round(
      255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))
    );
  return `#${((1 << 24) + (f(0) << 16) + (f(8) << 8) + f(4))
    .toString(16)
    .slice(1)}`;
}

// Helper function to normalize hue to 0-360 range
function normalizeHue(hue: number): number {
  return ((hue % 360) + 360) % 360;
}

// Helper function to parse any color format to HSL
function parseColorToHSL(color: string): [number, number, number] {
  if (color.startsWith("#")) {
    return hexToHsl(color);
  } else if (color.startsWith("rgb")) {
    const [r, g, b] = color.match(/\d+/g)!.map(Number);
    const hex =
      "#" +
      ((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .padStart(6, "0");
    return hexToHsl(hex);
  } else if (color.startsWith("hsl")) {
    return color.match(/[\d.]+/g)!.map(Number) as [number, number, number];
  } else {
    throw new Error("Unsupported color format");
  }
}

// Helper function to format color output
function formatColor(
  h: number,
  s: number,
  l: number,
  format: "hex" | "hsl" | "rgb"
): string {
  if (format === "hex") {
    return hslToHex(h, s, l);
  } else if (format === "hsl") {
    return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
  } else {
    const hex = hslToHex(h, s, l);
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

export interface ColorHarmony {
  mono: string[];
  complementary: string[];
  triadic: string[];
  analogous: string[];
}

export function generateColorScale(
  color: string,
  format: "hex" | "hsl" | "rgb" = "hex"
): string[] {
  let h: number, s: number, l: number;
  let originalHex: string;

  if (color.startsWith("#")) {
    [h, s, l] = hexToHsl(color);
    originalHex = color;
  } else if (color.startsWith("rgb")) {
    const [r, g, b] = color.match(/\d+/g)!.map(Number);
    originalHex =
      "#" +
      ((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .padStart(6, "0");
    [h, s, l] = hexToHsl(originalHex);
  } else if (color.startsWith("hsl")) {
    [h, s, l] = color.match(/[\d.]+/g)!.map(Number);
    originalHex = hslToHex(h, s, l);
  } else {
    throw new Error("Unsupported color format");
  }

  // Avoid pure white/black → keep within 5%–95%
  const minL = 5;
  const maxL = 95;
  const steps = 9; // leave room to insert original color later

  const range: { hex: string; l: number }[] = [];
  for (let i = 0; i < steps; i++) {
    let newL = minL + (i / (steps - 1)) * (maxL - minL);
    const hex = hslToHex(h, s, newL);
    range.push({ hex, l: newL });
  }

  // Add exact original color
  range.push({ hex: originalHex, l });

  // Sort lightest → darkest
  range.sort((a, b) => a.l - b.l);

  // Ensure we only return 10 total colors
  const unique = Array.from(new Map(range.map((c) => [c.hex, c])).values());
  const finalRange = unique.slice(0, 10);

  if (format === "hex") {
    return finalRange.map((c) => c.hex);
  } else if (format === "hsl") {
    return finalRange.map(
      (c) => `hsl(${h.toFixed(0)}, ${s.toFixed(0)}%, ${c.l.toFixed(0)}%)`
    );
  } else {
    // hex → rgb
    return finalRange.map((c) => {
      const hex = c.hex.replace(/^#/, "");
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgb(${r}, ${g}, ${b})`;
    });
  }
}

export function getContrastColor(hex: string): string {
  const c = hex.replace(/^#/, "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 125 ? "black" : "white";
}

/**
 * Generates monochromatic colors by varying saturation and lightness
 */
function generateMonochromatic(
  h: number,
  s: number,
  l: number,
  format: "hex" | "hsl" | "rgb"
): string[] {
  const colors: string[] = [];

  // Generate variations by adjusting saturation and lightness
  const variations = [
    { s: Math.max(5, s - 40), l: Math.min(95, l + 30) }, // Light, desaturated
    { s: Math.max(15, s - 20), l: Math.min(90, l + 20) }, // Light
    { s: Math.max(20, s - 10), l: Math.min(80, l + 10) }, // Slightly light
    { s, l }, // Original color
    { s: Math.min(100, s + 10), l: Math.max(20, l - 10) }, // Slightly dark
    { s: Math.min(100, s + 20), l: Math.max(15, l - 20) }, // Dark
    { s: Math.min(100, s + 30), l: Math.max(10, l - 30) }, // Very dark
  ];

  variations.forEach(({ s: newS, l: newL }) => {
    colors.push(formatColor(h, newS, newL, format));
  });

  return colors;
}

/**
 * Generates complementary color scheme (opposite on color wheel)
 */
function generateComplementary(
  h: number,
  s: number,
  l: number,
  format: "hex" | "hsl" | "rgb"
): string[] {
  const colors: string[] = [];
  const compHue = normalizeHue(h + 180);

  // Original color variations
  colors.push(
    formatColor(h, Math.max(20, s - 20), Math.min(85, l + 15), format)
  );
  colors.push(formatColor(h, s, l, format)); // Original
  colors.push(
    formatColor(h, Math.min(100, s + 15), Math.max(25, l - 15), format)
  );

  // Complementary color variations
  colors.push(
    formatColor(compHue, Math.max(20, s - 20), Math.min(85, l + 15), format)
  );
  colors.push(formatColor(compHue, s, l, format));
  colors.push(
    formatColor(compHue, Math.min(100, s + 15), Math.max(25, l - 15), format)
  );

  return colors;
}

/**
 * Generates triadic color scheme (120° apart on color wheel)
 */
function generateTriadic(
  h: number,
  s: number,
  l: number,
  format: "hex" | "hsl" | "rgb"
): string[] {
  const colors: string[] = [];
  const hue2 = normalizeHue(h + 120);
  const hue3 = normalizeHue(h + 240);

  // First color (original)
  colors.push(
    formatColor(h, Math.max(30, s - 10), Math.min(80, l + 10), format)
  );
  colors.push(formatColor(h, s, l, format));

  // Second color
  colors.push(
    formatColor(hue2, Math.max(30, s - 10), Math.min(80, l + 10), format)
  );
  colors.push(formatColor(hue2, s, l, format));

  // Third color
  colors.push(
    formatColor(hue3, Math.max(30, s - 10), Math.min(80, l + 10), format)
  );
  colors.push(formatColor(hue3, s, l, format));

  return colors;
}

/**
 * Generates analogous color scheme (adjacent colors on color wheel)
 */
function generateAnalogous(
  h: number,
  s: number,
  l: number,
  format: "hex" | "hsl" | "rgb"
): string[] {
  const colors: string[] = [];

  // Generate colors 30° apart
  const hues = [
    normalizeHue(h - 60), // -60°
    normalizeHue(h - 30), // -30°
    h, // Original
    normalizeHue(h + 30), // +30°
    normalizeHue(h + 60), // +60°
  ];

  hues.forEach((hue, index) => {
    // Vary saturation and lightness slightly for each color
    const satVariation = (index - 2) * 5; // -10, -5, 0, 5, 10
    const lightVariation = (index - 2) * -3; // 6, 3, 0, -3, -6

    const newS = Math.max(20, Math.min(100, s + satVariation));
    const newL = Math.max(15, Math.min(85, l + lightVariation));

    colors.push(formatColor(hue, newS, newL, format));
  });

  return colors;
}

/**
 * Main function that generates all color harmony types
 * @param color - Input color in hex, hsl, or rgb format
 * @param format - Output format (hex, hsl, or rgb)
 * @returns Object containing arrays of colors for each harmony type
 */
export function generateColorHarmonies(
  color: string,
  format: "hex" | "hsl" | "rgb" = "hex"
): ColorHarmony {
  const [h, s, l] = parseColorToHSL(color);

  return {
    mono: generateMonochromatic(h, s, l, format),
    complementary: generateComplementary(h, s, l, format),
    triadic: generateTriadic(h, s, l, format),
    analogous: generateAnalogous(h, s, l, format),
  };
}

/**
 * Generate a specific color harmony type
 * @param color - Input color in hex, hsl, or rgb format
 * @param type - Type of harmony to generate
 * @param format - Output format (hex, hsl, or rgb)
 * @returns Array of colors for the specified harmony type
 */
export function generateColorHarmony(
  color: string,
  type: "mono" | "complementary" | "triadic" | "analogous",
  format: "hex" | "hsl" | "rgb" = "hex"
): string[] {
  const [h, s, l] = parseColorToHSL(color);

  switch (type) {
    case "mono":
      return generateMonochromatic(h, s, l, format);
    case "complementary":
      return generateComplementary(h, s, l, format);
    case "triadic":
      return generateTriadic(h, s, l, format);
    case "analogous":
      return generateAnalogous(h, s, l, format);
    default:
      throw new Error("Invalid harmony type");
  }
}

/**
 * Generate a color palette with a primary color and supporting harmonies
 * @param color - Input color in hex, hsl, or rgb format
 * @param format - Output format (hex, hsl, or rgb)
 * @returns Curated palette with primary, secondary, and accent colors
 */
export function generateColorPalette(
  color: string,
  format: "hex" | "hsl" | "rgb" = "hex"
): {
  primary: string[];
  secondary: string[];
  accents: string[];
} {
  const [h, s, l] = parseColorToHSL(color);

  // Primary: monochromatic variations of the main color
  const primary = [
    formatColor(h, Math.max(20, s - 15), Math.min(90, l + 20), format), // Light
    formatColor(h, s, l, format), // Original
    formatColor(h, Math.min(100, s + 10), Math.max(20, l - 20), format), // Dark
  ];

  // Secondary: analogous colors
  const secondary = [
    formatColor(normalizeHue(h - 30), Math.max(30, s - 10), l, format),
    formatColor(normalizeHue(h + 30), Math.max(30, s - 10), l, format),
  ];

  // Accents: complementary and triadic
  const accents = [
    formatColor(normalizeHue(h + 180), s, l, format), // Complementary
    formatColor(normalizeHue(h + 120), Math.max(40, s - 5), l, format), // Triadic 1
    formatColor(normalizeHue(h + 240), Math.max(40, s - 5), l, format), // Triadic 2
  ];

  return {
    primary,
    secondary,
    accents,
  };
}

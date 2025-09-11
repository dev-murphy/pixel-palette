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

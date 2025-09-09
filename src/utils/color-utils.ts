// -------------------------
// Basic Conversions
// -------------------------
export function hsvToRgb(h: number, s: number, v: number) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r, g, b;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

export function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")
  ).toUpperCase();
}

export function hexToRgb(hex: string) {
  hex = hex.replace("#", "");
  if (hex.length === 3)
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

export function rgbToHsl(r: number, g: number, b: number) {
  const rN = r / 255,
    gN = g / 255,
    bN = b / 255;
  const max = Math.max(rN, gN, bN);
  const min = Math.min(rN, gN, bN);
  const l = (max + min) / 2;
  let h: number = 0,
    s: number = 0;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case rN:
        h = (gN - bN) / d + (gN < bN ? 6 : 0);
        break;
      case gN:
        h = (bN - rN) / d + 2;
        break;
      case bN:
        h = (rN - gN) / d + 4;
        break;
    }
    h *= 60;
  }

  return {
    h: Math.round(h),
    s: +(s * 100).toFixed(1),
    l: +(l * 100).toFixed(1),
  };
}

// -------------------------
// Advanced: XYZ, Lab, LCH
// -------------------------
function _toLinearRGB(c: number) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function rgbToXyz(r: number, g: number, b: number) {
  const rN = _toLinearRGB(r / 255);
  const gN = _toLinearRGB(g / 255);
  const bN = _toLinearRGB(b / 255);

  return {
    x: rN * 0.4124564 + gN * 0.3575761 + bN * 0.1804375,
    y: rN * 0.2126729 + gN * 0.7151522 + bN * 0.072175,
    z: rN * 0.0193339 + gN * 0.119192 + bN * 0.9503041,
  };
}

export function rgbToLab(r: number, g: number, b: number) {
  const { x, y, z } = rgbToXyz(r, g, b);
  const refX = 0.95047,
    refY = 1.0,
    refZ = 1.08883;

  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);

  const fx = f(x / refX);
  const fy = f(y / refY);
  const fz = f(z / refZ);

  return {
    l: +(116 * fy - 16).toFixed(2),
    a: +(500 * (fx - fy)).toFixed(2),
    b: +(200 * (fy - fz)).toFixed(2),
  };
}

export function rgbToLch(r: number, g: number, b: number) {
  const { l, a, b: labB } = rgbToLab(r, g, b);
  const c = Math.sqrt(a * a + labB * labB);
  let h = (Math.atan2(labB, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { l, c: +c.toFixed(2), h: +h.toFixed(2) };
}

export function rgbToHsv(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : d / max;
  return { h, s, v: max };
}

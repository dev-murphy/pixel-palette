export type ColorMap = {
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  hex: { hex: string };
};

export type ColorMode = keyof ColorMap;
export type Color<T extends keyof ColorMap> = ColorMap[T];

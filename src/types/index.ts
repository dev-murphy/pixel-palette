export type ColorMap = {
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  hex: { hex: string };
};

export type ColorMode = keyof ColorMap;

// Prop Types
export interface ColorPickerProps {
  title?: string;
  initialColor?: string;
  colorMode?: ColorMode;
  showAlpha?: boolean;
}

// Emit types
export interface ColorPickerEmits {
  (e: "set-color", color: string): void;
  (e: "set-color-mode", colorMode: ColorMode): void;
}

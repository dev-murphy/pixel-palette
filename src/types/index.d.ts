import type { DefineComponent } from "vue";

// Export the props interface so users can import it
export interface ColorPickerProps {
  title?: string;
  initialColor?: string;
  colorMode?: "hex" | "rgb" | "hsl";
  showAlpha?: boolean;
}

export type ColorPickerComponent = DefineComponent<ColorPickerProps>;

declare const ColorPicker: ColorPickerComponent;
export default ColorPicker;

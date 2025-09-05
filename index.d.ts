import { DefineComponent } from "vue";

interface ColorPickerProps {
  title?: string;
  initialColor?: string;
  colorMode?: "hex" | "rgb" | "hsl";
  showAlpha?: boolean;
}

type ColorPickerEmits = {
  "set-color": (value: string) => void;
};

declare const ColorPicker: DefineComponent<
  ColorPickerProps,
  {},
  {},
  {},
  {},
  {},
  {},
  ColorPickerEmits
>;

export default ColorPicker;

declare module "pixel-palette" {
  import { DefineComponent } from "vue";

  interface ColorPickerProps {
    title?: string;
    initialColor?: string;
    colorMode?: "hex" | "rgb" | "hsl";
    showAlpha?: boolean;
  }

  const ColorPicker: DefineComponent<ColorPickerProps>;

  export default ColorPicker;
}

declare module "pixel-palette" {
  import { DefineComponent } from "vue";

  // Define the props interface
  interface ColorPickerProps {
    title?: string;
    initialColor?: string;
    colorMode?: "hex" | "rgb" | "hsl";
    showAlpha?: boolean;
  }

  // Define the emits interface
  interface ColorPickerEmits {
    (e: "set-color", color: string): void;
  }

  // Define the component type
  const ColorPicker: DefineComponent<
    ColorPickerProps,
    {},
    {},
    {},
    {},
    {},
    {},
    ColorPickerEmits
  >;

  export default PixelPalette;
}

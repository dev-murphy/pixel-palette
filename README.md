# Pixel Palette

A modern, customizable color picker component for Vue 3.

## Features

- 🎨 Interactive color space and hue slider
- 🔢 Multiple color formats (HEX, RGB, HSL)
- 🎯 EyeDropper API support (where available)
- 🎲 Random color generator
- 📋 Copy to clipboard with tooltip feedback
- 🎛️ Alpha channel support
- 📱 Responsive design

## Installation

```bash
npm install pixel-palette
# or
pnpm add pixel-palette
# or
yarn add pixel-palette
```

## Usage

### Basic Usage

```vue
<template>
  <ColorPicker @set-color="handleColorChange" />
</template>

<script setup>
import { ColorPicker } from "pixel-palette";
import "pixel-palette/style.css";

function handleColorChange(color) {
  console.log("Selected color:", color);
}
</script>
```

### With Props

```vue
<template>
  <ColorPicker
    title="Primary Color"
    :initial-color="'hsla(210, 100%, 50%, 0.8)'"
    color-mode="hex"
    :show-alpha="trye"
    @set-color="updateColor"
  />
</template>

<script setup>
import { ColorPicker } from "pixel-palette";
import "pixel-palette/style.css";

const updateColor = (color) => {
  // color will be in the current format (HEX, RGB, or HSL)
  console.log("New color:", color);
};
</script>
```

## Props

| Prop           | Type                    | Default               | Description                         |
| -------------- | ----------------------- | --------------------- | ----------------------------------- |
| `title`        | `string`                | -                     | Optional title displayed at the top |
| `initialColor` | `string`                | `"hsl(0, 100%, 50%)"` | Initial color value                 |
| `colorMode`    | `hex` or `rgb` or `hsl` | `hex`               | Initial color mode value            |
| `showAlpha`    | `boolean`               | false                 | Option to show alpha channel        |

## Events

| Event       | Payload  | Description                |
| ----------- | -------- | -------------------------- |
| `set-color` | `string` | Emitted when color changes |

## Browser Support

- Modern browsers with Vue 3 support
- EyeDropper API requires Chrome 95+ or Edge 95+
- Requires secure context (HTTPS) for EyeDropper

## License

[MIT](/LICENSE)

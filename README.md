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
- 🎨 Tailwind CSS styling

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
  <ColorPicker
    title="Choose Color"
    :initialColor="'hsl(210, 100%, 50%)'"
    @set-color="handleColorChange"
  />
</template>

<script setup>
import { ColorPicker } from "pixel-palette";
import "pixel-palette/style";

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
    :initialColor="'hsla(210, 100%, 50%, 0.8)'"
    @set-color="updateColor"
  />
</template>

<script setup>
import { ColorPicker } from "pixel-palette";

const updateColor = (color) => {
  // color will be in the current format (HEX, RGB, or HSL)
  console.log("New color:", color);
};
</script>
```

## Props

| Prop           | Type     | Default               | Description                         |
| -------------- | -------- | --------------------- | ----------------------------------- |
| `title`        | `string` | -                     | Optional title displayed at the top |
| `initialColor` | `string` | `"hsl(0, 100%, 50%)"` | Initial color value                 |

## Events

| Event       | Payload  | Description                |
| ----------- | -------- | -------------------------- |
| `set-color` | `string` | Emitted when color changes |

## Browser Support

- Modern browsers with Vue 3 support
- EyeDropper API requires Chrome 95+ or Edge 95+
- Requires secure context (HTTPS) for EyeDropper

## License

MIT

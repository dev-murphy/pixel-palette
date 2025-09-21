# Pixel Palette

[![codecov](https://codecov.io/github/dev-murphy/pixel-palette/graph/badge.svg?token=2AYYX2K3KD)](https://codecov.io/github/dev-murphy/pixel-palette) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/pixel-palette.svg)](https://badge.fury.io/js/pixel-palette)

A modern, customizable color picker component for Vue 3.

## Live Demo

You can view a [live demo](https://dev-murphy.github.io/pixel-palette/) of the color picker.

## Features

- 🎨 Interactive color space and hue slider
- 🔢 Multiple color formats (HEX, RGB, HSL)
- 🎯 EyeDropper API support (where available)
- 🎲 Random color generator
- 📋 Copy to clipboard with tooltip feedback
- 🎛️ Alpha channel support
- 📱 Responsive design
- 🌗 Dark/Light Mode

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
    :enable-alpha="true"
    :open-alpha-by-default="false"
    :dark-mode="false"
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

| Prop                 | Type                    | Default               | Description                         |
| -------------------- | ----------------------- | --------------------- | ----------------------------------- |
| `title`              | `string`                | -                     | Optional title displayed at the top |
| `initialColor`       | `string`                | `"hsl(0, 100%, 50%)"` | Initial color value                 |
| `colorMode`          | `hex` or `rgb` or `hsl` | `hex`                 | Initial color mode value            |
| `enableAlpha`        | `boolean`               | true                  | Option to enable alpha channel      |
| `openAlphaByDefault` | `boolean`               | false                 | Option to show/hide alpha channel   |
| `darkMode`           | `boolean`               | false                 | Option to show dark mode            |

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

# Changelog

## [1.3.1](https://github.com/dev-murphy/pixel-palette/compare/v1.3.0...v1.3.1) (2025-09-05)


### Miscellaneous

* update package with new type defs and css path ([8087f0c](https://github.com/dev-murphy/pixel-palette/commit/8087f0c378c44c29a8659da768361ed71a091568))
* update style location in example app ([d0fcb77](https://github.com/dev-murphy/pixel-palette/commit/d0fcb7794a5e8f254c0a4561e4da0429ed86cede))


### Documentation

* update README to reflect new locations for styles ([5dc6202](https://github.com/dev-murphy/pixel-palette/commit/5dc6202253dfe8e64b60c9e82bb15f0a485ac149))


### UI Updates

* fix border and text color issues ([9c11a72](https://github.com/dev-murphy/pixel-palette/commit/9c11a7223f655c6f84c1d13da982ee4f31083cd4))

## [1.3.0](https://github.com/dev-murphy/pixel-palette/compare/v1.2.0...v1.3.0) (2025-09-05)


### Features

* create useColors composable to maintain one source of truth ([b1a25e4](https://github.com/dev-murphy/pixel-palette/commit/b1a25e4a8641897ce7297829c1433f4b0389b3c3))


### Miscellaneous

* remove type def import for entry file ([f6aba29](https://github.com/dev-murphy/pixel-palette/commit/f6aba29c3f700aeced0074db5f8369d6681c59f1))
* remove unused code from useDraggable composable ([d7ae4db](https://github.com/dev-murphy/pixel-palette/commit/d7ae4dbe75eafc563967d9a34d2226606dc86be3))
* remove unused type defs ([848ff7a](https://github.com/dev-murphy/pixel-palette/commit/848ff7a87fe9a368478cacd330a497b3f886f2f8))
* update deps in example app ([72c13ad](https://github.com/dev-murphy/pixel-palette/commit/72c13ad1dc4f7e647d1e035092317843f832b82e))
* update package-lock.json for example app ([2e1d7c1](https://github.com/dev-murphy/pixel-palette/commit/2e1d7c1b8f0b98863ae4f774a236b2d479cb433b))
* update package.json, remove tailwindcss deps ([2c07c2a](https://github.com/dev-murphy/pixel-palette/commit/2c07c2a9fe3d932a593eb87e235d376895c07eb6))


### Documentation

* update README to remove tailwindcss feature, refactor usage section ([6ca407a](https://github.com/dev-murphy/pixel-palette/commit/6ca407a7846e8e0f320a07da2f736d628046c38f))


### Code Refactors

* made offset and element reactive and update useDraggable to handle those reactive options ([bdbdf6b](https://github.com/dev-murphy/pixel-palette/commit/bdbdf6bdec17d309dd92af844d0bdba6b05ac476))
* replace props and emits with useColors composable ([b238b40](https://github.com/dev-murphy/pixel-palette/commit/b238b4050bd2046c9f07c3080838e70da7519520))
* replace props and emits with useColors composable and make element size and offset reactive values ([ef222e8](https://github.com/dev-murphy/pixel-palette/commit/ef222e84bbe2eab8c1b822ecc07bae88007ab799))


### UI Updates

* replace all tailwindcss with regular css ([6b2ad4f](https://github.com/dev-murphy/pixel-palette/commit/6b2ad4fa2fe93532992efe5e2a1843220e3edb06))

## [1.2.0](https://github.com/dev-murphy/pixel-palette/compare/v1.1.0...v1.2.0) (2025-09-04)


### Features

* move core picker component to a new component, and make button to open picker component ([2bf14dd](https://github.com/dev-murphy/pixel-palette/commit/2bf14ddffdca9939d0531c0b4512f70068e69f35))


### Miscellaneous

* create useCLickOutside composable ([a8ac295](https://github.com/dev-murphy/pixel-palette/commit/a8ac2951ab18c8948ffd3f3562ffa50ef9ea32a7))
* started adding props and emits type defs ([edacf55](https://github.com/dev-murphy/pixel-palette/commit/edacf551e524282e8b61f4d8bc83e9d1cf8c0413))


### Code Refactors

* create a component to accurate show current color ([8ad57b2](https://github.com/dev-murphy/pixel-palette/commit/8ad57b2f98cf4398164008a39cfc5f5ed7b2a1fc))
* move copy and tooltip into their own util and component respectively ([62a235c](https://github.com/dev-murphy/pixel-palette/commit/62a235caef058aa20ee640c1c9d3ba1780919e47))
* remove debounce and trigger color update on input blur ([a66dedb](https://github.com/dev-murphy/pixel-palette/commit/a66dedb0ad2b998d13a27d6c3d8c32bd4fa2f8ec))


### UI Updates

* reduce height of hue and alpha sliders ([a33754b](https://github.com/dev-murphy/pixel-palette/commit/a33754b08209f4aaa9ba1d2595af5c353fa92a4d))

## [1.1.0](https://github.com/dev-murphy/pixel-palette/compare/v1.0.0...v1.1.0) (2025-09-03)


### Features

* update config to make pixel palette lib ([8eb511e](https://github.com/dev-murphy/pixel-palette/commit/8eb511e6e702bc15f2e79b5027623eec9a6268b0))


### Miscellaneous

* add example app ([5963f85](https://github.com/dev-murphy/pixel-palette/commit/5963f850d4d2a01f5968cd30d6922f5e9a02e5e5))
* add MIT license ([071dab3](https://github.com/dev-murphy/pixel-palette/commit/071dab338cd42ed47431dfa1510ad4c00cd9b29a))
* move all scoped to global styles file ([f1af299](https://github.com/dev-murphy/pixel-palette/commit/f1af299035368912aa9091fb666c73be2e127e41))
* remove usused files ([16bc2ba](https://github.com/dev-murphy/pixel-palette/commit/16bc2ba3d7f9be0366e8fa8aa7f39b80e824a2e5))
* update package with project info ([2e1365c](https://github.com/dev-murphy/pixel-palette/commit/2e1365c36869af275d2f1da86e45c9ea812db7df))


### Documentation

* update README.md ([2f7bc56](https://github.com/dev-murphy/pixel-palette/commit/2f7bc56024c8537fc77d2c7b81da58ee80a3df55))


### Code Refactors

* remove unnecessary heading ([cb9b870](https://github.com/dev-murphy/pixel-palette/commit/cb9b8705613f7b4bb43d3967230c88e4242fb7ad))

## 1.0.0 (2025-09-03)


### Features

* add copy, picker, random and switch icon component ([1075dad](https://github.com/dev-murphy/pixel-palette/commit/1075dad237d48ad7cba3a12b5efc9d6d5e288dcf))
* add tailwindcss to app ([a0873fe](https://github.com/dev-murphy/pixel-palette/commit/a0873fe908070df860a2a54a00a1c196441863a9))
* create color inputs with hex and color channel functionality ([9ef9858](https://github.com/dev-murphy/pixel-palette/commit/9ef9858a9d7ec2e9341b834b635810aff1a68886))
* create color picker component and add to app component ([667b412](https://github.com/dev-murphy/pixel-palette/commit/667b41249e6e1eb127fe0801aacf9d0e2bb97a74))
* create color space component ([f0fdfe9](https://github.com/dev-murphy/pixel-palette/commit/f0fdfe9df394269ba677cfb406b6f763a64dd372))
* create hue and alpha slider component ([cdbdc16](https://github.com/dev-murphy/pixel-palette/commit/cdbdc16406e730a0b836f9ecf54e28e400d32e4f))
* create use draggable composable and type defs ([4e7d4b2](https://github.com/dev-murphy/pixel-palette/commit/4e7d4b2db67f39a4e5c636ab80693e6333693c63))
* initial commit ([9be8345](https://github.com/dev-murphy/pixel-palette/commit/9be8345bbc4e88fcea618fbfff625f2fb50e6d01))


### Miscellaneous

* add tailwindcss style import ([bf941f5](https://github.com/dev-murphy/pixel-palette/commit/bf941f50247aaa83f656b03992b993676fff4569))
* delete vue svg ([13e74ba](https://github.com/dev-murphy/pixel-palette/commit/13e74ba9784f2e24abcd0ad51d8bca528aeadddc))
* install tinycolor2 deps ([4d2cb64](https://github.com/dev-murphy/pixel-palette/commit/4d2cb648784351988a08cc3a82205ca76939bef2))
* remove boilerplate code ([3466e4c](https://github.com/dev-murphy/pixel-palette/commit/3466e4c1a0f544a7e62718c78c6b872c424a2f75))


### Documentation

* add project name and description ([2912c9d](https://github.com/dev-murphy/pixel-palette/commit/2912c9dabc488c8e0333de645f86e80e7e3d906d))


### CI/CD

* create release action ([58deab8](https://github.com/dev-murphy/pixel-palette/commit/58deab88d3536aaab622eadffc57cd130cdfa7fa))

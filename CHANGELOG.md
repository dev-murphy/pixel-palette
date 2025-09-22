# Changelog

## [1.7.3](https://github.com/dev-murphy/pixel-palette/compare/v1.7.2...v1.7.3) (2025-09-22)


### Bug Fixes

* add pattern to ignore playwright test for vitest ([6b2402c](https://github.com/dev-murphy/pixel-palette/commit/6b2402c86833cda95bcd53dbf8cd97d22c73e4e8))
* add production url for e2e tests ([9c2ae27](https://github.com/dev-murphy/pixel-palette/commit/9c2ae2735d810ac251472e456560af139f29aa53))


### Miscellaneous

* add playwright test and configs to app ([4597aa1](https://github.com/dev-murphy/pixel-palette/commit/4597aa1e822136cf762d86fdbdc79a44d0d129a5))
* add props for playwright tests ([6c89d52](https://github.com/dev-murphy/pixel-palette/commit/6c89d5216853acbf9e043e73d0efd5daaa7fbac7))


### Documentation

* update npm badge on README ([6fcdde2](https://github.com/dev-murphy/pixel-palette/commit/6fcdde21581cf177f7c7422736fafaf774a0f730))


### Code Refactors

* remove comments from playwright config ([61ff319](https://github.com/dev-murphy/pixel-palette/commit/61ff319143e0bbd206e0c8efe3ca5b7c72252c98))


### CI/CD

* create github action to release package on release creation ([bac19b7](https://github.com/dev-murphy/pixel-palette/commit/bac19b7821733c1414cae187330fe9fdd508132c))


### UI Updates

* fix global styles to fix issues ([6ca6429](https://github.com/dev-murphy/pixel-palette/commit/6ca6429f0a4f488881f8b6807796805060ab1668))

## [1.7.2](https://github.com/dev-murphy/pixel-palette/compare/v1.7.1...v1.7.2) (2025-09-21)


### Bug Fixes

* resolve coverage issue ([e7ae890](https://github.com/dev-murphy/pixel-palette/commit/e7ae89077f53e406d3dc82633eb6b7f043f0ef65))


### Miscellaneous

* add unit tests for composables and util functions ([a268121](https://github.com/dev-murphy/pixel-palette/commit/a268121c8b83c311a748ca97f9ad240ad88f4426))
* update vitest config and remove node part from test action ([23e2fdc](https://github.com/dev-murphy/pixel-palette/commit/23e2fdc4842e083cf45e731e5f05ebc86272c6fc))


### Documentation

* add badges to README ([b652d42](https://github.com/dev-murphy/pixel-palette/commit/b652d42b04eca65ec93a7c34e357be11484ef24a))
* add build badge to README ([e34826c](https://github.com/dev-murphy/pixel-palette/commit/e34826c3d23a75bbb51f6a8b726236cefd598a01))
* add warning and migration guide ([1170695](https://github.com/dev-murphy/pixel-palette/commit/11706953e2a319448862317a02d76932a9d78120))
* correct typo error in README ([d7f6e6c](https://github.com/dev-murphy/pixel-palette/commit/d7f6e6ca8f4a0daa324204a41e38a4ee5d5f9577))
* refactor build badge ([9994ba0](https://github.com/dev-murphy/pixel-palette/commit/9994ba0ae94eed5f8396f5c82d9a3d4b4250dd36))


### CI/CD

* add test action ([d303c0e](https://github.com/dev-murphy/pixel-palette/commit/d303c0e5a69c369508fb3537bf7b53385ed0f36a))


### UI Updates

* use AI to reduce the css code ([3a79560](https://github.com/dev-murphy/pixel-palette/commit/3a79560e87c4296317583ff6e7f3565f6362f980))

## [1.7.1](https://github.com/dev-murphy/pixel-palette/compare/v1.7.0...v1.7.1) (2025-09-21)


### Bug Fixes

* ensure library is built first in pipeline ([1c244e9](https://github.com/dev-murphy/pixel-palette/commit/1c244e9055e5f383c8d777366025e34f82381c2d))
* re-add base repo name to vite config ([9512027](https://github.com/dev-murphy/pixel-palette/commit/951202724f0ee8aba6d1ce68bb2149be642e8f75))


### Miscellaneous

* add libCssInject to vite config ([6f24c03](https://github.com/dev-murphy/pixel-palette/commit/6f24c03e41288d2479bccf904b15112d2737edb1))
* make alpha only 2 digits ([505906c](https://github.com/dev-murphy/pixel-palette/commit/505906cae9edc615e7a64a8eb95f7065d3dd5f83))
* reinstall pixel palette ([18a2f02](https://github.com/dev-murphy/pixel-palette/commit/18a2f0277e1849bf6f7269106c53f8bcf299edd5))
* remove css import from README and demo app ([d0c1804](https://github.com/dev-murphy/pixel-palette/commit/d0c1804fb3573dbfdd2b6b7b7cf5e44a579450d4))
* remove imported styles as it not necessary ([65726e1](https://github.com/dev-murphy/pixel-palette/commit/65726e13f9d130322cdd4ea756b6c0b43056fed1))
* remove unused component ([e539a56](https://github.com/dev-murphy/pixel-palette/commit/e539a56fd768fcd0e2c5567208747cb28eac75b2))
* update color input related components ([8a30b56](https://github.com/dev-murphy/pixel-palette/commit/8a30b56c5ea6db442bdd8132c7b2fdac4c0a92b5))


### Documentation

* ignore pnpm-workspace for demo app ([e1b700b](https://github.com/dev-murphy/pixel-palette/commit/e1b700b2b3e9385441e25351a2b7cb3d02d5880b))


### Code Refactors

* install vite-plugin-lib-inject-css and remove css values from package json ([c81c47d](https://github.com/dev-murphy/pixel-palette/commit/c81c47dbf94d4b0c011942f96abc21a38f075192))
* made the demo app a typesecript vue app ([0dedeba](https://github.com/dev-murphy/pixel-palette/commit/0dedebac86e387c3a1347a587cfc2e0a8cec3a75))
* remove color shades util functions ([0adb4c6](https://github.com/dev-murphy/pixel-palette/commit/0adb4c6b2945790171f20d4ec2a454aef1a00382))
* remove scoped css and placed them in global css file ([5c9219f](https://github.com/dev-murphy/pixel-palette/commit/5c9219f8c6a22b2df4c7676cc3621e48f5ae1fa5))
* remove select component and replace with toggle section ([ce0cce5](https://github.com/dev-murphy/pixel-palette/commit/ce0cce54d23dbb45a261125a45f58d089dfa224b))
* update generated type-defs with unplugin-dts ([8e4efaf](https://github.com/dev-murphy/pixel-palette/commit/8e4efaf94e392cf28405a73368d870b9265333f9))
* update slider and color space components by removing comments and styles ([e4b9eb4](https://github.com/dev-murphy/pixel-palette/commit/e4b9eb450930287fded1bed81d82a5e79dd10e3c))


### CI/CD

* add local packge deps for demo app ([d6ea3ff](https://github.com/dev-murphy/pixel-palette/commit/d6ea3ff13201b9aadce747d0e45fa960431daf59))


### UI Updates

* add dark mode styles to color picker ([44028e3](https://github.com/dev-murphy/pixel-palette/commit/44028e3d541c9f5944a32cadf5c6f119c188ccf8))
* add text shadow and remove some border radius ([cf07e15](https://github.com/dev-murphy/pixel-palette/commit/cf07e15b04b0caf24bb5f0470ce186484d0937c5))

## [1.7.0](https://github.com/dev-murphy/pixel-palette/compare/v1.6.1...v1.7.0) (2025-09-14)


### Features

* add color swatch to color picker ([9c3cc0f](https://github.com/dev-murphy/pixel-palette/commit/9c3cc0f63c8b6c07ccea27e210ee148eea7d1fbc))
* make the color picker work with touchscreen devices ([5764437](https://github.com/dev-murphy/pixel-palette/commit/5764437e3453993d59fe6ff68a0ca4548b6af856))


### Bug Fixes

* refactor app component to remove ts props ([85f017e](https://github.com/dev-murphy/pixel-palette/commit/85f017e9332069ab1849bb9ed9b08c22b4a0c611))
* refactor switch component to remove errors ([abb9821](https://github.com/dev-murphy/pixel-palette/commit/abb9821571abb27b360ce0f5cb5db317ce9ffec3))
* remove withDefaults from switch component ([ea3ac09](https://github.com/dev-murphy/pixel-palette/commit/ea3ac0946d250eab5a37d80726b6d5296ecd62ba))


### Miscellaneous

* add arrow down and color swatch icons ([fa493db](https://github.com/dev-murphy/pixel-palette/commit/fa493dbd317ce180db3506a90abb8025e5d7fdb4))
* add custom select component and update UI for demo app ([73af597](https://github.com/dev-murphy/pixel-palette/commit/73af597796681bf124fb77a0687ef74b52508219))
* add initial color mode and colors for color swatch ([8274c81](https://github.com/dev-murphy/pixel-palette/commit/8274c81075a301c8b08bacf7277b574b81c01379))
* update pixel-palette deps in package json ([0ff29d1](https://github.com/dev-murphy/pixel-palette/commit/0ff29d1204f4b019c2e846e0c007e1b0e6fcc959))


### Code Refactors

* remove unused css ([9a921bc](https://github.com/dev-murphy/pixel-palette/commit/9a921bc807b84ac251a8509bf744017bf2ad939b))
* update tooltip to show up when clicked ([004df05](https://github.com/dev-murphy/pixel-palette/commit/004df0501fba285cb504d6f35381ac53a264b079))


### UI Updates

* improve UI for install section ([f833a08](https://github.com/dev-murphy/pixel-palette/commit/f833a089775ab9d57a981c01ae2dcaa23f67b7e6))
* increase the height of color scale component ([20318f6](https://github.com/dev-murphy/pixel-palette/commit/20318f64162011323eb6d66edc777ed488640d35))
* make the height for color input consistent ([e29de71](https://github.com/dev-murphy/pixel-palette/commit/e29de711507a3b04b82042c19aa3549bcdd6802f))

## [1.6.1](https://github.com/dev-murphy/pixel-palette/compare/v1.6.0...v1.6.1) (2025-09-13)


### Miscellaneous

* update pixel palette in demo app ([679e503](https://github.com/dev-murphy/pixel-palette/commit/679e503a4449847a0fc2894cce5f671ac852c6a7))


### Documentation

* add demo site to README ([c476900](https://github.com/dev-murphy/pixel-palette/commit/c476900b9caadc1537fad592748a376adc4a541a))

## [1.6.0](https://github.com/dev-murphy/pixel-palette/compare/v1.5.0...v1.6.0) (2025-09-12)


### Features

* update the UI for demo site ([51ba97f](https://github.com/dev-murphy/pixel-palette/commit/51ba97fde5e280d773cc64e2922f45fa137d7fff))


### Bug Fixes

* ensure copy color does not toggle the picker pop up ([944717f](https://github.com/dev-murphy/pixel-palette/commit/944717fe912bbfff10bc708c7e0cc20cfe3190c8))
* more ts stuff from demo app ([672a3fe](https://github.com/dev-murphy/pixel-palette/commit/672a3fee619caf855145f76eb8a94b5c38497734))


### Miscellaneous

* add base to vite config ([e1a232e](https://github.com/dev-murphy/pixel-palette/commit/e1a232e193896e5b27dddcf5fa00e64203851301))


### UI Updates

* fix minor style issues ([f78b5d9](https://github.com/dev-murphy/pixel-palette/commit/f78b5d92728a56f6ee76d1b9ba9923a4c677f9d7))

## [1.5.0](https://github.com/dev-murphy/pixel-palette/compare/v1.4.1...v1.5.0) (2025-09-11)


### Features

* add color select compare component for color comparisons ([6e208fc](https://github.com/dev-murphy/pixel-palette/commit/6e208fccb939f5f6b726e86f813d5a86fb4f160f))
* add props and UI to hide and show alpha channel ([3754e83](https://github.com/dev-murphy/pixel-palette/commit/3754e83f21fb65ee40e22f400feadc7e72c84b44))
* create color scale component ([e0446df](https://github.com/dev-murphy/pixel-palette/commit/e0446df105b01c4b5fcf463e632d21d2f647bfd3))


### Bug Fixes

* correct the toggle typo error ([408344b](https://github.com/dev-murphy/pixel-palette/commit/408344b233b93e25d5325cbe59c230c74371eced))


### Miscellaneous

* add fade in/out animation to color picker ([63882e2](https://github.com/dev-murphy/pixel-palette/commit/63882e23c5eb0eb3330609f2d991315703f43e70))
* add keywords to package json ([3e9b8ad](https://github.com/dev-murphy/pixel-palette/commit/3e9b8ad6ee217f2cb1113de7d99c8ab00b1ba6b7))
* made color picker pop up position itself based on viewport ([98e2b11](https://github.com/dev-murphy/pixel-palette/commit/98e2b11dcad8a53747b4de2506a3f3d4b25836f0))
* remove @types/tinycolor2 deps ([454c7c8](https://github.com/dev-murphy/pixel-palette/commit/454c7c82deb1d8909658807f9d0560aa48309de0))
* remove redundant copy button ([3656474](https://github.com/dev-murphy/pixel-palette/commit/365647466b38365a84a152e451354e4a39529036))
* update project dev dependencies ([fb9d8a9](https://github.com/dev-murphy/pixel-palette/commit/fb9d8a981e458c6b1415d1117be88f2cc5110e58))


### Documentation

* add homepage to package.json ([8d0c571](https://github.com/dev-murphy/pixel-palette/commit/8d0c57199675a5c9e61b34a75e40dc38810c54e4))
* update README with new props for color picker component ([e31a770](https://github.com/dev-murphy/pixel-palette/commit/e31a7705a92a2da6b12fe9b36965c4c3ced04371))


### UI Updates

* improve UI for color picker ([0a8c098](https://github.com/dev-murphy/pixel-palette/commit/0a8c098a6f7582b80d5b0d8eaa03f7681c4d17ac))
* made popup full width ([10f635c](https://github.com/dev-murphy/pixel-palette/commit/10f635c35e0298a5a81451d7b16dad41a39e19e9))

## [1.4.1](https://github.com/dev-murphy/pixel-palette/compare/v1.4.0...v1.4.1) (2025-09-10)


### Bug Fixes

* ensure color inputs are updated when the color changes ([f1da7bc](https://github.com/dev-murphy/pixel-palette/commit/f1da7bc82c9a2da684e014c5a11902084349c846))


### Code Refactors

* added scoped styles ([0f96dfb](https://github.com/dev-murphy/pixel-palette/commit/0f96dfbc61f6e8a768e7a4280a94982c47617265))
* create custom color conversion and remove tinycolor2 deps ([e028b22](https://github.com/dev-murphy/pixel-palette/commit/e028b22a5454ab407576b974ccaa7ae0d3a774ad))


### UI Updates

* adjust the position of tooltip ([f0d96e4](https://github.com/dev-murphy/pixel-palette/commit/f0d96e4918c3c025c63977a3b5b9fa2cbad85380))
* improve the UI for color inputs and color picker button ([f464f6c](https://github.com/dev-murphy/pixel-palette/commit/f464f6c1fe6ee2d171e5adfc3439067c3aaa4127))

## [1.4.0](https://github.com/dev-murphy/pixel-palette/compare/v1.3.6...v1.4.0) (2025-09-10)


### Features

* fix type declaration errors (hopefully) ([9fb7cbc](https://github.com/dev-murphy/pixel-palette/commit/9fb7cbc1bdc17a456b48eac5cd1091d55c120a61))

## [1.3.6](https://github.com/dev-murphy/pixel-palette/compare/v1.3.5...v1.3.6) (2025-09-10)


### Bug Fixes

* **#14:** added declaration file missing ([d7da797](https://github.com/dev-murphy/pixel-palette/commit/d7da7979e2e5d8cde04b0a0eb7add5e9825c09bd))

## [1.3.5](https://github.com/dev-murphy/pixel-palette/compare/v1.3.4...v1.3.5) (2025-09-09)


### Bug Fixes

* add working directory to pnpm steps ([07eb9d3](https://github.com/dev-murphy/pixel-palette/commit/07eb9d3826ee0125a86d5a80523d6b3f4e7a4bcc))
* update exports and type defs for color picker component ([1cc412d](https://github.com/dev-murphy/pixel-palette/commit/1cc412dd7ad0add45cf1f718b93fe7fe17be0d51))


### Miscellaneous

* rename `example` folder to `demo` ([e7d66ce](https://github.com/dev-murphy/pixel-palette/commit/e7d66ce3dc3944d37d455d71577929e7fef464df))
* replace index.js with index.ts file ([034d217](https://github.com/dev-murphy/pixel-palette/commit/034d217a64a5f9a0f00c51036d2da80aa1071543))


### Documentation

* create general issue template ([6523f9e](https://github.com/dev-murphy/pixel-palette/commit/6523f9eba1056fd5c1ae00d8e92d8fd940faa909))


### Code Refactors

* update base url in vite config ([c1e8075](https://github.com/dev-murphy/pixel-palette/commit/c1e80758029a78cdbaebe3dc85aa45c978850868))


### CI/CD

* add demo app to github pages ([e47f1ce](https://github.com/dev-murphy/pixel-palette/commit/e47f1cebb7658c6d979dc21fd50706ace54b682a))

## [1.3.4](https://github.com/dev-murphy/pixel-palette/compare/v1.3.3...v1.3.4) (2025-09-05)


### Code Refactors

* simplified module type def ([d4af0eb](https://github.com/dev-murphy/pixel-palette/commit/d4af0ebe4e32c395327a37de30b1ccad2ee4bd97))

## [1.3.3](https://github.com/dev-murphy/pixel-palette/compare/v1.3.2...v1.3.3) (2025-09-05)


### Bug Fixes

* add `#` symbol to hex code ([661ad4e](https://github.com/dev-murphy/pixel-palette/commit/661ad4e7f114af677e3629c6d346569e228fd335))


### Miscellaneous

* add style compatibility ([287bf3e](https://github.com/dev-murphy/pixel-palette/commit/287bf3e9b4dc19b15c769459b78fe9eb6a9dccff))
* re-install pixel-palette package ([2a5f896](https://github.com/dev-murphy/pixel-palette/commit/2a5f896ef51fecb7367d992b226bf2e7c44907c3))
* update type defs ([76732c6](https://github.com/dev-murphy/pixel-palette/commit/76732c626967355762de5356eb3800420e113acc))


### Documentation

* fix typo error ([dc4fab3](https://github.com/dev-murphy/pixel-palette/commit/dc4fab3f01050164c741774a1be254d0f2e69da1))

## [1.3.2](https://github.com/dev-murphy/pixel-palette/compare/v1.3.1...v1.3.2) (2025-09-05)


### Miscellaneous

* remove all type-related props from package ([7c46c67](https://github.com/dev-murphy/pixel-palette/commit/7c46c67d5df3e0e813325033569e2affe66d8130))

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

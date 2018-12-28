# Quivy changelog

## 2.1.0
- Generate CommonJS, ESM and UMD bundles (fix [#4](https://github.com/VitorLuizC/quivy/issues/4));
- Fix vulnerability on dependencies;
- Use Yarn instead of NPM;

## 2.0.2
- Fix non-stopping animations.

## 2.0.1
- Fix `canvas` can't get elements.

## 2.0.0
- Removed `animation` module due to its side-effects and inability to handle
  multiple animations;

- Added `animate` module. `animate` is a simple function that you pass an
  animation function as paremeter (or add it to returned API) and get a simple
  API to `start()`, `stop()` and handle your `animation` callback;

- Added `canvas` module. `canvas` provide `select` and `create` methods, they
  just get or create a `<canvas>` and return it plus context object.

- Updated and added better README examples;

## 1.0.0
- First implementation with loader and animation modules.

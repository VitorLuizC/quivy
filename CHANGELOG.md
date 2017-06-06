# Quivy changelog

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

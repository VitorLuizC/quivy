/**
 * Animation id.
 * @type {number}
 */
let id = null;

/**
 * An animation loop.
 */
let animation = () => undefined;

/**
 * Polyfills
 */
const request = requestAnimationFrame || webkitRequestAnimationFrame;
const cancel = cancelAnimationFrame || webkitCancelAnimationFrame;

/**
 * Starts drawing animation loop.
 * @param {Function} callback
 */
function start(callback) {
  animation = callback;
  id = requestAnimationFrame(draw);
}

/**
 * Drawing animation loop.
 */
function draw() {
  animation();
  id = requestAnimationFrame(draw);
}

/**
 * Stops drawing animation loop.
 */
function stop() {
  cancelAnimationFrame(id);
}

export { start, stop };

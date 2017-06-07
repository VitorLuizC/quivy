/**
 * <element> or CSS selector to match an <element> on DOM.
 * @typedef {(string|HTMLElement)} Target
 */

/**
 * Abstraction of <canvas> primary properties.
 * @typedef {Object} Canvas
 * @property {HTMLCanvasElement} element
 * @property {(CanvasRenderingContext2D|WebGLRenderingContext)} context
 */

/**
 * <canvas> or CSS selector to match a <canvas> on DOM.
 * @typedef {(string|HTMLCanvasElement)} CanvasTarget
 */

/**
 * <canvas> definitions.
 * @typedef {Object} CanvasOptions
 * @property {number} [width]
 * @property {number} [height]
 * @property {('2d'|'webgl'|'experimental-webgl')} [context]
 * @property {(Canvas2DContextAttributes|WebGLContextAttributes)} [attributes]
 */

/**
 * Create a <canvas>.
 * @param {Target} target
 * @param {CanvasOptions} options
 * @returns {Canvas}
 */
export function create(target, options) {
  const element = document.createElement('canvas')
  const parent = getElement(target)

  if (!(parent instanceof HTMLElement)) {
    console.log(`Can't append <canvas> to "${parent}"`)
    return
  }

  parent.appendChild(element)

  return select(element, options)
}

/**
 * Select an existing <canvas>.
 * @param {CanvasTarget} target
 * @param {CanvasOptions} options
 * @returns {Canvas}
 */
export function select(target, options = {}) {
  const element = getElement(target)

  if (!(element instanceof HTMLCanvasElement)) {
    console.log('Can\'t get <canvas>')
    return
  }

  const { width = 640, height = 480 } = options
  const { context = '2d', attributes } = options

  element.width = width
  element.height = height

  return {
    element,
    context: element.getContext(context, attributes)
  }
}

/**
 * Provide a simple abstraction to handle elements or selector to an element.
 * @param {Target} target
 * @returns {HTMLElement}
 */
function getElement(target) {
  return (typeof target === 'string') ? document.querySelector(target) : target
}

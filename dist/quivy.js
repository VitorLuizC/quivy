(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.quivy = {})));
}(this, (function (exports) { 'use strict';

  var cache = {};
  /**
   * @typedef Resource
   * @type {Object}
   * @property {string} name
   * @property {string} source
   * @property {HTMLImageElement|HTMLAudioElement|HTMLVideoElement} item
   */

  /**
   * @type {Array.<Resource>}
   */

  var resources = [];
  /**
   * Creates a resource.
   * @param {string} name
   * @param {string} source
   * @param {('image'|'audio'|'video')} type
   */

  function add(name, source, type) {
    if ( type === void 0 ) type = 'image';

    var inCache = cache.hasOwnProperty(name);
    var inResourcesList = resources.find(function (resource) { return resource.name === name; });
    if (inCache) { throw new Error(("Resource \"" + name + "\" already exists in cache.")); }
    if (inResourcesList) { throw new Error(("Resource \"" + name + "\" already exists and hasn't loaded yet.")); }
    /**
     * Resource instance.
     * @type {HTMLImageElement|HTMLAudioElement|HTMLVideoElement}
     */

    var item = null;

    switch (type) {
      case 'image':
        item = new Image();
        break;

      case 'audio':
        item = new Audio();
        break;

      case 'video':
        item = new Video();
        break;

      default:
        throw new Error(("Invalid resource type \"" + type + "\"."));
    }

    resources.push({
      name: name,
      source: source,
      item: item
    });
    return {
      cache: cache,
      add: add,
      load: load
    };
  }
  /**
   * Load a resource.
   * @param {Resource} resource
   * @returns {Promise.<Resource>}
   */


  function loadResource(resource) {
    var name = resource.name;
    var source = resource.source;
    var item = resource.item;
    /**
     * @callback EventCallback
     * @param {Event} event
     */

    /**
     * Event handler
     * @param {EventCallback} callback
     */

    var eventHandler = function (callback) {
      /**
       * Event handler
       * @param {Event} event
       */
      return function (event) {
        callback(event);
        event.preventDefault();
        event.stopPropagation();
      };
    };

    return new Promise(function (resolve, reject) {
      var message = "Error on loading \"" + name + "\" resource. From \"" + source + "\".";
      /**
       * Resource load error handler.
       * @param {Event} event
       */

      var onError = eventHandler(function (event) { return reject(new Error(message)); });
      /**
       * Resource load success handler.
       * @param {Event} event
       */

      var onSuccess = eventHandler(function (event) { return resolve(resource); });
      item.addEventListener('load', onSuccess);
      item.addEventListener('abort', onError);
      item.addEventListener('error', onError);
      item.src = source;
    });
  }
  /**
   * Load all resources.
   * @returns {Promise.<Object>}
   */


  function load() {
    var total = resources.length;
    var loaded = 0;
    return new Promise(function (resolve, reject) {
      for (var i = 0; i < total; i++) {
        var resource = resources.pop();
        loadResource(resource).then(function (resource) {
          cache[resource.name] = resource.item;
          loaded++;

          if (loaded === total) {
            resolve(cache);
          }
        }).catch(function (error) {
          reject(error);
        });
      }
    });
  }
  /**
   * Triggered every time a resource loads.
   * @param {Resource} resource
   * @param {number} loaded Total resources loaded.
   * @param {number} total Resources loading.
   */


  function onLoading(resource, loaded, total) {}
  /**
   * Triggered when all resources are loaded.
   * @param {Object} cache
   */


  function onLoad(cache) {}
  /**
   * Triggered when a resource can't be loaded.
   * @param {Error} error
   */


  function onError(error) {}

  var loader = /*#__PURE__*/Object.freeze({
    cache: cache,
    add: add,
    load: load,
    onLoading: onLoading,
    onLoad: onLoad,
    onError: onError
  });

  /**
   * @typedef Animation
   * @property {function} animation
   */

  /**
   * Create a new animation object.
   * @param {function} animation
   * @returns {Animation}
   */
  function animate(animation) {
    var instance = {
      animation: animation,
      id: null
    };
    return {
      get animation() {
        return instance.animation;
      },

      set animation(animation) {
        instance.animation = animation;
      },

      stop: stop.bind(instance),
      start: start.bind(instance)
    };
  }
  /**
   * Stop animation. Returns false if animation is not running.
   * @memberof Animation
   * @returns {boolean}
   */


  function stop() {
    if (this.id === null) // Stopped animation
      { return false; }
    cancelAnimationFrame(this.id);
    this.id = null;
    return true;
  }
  /**
   * Start animation. Returns false if animation is already running.
   * @memberof Animation
   * @returns {boolean}
   */


  function start() {
    if (this.id !== null) // Already running animation
      { return false; }
    this.id = requestAnimationFrame(run.bind(this));
    return true;
  }
  /**
   * Run animation using browser's AnimationFrame API.
   * @private
   */


  function run() {
    this.animation();
    if (this.id !== null) { this.id = requestAnimationFrame(run.bind(this)); }
  }

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
  function create(target, options) {
    var element = document.createElement('canvas');
    var parent = getElement(target);

    if (!(parent instanceof HTMLElement)) {
      console.log(("Can't append <canvas> to \"" + parent + "\""));
      return;
    }

    parent.appendChild(element);
    return select(element, options);
  }
  /**
   * Select an existing <canvas>.
   * @param {CanvasTarget} target
   * @param {CanvasOptions} options
   * @returns {Canvas}
   */

  function select(target, options) {
    if ( options === void 0 ) options = {};

    var element = getElement(target);

    if (!(element instanceof HTMLCanvasElement)) {
      console.log('Can\'t get <canvas>');
      return;
    }

    var width = options.width; if ( width === void 0 ) width = 640;
    var height = options.height; if ( height === void 0 ) height = 480;
    var context = options.context; if ( context === void 0 ) context = '2d';
    var attributes = options.attributes;
    element.width = width;
    element.height = height;
    return {
      element: element,
      context: element.getContext(context, attributes)
    };
  }
  /**
   * Provide a simple abstraction to handle elements or selector to an element.
   * @param {Target} target
   * @returns {HTMLElement}
   */

  function getElement(target) {
    return typeof target === 'string' ? document.querySelector(target) : target;
  }

  var canvas = /*#__PURE__*/Object.freeze({
    create: create,
    select: select
  });

  exports.loader = loader;
  exports.animate = animate;
  exports.canvas = canvas;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

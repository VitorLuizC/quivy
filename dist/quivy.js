'use strict';

var quivy =
/******/function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};

  /******/ // The require function
  /******/function __webpack_require__(moduleId) {

    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId])
      /******/return installedModules[moduleId].exports;

    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };

    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    /******/ // Flag the module as loaded
    /******/module.l = true;

    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/
  }

  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;

  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;

  /******/ // identity function for calling harmony imports with the correct context
  /******/__webpack_require__.i = function (value) {
    return value;
  };

  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, {
        /******/configurable: false,
        /******/enumerable: true,
        /******/get: getter
        /******/ });
      /******/
    }
    /******/
  };

  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {
      return module['default'];
    } :
    /******/function getModuleExports() {
      return module;
    };
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/
  };

  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "";

  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 2);
  /******/
}(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "start", function () {
    return start;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "stop", function () {
    return stop;
  });
  /**
   * Animation id.
   * @type {number}
   */
  var id = null;

  /**
   * An animation loop.
   */
  var animation = function animation() {
    return undefined;
  };

  /**
   * Polyfills
   */
  var request = requestAnimationFrame || webkitRequestAnimationFrame;
  var cancel = cancelAnimationFrame || webkitCancelAnimationFrame;

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

  /***/
},
/* 1 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "cache", function () {
    return cache;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "add", function () {
    return add;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "load", function () {
    return load;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "onLoading", function () {
    return onLoading;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "onLoad", function () {
    return onLoad;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "onError", function () {
    return onError;
  });
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
  function add(name, source) {
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'image';

    var inCache = cache.hasOwnProperty(name);
    var inResourcesList = resources.find(function (resource) {
      return resource.name === name;
    });

    if (inCache) throw new Error('Resource "' + name + '" already exists in cache.');

    if (inResourcesList) throw new Error('Resource "' + name + '" already exists and hasn\'t loaded yet.');

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
        throw new Error('Invalid resource type "' + type + '".');
    }

    resources.push({ name: name, source: source, item: item });

    return { cache: cache, add: add, load: load };
  }

  /**
   * Load a resource.
   * @param {Resource} resource
   * @returns {Promise.<Resource>}
   */
  function loadResource(resource) {
    var name = resource.name,
        source = resource.source,
        item = resource.item;

    /**
     * @callback EventCallback
     * @param {Event} event
     */

    /**
     * Event handler
     * @param {EventCallback} callback
     */

    var eventHandler = function eventHandler(callback) {
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
      var message = 'Error on loading "' + name + '" resource. From "' + source + '".';
      /**
       * Resource load error handler.
       * @param {Event} event
       */
      var onError = eventHandler(function (event) {
        return reject(new Error(message));
      });

      /**
       * Resource load success handler.
       * @param {Event} event
       */
      var onSuccess = eventHandler(function (event) {
        return resolve(resource);
      });

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
          onLoading(resource, loaded, total);

          if (loaded === total) {
            resolve(cache);
            onLoad(cache);
          }
        }).catch(function (error) {
          onError(error);
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

  /***/
},
/* 2 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__lib_loader_js__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__lib_animation_js__ = __webpack_require__(0);
  /* harmony reexport (module object) */__webpack_require__.d(__webpack_exports__, "loader", function () {
    return __WEBPACK_IMPORTED_MODULE_0__lib_loader_js__;
  });
  /* harmony reexport (module object) */__webpack_require__.d(__webpack_exports__, "animation", function () {
    return __WEBPACK_IMPORTED_MODULE_1__lib_animation_js__;
  });

  /***/
}]);

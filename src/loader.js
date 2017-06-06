const cache = {};

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
const resources = [];

/**
 * Creates a resource.
 * @param {string} name
 * @param {string} source
 * @param {('image'|'audio'|'video')} type
 */
function add(name, source, type = 'image') {
  let inCache = cache.hasOwnProperty(name);
  let inResourcesList = resources.find(resource => resource.name === name);

  if (inCache)
    throw new Error(`Resource "${name}" already exists in cache.`);

  if (inResourcesList)
    throw new Error(`Resource "${name}" already exists and hasn't loaded yet.`);

  /**
   * Resource instance.
   * @type {HTMLImageElement|HTMLAudioElement|HTMLVideoElement}
   */
  let item = null;

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
      throw new Error(`Invalid resource type "${type}".`);
  }

  resources.push({ name, source, item });

  return { cache, add, load };
}

/**
 * Load a resource.
 * @param {Resource} resource
 * @returns {Promise.<Resource>}
 */
function loadResource(resource) {
  let { name, source, item } = resource;

  /**
   * @callback EventCallback
   * @param {Event} event
   */

  /**
   * Event handler
   * @param {EventCallback} callback
   */
  const eventHandler = (callback) => {
    /**
     * Event handler
     * @param {Event} event
     */
    return event => {
      callback(event);
      event.preventDefault();
      event.stopPropagation();
    };
  }

  return new Promise((resolve, reject) => {
    const message = `Error on loading "${name}" resource. From "${source}".`;
    /**
     * Resource load error handler.
     * @param {Event} event
     */
    const onError = eventHandler(event => reject(new Error(message)));

    /**
     * Resource load success handler.
     * @param {Event} event
     */
    const onSuccess = eventHandler(event => resolve(resource));

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
  let total = resources.length;
  let loaded = 0;

  return new Promise((resolve, reject) => {
    for (let i = 0; i < total; i++) {
      let resource = resources.pop();

      loadResource(resource)
        .then(resource => {
          cache[resource.name] = resource.item;
          loaded++;
          onLoading(resource, loaded, total);

          if (loaded === total) {
            resolve(cache);
            onLoad(cache);
          }
        })
        .catch(error => {
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
function onLoading(resource, loaded, total) {

}

/**
 * Triggered when all resources are loaded.
 * @param {Object} cache
 */
function onLoad(cache) {

}

/**
 * Triggered when a resource can't be loaded.
 * @param {Error} error
 */
function onError(error) {

}

export { cache, add, load, onLoading, onLoad, onError };

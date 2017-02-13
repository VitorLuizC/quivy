# Quivy
A micro-framework to quicky start your games and animations.

## Features
- Resource Loader
- Animation Loop

## Usage

### Installation

#### Install from local file
```html
<script src="quivy.min.js"></script>
```

#### Install from npm
```js
var quivy = require('quivy.js');
// using ES6
// import * as quivy from 'quivy.js';
```

### Example

```js
var loader = quivy.loader;
var animation = quivy.animation;
// using ES6
// const { loader, animation } = quivy;

loader
  .add('Person', 'resource/Person.png')
  .add('Tree', 'resource/Tree.png');

loader
  .load()
  .then(setup);

function setup() {
  var person = loader.cache['Person'];
  var tree = loader.cache['Tree'];

  ...

  animation.start(play);

  function play() {

    ...

    if (gameOver)
      animation.stop();
  }
}
```

## Modules
### Loader
```js
...
loader.add('Music', 'some_music.mp3', 'audio');

loader
  .add('Avatar', 'avatar.png', 'image') // image is default value
  .add('Background', 'background.png');

loader.add('Video', 'some_video.mp4', 'video');

loader
  .load()
  .then(setup) // You could use events instead of promise methods
  .catch(error => console.log(error));

loader.onLoad = setup;
loader.onError = error => console.log(error);

// There's also a loading event
loader.onLoading = (resource, filesLoaded, totalFilesToLoad) => {
  let percent = ~~(filesLoaded / totalFilesToLoad) * 100;
  resource.name; // Resource name
  resource.source; // URL
  resource.item; // Image/Audio/Video instance.
};
```
### Animation
```js
...
// Make a sprite move and stop after 3s
animation.start(() => sprite.position.x++);
setTimeout(() => animation.stop(), 3000);
```

## Contribution
Fill free to open issues if you find a bug or ask a request.
Make a pull request!

## Changelog
1.0.0 - loader and animation modules.

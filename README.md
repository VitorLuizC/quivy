# Quivy

[![Greenkeeper badge](https://badges.greenkeeper.io/VitorLuizC/quivy.svg)](https://greenkeeper.io/)

A micro-framework to quicky start your games and animations. Quivy provides some
useful features like:

- Create or select (using CSS selectors) a `<canvas>` element;
- Load images and other resources;
- Animate using a simple API.

## Installation

Of course You're using [Yarn](https://yarnpkg.com/). Right!?

```sh
yarn add quivy
```

You can also install using NPM.

```sh
npm i quivy
```

## Usage

### Example

```js
import { canvas, loader, animate } from 'quivy';

const { element, context } = canvas.select('#game');
const animation = animate(draw)
const person = {
  x: 0,
  y: 0
};

loader
  .add('Person', 'resource/Person.png')
  .add('Tree', 'resource/Tree.png')
  .load()
  .then(animation.start);

function draw() {
  context.drawImage(loader.cache['Person'], person.x, person.y);

  ...

  if (isGameOver)
    animation.stop();
}
```

## Quivy Modules

### Loader
```js
import { loader } from 'quivy';

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

### Animate
```js
import { animate } from 'quivy';

const animation = animate(() => sprite.position.x++)

// Make a sprite move and stop after 3s
animation.start();
setTimeout(animation.stop, 3000);
```

### Canvas

```html
<canvas id="game1"></canvas>

<div class="game2-wrapper"></div>
```

```js
import { canvas } from 'quivy';

const { context: ctx1 } = canvas.select('#game1', {
  context: 'webgl',
  width: 800, // Provide <canvas> size
  height: 600
});

const { element: el2, context: ctx2 } = canvas.create('.game2-wrapper', {
  context: '2d'
});
```

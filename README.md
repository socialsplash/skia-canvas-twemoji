# node-canvas-with-twemoji

This is a module that is able to draw emoji on node-canvas.

## Quick Example
```javascript
const { Canvas } = require('skia-canvas');
const { fillTextWithTwemoji } = require('node-canvas-with-twemoji');

async function main () {
    const canvas = new Canvas(200, 200);
    const context = canvas.getContext('2d');

    context.fillStyle = '#000000';
    context.font = '30px Arial';
    await fillTextWithTwemoji(context, 'emoji 😉', 100, 100);
}

main();
```

## Dependencies

- skia-canvas
- twemoji-parser [GitHub](https://github.com/twitter/twemoji-parser)

## Licence

### node-canvas-with-twemoji

Copyright (c) 2020-2021 cagpie / Shun Kobayashi <cagpie@gmail.com>

Code licensed under the MIT License: http://opensource.org/licenses/MIT

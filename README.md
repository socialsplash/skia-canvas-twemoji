# skia-canvas-twemoji

This is a module that is able to draw emoji on skia-canvas.

## Quick Example
```javascript
const { Canvas } = require('skia-canvas');
const { fillTextWithTwemoji } = require('@polestar/skia-canvas-twemoji');

async function main () {
    const canvas = new Canvas(200, 200);
    const context = canvas.getContext('2d');

    context.fillStyle = '#000000';
    context.font = '30px Arial';
    await fillTextWithTwemoji(context, 'emoji 🎀', 100, 100);
}

main();
```

## Dependencies

- skia-canvas [GitHub](https://github.com/samizdatco/skia-canvas)
- twemoji-parser [GitHub](https://github.com/twitter/twemoji-parser)

## Licence

### skia-canvas-twemoji

Copyright (c) 2020-2021 cagpie / Shun Kobayashi <cagpie@gmail.com>, Polestar Labs <labs@pollux.gg>

Code licensed under the MIT License: http://opensource.org/licenses/MIT

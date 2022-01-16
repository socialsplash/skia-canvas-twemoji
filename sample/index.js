const express = require('express');
const { Canvas, loadImage } = require('skia-canvas');
const base64 = require('urlsafe-base64');

const wt = require('../dist/index');

// console.log('ok', wt.loadImageFromUrl)

const app = express();

app.get('/', async (req, res) => {
  const canvas = new Canvas(200, 500);
  const context = canvas.getContext('2d');

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, 200, 500);

  context.fillStyle = '#000000';
  context.font = '30px serif';
  // await wt.fillTextWithEmoji(context, 'test😉', 10, 50);

  // const img = await wt.loadImageFromUrl('https://twemoji.maxcdn.com/v/latest/72x72/1f609.png');
  // context.drawImage(img, 0, 0);

  context.fillStyle = '#888888';
  context.font = '18px serif';
  context.textAlign = "left";
  context.fillStyle = '#888888';
  await wt.fillTextWithEmoji(context, 'I 🎉 am left aligned 😳', 30, 30, { loadImage });

  context.textAlign = "center";
  await wt.fillTextWithEmoji(context, '我々✨は宇宙人👽だ', 100, 150, { maxWidth: 100, loadImage });

  context.textAlign = "right";
  await wt.fillTextWithEmoji(context, 'I am right aligned 😳', 190, 200, { maxWidth: 100, loadImage });

  context.textAlign = "left";
  await wt.fillTextWithEmoji(context, 'left 😳', 10, 250, { loadImage });

  context.textAlign = "center";
  await wt.fillTextWithEmoji(context, 'center 😳', 100, 300, { loadImage });

  context.textAlign = "right";
  await wt.fillTextWithEmoji(context, 'right 😳', 190, 350, { loadImage });

  if (req.query.text) {
    await wt.fillTextWithEmoji(context, req.query.text, 10, 400, { loadImage });
  }

  const b64 = await canvas.toDataURL('jpg');
  const image = base64.decode(b64.split(',')[1]);

  res.set('Content-Type', 'image/png');
  return res.send(image);
});

const server = app.listen('8086');

function shutDown() {
  server.close();
  process.exit();
}

process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);

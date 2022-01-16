import { CanvasRenderingContext2D, Image } from 'skia-canvas'

import drawTextWithEmoji from './drawTextWithEmoji'

export async function fillTextWithEmoji (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  options: & {
    loadImage: AsyncGenerator<string | Buffer, Promise<Image>>
  }
): Promise<void> {
  return drawTextWithEmoji(context, 'fill', text, x, y, options)
}

export async function strokeTextWithEmoji (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  options: & {
    loadImage: AsyncGenerator<string | Buffer, Promise<Image>>
  }
): Promise<void> {
  return drawTextWithEmoji(context, 'stroke', text, x, y, options)
}

export { default as measureText } from './measureText'

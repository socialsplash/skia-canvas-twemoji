import { Image, CanvasRenderingContext2D } from 'skia-canvas'

import splitEntitiesFromText from './utils/splitEntitiesFromText'
import getFontSizeByCssFont from './utils/getFontSizeByCssFont'
import measureText from './measureText'

export type TextWithEmojiOptions = {
  maxWidth?: number,
  emojiSideMarginPercent?: number,
  emojiTopMarginPercent?: number
}

export default async function drawTextWithEmoji (
  context: CanvasRenderingContext2D,
  fillType: 'fill' | 'stroke',
  text: string,
  x: number,
  y: number,
  options: TextWithEmojiOptions & {
    loadImage: AsyncGenerator<string | Buffer, Promise<Image>>
  }
): Promise<void> {
  const maxWidth = options.maxWidth || Infinity
  const emojiSideMarginPercent = options.emojiSideMarginPercent || 0.1
  const emojiTopMarginPercent = options.emojiTopMarginPercent || 0.1

  const textEntities = splitEntitiesFromText(text)
  const fontSize = getFontSizeByCssFont(context.font)
  // Note: "alphabeticBaseline" does not exists in the definition of TextMetrics from skia-canvas.
  // @ts-ignore
  const baseLine = context.measureText('').alphabeticBaseline
  const textAlign = context.textAlign
  const transform = context.currentTransform

  const emojiSideMargin = fontSize * emojiSideMarginPercent
  const emojiTopMargin = fontSize * emojiTopMarginPercent

  const textWidth = measureText(context, text, { emojiSideMarginPercent }).width

  // for Text align
  let textLeftMargin = 0

  if (!['', 'left', 'start'].includes(textAlign)) {
    context.textAlign = 'left'

    switch (textAlign) {
      case 'center':
        textLeftMargin = -textWidth / 2
        break

      case 'right':
      case 'end':
        textLeftMargin = -textWidth
        break
    }
  }

  // Drawing
  let currentWidth = 0

  if (textWidth > maxWidth) {
    let scale = maxWidth / textWidth
    context.setTransform(scale, 0, 0, 1, 0, 0)
    x = x / scale
  }

  for (let i = 0; i < textEntities.length; i++) {
    const entity = textEntities[i]
    if (typeof entity === 'string') {
      // Common text case
      if (fillType === 'fill') {
        context.fillText(entity, textLeftMargin + x + currentWidth, y)
      } else {
        context.strokeText(entity, textLeftMargin + x + currentWidth, y)
      }

      currentWidth += context.measureText(entity).width
    } else {
      // Emoji case
      // @ts-ignore
      const emoji = await options.loadImage(entity.url)

      // If you do not resize SkiaImage in advance, the image will be rough.
      emoji.width = fontSize
      emoji.height = fontSize

      context.drawImage(
        emoji,
        textLeftMargin + x + currentWidth + emojiSideMargin,
        y + emojiTopMargin - fontSize - baseLine,
        fontSize,
        fontSize
      )

      currentWidth += fontSize + (emojiSideMargin * 2)
    }
  }

  // Restore
  if (textAlign) {
    context.textAlign = textAlign
  }
  context.setTransform(transform)
}

import { CanvasRenderingContext2D } from 'skia-canvas'

import splitEntitiesFromText from './utils/splitEntitiesFromText'
import getFontSizeByCssFont from './utils/getFontSizeByCssFont'
import { TextWithEmojiOptions } from './drawTextWithEmoji'

export type TextMetrics = {
  width: number,
  alphabeticBaseline: number
}

export default function measureText (
  context: CanvasRenderingContext2D,
  text: string,
  options: TextWithEmojiOptions
): TextMetrics {
  const emojiSideMarginPercent = options.emojiSideMarginPercent || 0.1

  const textEntities = splitEntitiesFromText(text)
  const fontSize = getFontSizeByCssFont(context.font)

  const emojiSideMargin = fontSize * emojiSideMarginPercent

  let currentWidth = 0

  for (let i = 0; i < textEntities.length; i++) {
    const entity = textEntities[i]
    if (typeof entity === 'string') {
      // Common text case
      currentWidth += context.measureText(entity).width
    } else {
      // Emoji case
      currentWidth += fontSize + (emojiSideMargin * 2)
    }
  }

  const measured = context.measureText('')

  return {
    width: currentWidth,
    alphabeticBaseline: measured.actualBoundingBoxAscent
  }
}

import '@emotion/react'
import { COLORS, Color, FONTS, Typography, MarkdownStyleType } from './theme'

declare module '@emotion/react' {
  export interface Theme {
    COLORS: COLORS
    color: Color
    FONTS: FONTS
    typography: Typography
    MarkdownStyle: MarkdownStyleType
  }
}

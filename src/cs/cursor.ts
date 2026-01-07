export type CursorId = 'knife' | 'usp' | 'ak47' | 'awp'

export const CURSORS: Array<{
  id: CursorId
  label: string
  glyph: string
  description: string
}> = [
  {
    id: 'knife',
    label: 'Knife (Default)',
    glyph: '🔪',
    description: 'Fast, clean, classic.',
  },
  {
    id: 'usp',
    label: 'USP',
    glyph: '🔫',
    description: 'Quiet aim, tight clicks.',
  },
  {
    id: 'ak47',
    label: 'AK47',
    glyph: '💥',
    description: 'Spray control required.',
  },
  {
    id: 'awp',
    label: 'AWP',
    glyph: '🎯',
    description: 'One shot, one line.',
  },
]


export type CursorType = 'knife' | 'usp' | 'ak47' | 'awp';

export const cursorOptions: { id: CursorType; name: string; emoji: string; description: string }[] = [
  { id: 'knife', name: 'Knife', emoji: '🔪', description: 'Default tactical knife' },
  { id: 'usp', name: 'USP', emoji: '🔫', description: 'USP .45 Tactical' },
  { id: 'ak47', name: 'AK-47', emoji: '🎯', description: 'Avtomat Kalashnikova' },
  { id: 'awp', name: 'AWP', emoji: '🎪', description: 'Arctic Warfare Police' },
];

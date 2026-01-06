export type CursorId = "knife" | "usp" | "ak47" | "awp";

export type CursorOption = {
  id: CursorId;
  label: string;
  // Placeholder "icon" (we'll swap to PNG later).
  glyph: string;
};

export const CURSORS: CursorOption[] = [
  { id: "knife", label: "Knife (Default)", glyph: "🔪" },
  { id: "usp", label: "USP", glyph: "🔫" },
  { id: "ak47", label: "AK47", glyph: "💥" },
  { id: "awp", label: "AWP", glyph: "🎯" },
];

export function cursorBodyClass(id: CursorId) {
  return `cs-cursor-${id}`;
}


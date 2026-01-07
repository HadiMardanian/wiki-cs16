import { createContext } from 'react';
import type { CursorType } from '../data/cursorOptions';

export interface CursorContextType {
  cursor: CursorType;
  setCursor: (cursor: CursorType) => void;
}

export const CursorContext = createContext<CursorContextType | undefined>(undefined);

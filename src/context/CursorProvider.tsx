import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CursorType } from '../data/cursorOptions';
import { CursorContext } from './cursorContext';

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursor, setCursor] = useState<CursorType>('knife');

  useEffect(() => {
    // Remove all cursor classes
    document.body.classList.remove('cursor-knife', 'cursor-usp', 'cursor-ak47', 'cursor-awp');
    // Add the active cursor class
    document.body.classList.add(`cursor-${cursor}`);
  }, [cursor]);

  return (
    <CursorContext.Provider value={{ cursor, setCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

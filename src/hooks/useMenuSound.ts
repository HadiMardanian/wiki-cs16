import { useCallback } from 'react';

export function useMenuSound() {
  const playHover = useCallback(() => {
    // Simulated sound - in production would use Web Audio API or audio files
    console.log('🔊 [MENU] hover.wav');
  }, []);

  const playSelect = useCallback(() => {
    console.log('🔊 [MENU] select.wav');
  }, []);

  const playBack = useCallback(() => {
    console.log('🔊 [MENU] back.wav');
  }, []);

  return { playHover, playSelect, playBack };
}

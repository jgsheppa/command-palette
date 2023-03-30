import { useEffect, useRef, useState } from 'react';

// taken from JohannesKlauss react-hotkeys-hook
const stopPropagation = (e: KeyboardEvent): void => {
  e.stopPropagation();
  e.preventDefault();
  e.stopImmediatePropagation();
};

export function useCommandPalette(dataLength: number) {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.ctrlKey) {
        stopPropagation(e);
        setIsCommandPaletteOpen(true);
      } else if (e.code === 'Escape') {
        e.preventDefault();
        setIsCommandPaletteOpen(false);
      }
    };
    document.addEventListener('keydown', onKeydown);
    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, [setIsCommandPaletteOpen]);

  const handleClosePalette = () => {
    setIsCommandPaletteOpen(false);
  };

  return { isCommandPaletteOpen, handleClosePalette };
}

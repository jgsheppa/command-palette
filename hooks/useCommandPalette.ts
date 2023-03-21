import { useEffect, useRef, useState } from 'react';

export function useCommandPalette(dataLength: number) {
  const ref = useRef(0);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.ctrlKey) {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      } else if (e.code === 'Escape') {
        e.preventDefault();
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', onKeydown);
    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  }, [setIsCommandPaletteOpen]);

  useEffect(() => {
    const onArrowdown = (e: KeyboardEvent) => {
      if (isCommandPaletteOpen && e.key === 'ArrowDown') {
        e.preventDefault();
        if (ref.current === dataLength) {
          ref.current = 0;
        } else {
          ref.current = ref.current + 1;
        }
        document.getElementById(`command-${ref.current}`)?.focus();
      } else if (isCommandPaletteOpen && e.key === 'ArrowUp') {
        e.preventDefault();
        if (ref.current === 0) {
          ref.current = dataLength;
        } else {
          ref.current = ref.current - 1;
        }
        document.getElementById(`command-${ref.current}`)?.focus();
      }
    };
    window.addEventListener('keydown', onArrowdown);
    return () => {
      window.removeEventListener('keydown', onArrowdown);
    };
  }, [dataLength, isCommandPaletteOpen, setIsCommandPaletteOpen]);

  const handleClosePalette = () => {
    setIsCommandPaletteOpen(false);
    ref.current = 0;
  };

  return { isCommandPaletteOpen, handleClosePalette };
}

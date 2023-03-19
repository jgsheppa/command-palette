import { useEffect, useRef, useState } from "react";

export function useCommandPalette(dataLength: number) {
  const ref = useRef(0)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  
  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "k" && e.ctrlKey) {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
        ref.current = 0
      } else if (e.code === "Escape") {
        e.preventDefault();
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [setIsCommandPaletteOpen]);
  
  useEffect(() => {
    const onArrowdown = (e: KeyboardEvent) => {
      if (isCommandPaletteOpen && e.key === "ArrowDown") {
        e.preventDefault();
        if (ref.current === dataLength - 1) {
        ref.current = 1
        } else {
          ref.current = ref.current + 1
        }
        document.getElementById(`route-${ref.current}`)?.focus()

      } else if (isCommandPaletteOpen && e.key === "ArrowUp") {
        e.preventDefault();
        if (ref.current === 1) {
          ref.current = dataLength - 1
        } else {
          ref.current = ref.current - 1
        }
        document.getElementById(`route-${ref.current}`)?.focus()
      } 
    };
    console.log("🚀 ~ file: useCommandPalette.ts:40 ~ onArrowdown ~ ref:", ref)
    window.addEventListener("keydown", onArrowdown);
    return () => {
      window.removeEventListener("keydown", onArrowdown);
    };
  }, [dataLength, isCommandPaletteOpen, setIsCommandPaletteOpen]);

  const handleClosePalette = () => {
    setIsCommandPaletteOpen(false)
    ref.current = 0
  }

  return { isCommandPaletteOpen, handleClosePalette }
}
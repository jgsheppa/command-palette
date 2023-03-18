import { useEffect, useState } from "react";

export function useCommandPalette() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "k" && e.ctrlKey) {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
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

  return { isCommandPaletteOpen }
}
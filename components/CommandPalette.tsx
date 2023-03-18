import { useCommandPalette } from "@/hooks/useCommandPalette"

export function CommandPalette() {
  const {isCommandPaletteOpen} = useCommandPalette()

  return isCommandPaletteOpen ? <div>Command Palette</div> : null
}
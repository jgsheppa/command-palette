import { useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

import { useCommandPalette } from "@/hooks/useCommandPalette"


const routes = ["/about", "/", "contact"]

export function CommandPalette() {
  const { isCommandPaletteOpen, handleClosePalette } = useCommandPalette()
  const router = useRouter()

  const otherRoutes = useMemo(() => routes.filter(route => route !== router.route), [routes])

  return isCommandPaletteOpen ? <div>Command Palette<ul>{otherRoutes.map(route => <li><Link href={route} onClick={handleClosePalette}>{route}</Link></li>)}</ul></div> : null
}
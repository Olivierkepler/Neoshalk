"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command"
import { Home, Search, Settings, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export function CommandModal() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (callback: () => void) => {
    callback()
    setOpen(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push("/"))} className="group">
            <Home className="mr-2 h-4 w-4 cursor-pointer      text-muted-foreground group-hover:text-foreground transition-colors" />
            Home
          </CommandItem>

          <CommandItem onSelect={() => runCommand(() => router.push("/search"))} className="group">
            <Search className="mr-2 h-4 w-4  cursor-pointer text-muted-foreground group-hover:text-foreground transition-colors" />
            Search
          </CommandItem>

          <CommandItem onSelect={() => runCommand(() => router.push("/settings"))} className="group">
            <Settings className="mr-2 h-4 w-4  cursor-pointer text-muted-foreground group-hover:text-foreground transition-colors" />
            Settings
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Preferences">
          <CommandItem
            className="group"
            onSelect={() => runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? (
              <Sun className="mr-2 h-4 w-4  cursor-pointer text-yellow-400 group-hover:text-yellow-300 transition-colors" />
            ) : (
              <Moon className="mr-2 h-4 w-4  cursor-pointer     text-sky-500 group-hover:text-sky-400 transition-colors" />
            )}
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

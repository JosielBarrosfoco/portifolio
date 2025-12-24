"use client"

import { ThemeToggle } from "@/components/ui/theme-toggle"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#0066cc] to-[#00a896] bg-clip-text text-transparent">
            Josiel Dev
          </h1>
        </div>
        
        <nav className="flex items-center space-x-4">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}


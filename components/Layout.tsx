import React from 'react'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Habits.lol
          </Link>
          <ThemeToggle />
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="container mx-auto px-4 py-4 text-center">
        made by <a href="https://x.com/ankitkr0" target="_blank" rel="noopener noreferrer" className="underline">ankitkr0</a>
      </footer>
    </div>
  )
}
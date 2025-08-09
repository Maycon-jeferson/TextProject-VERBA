import React from 'react'

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 flex items-center gap-2">
          <span className="inline-block w-6 h-6 bg-blue-600 rounded mr-2" />
          Notas
        </h1>
        <span className="text-gray-400 text-sm font-mono">Inspired by Notion</span>
      </header>
      <main className="flex-1 flex flex-col items-center py-10 px-2 sm:px-0">{children}</main>
    </div>
  )
}


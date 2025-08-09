import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function NoteInput() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const openInput = () => setIsOpen(true)
  const closeInput = () => setIsOpen(false)

  const handleNewNotes = () => {
    router.push('/notes')
  }

  const handlefinance = () => {
    router.push('/finance')
  }

  return (
    <div className="flex flex-col w-2xs">
      <Button type="button" onClick={openInput}>
        Nova Tarefa
      </Button>

      {isOpen && (
        <div className="bg-gray-300 rounded-2xl m-4">
          <Button className="rounded-full flex items-center justify-center h-4 w-4 text-sm" onClick={closeInput}>
            X
          </Button>

          <div className="flex flex-col gap-2 mt-4">
            <Button onClick={handleNewNotes}>Nova nota</Button>

            <Button onClick={handlefinance}>Finanças</Button>
          </div>
        </div>
      )}
    </div>
  )
}


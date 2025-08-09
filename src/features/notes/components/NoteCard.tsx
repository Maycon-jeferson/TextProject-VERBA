import React from 'react'
import { Button } from '@/components/ui/button'

interface NoteCardProps {
  content: string
  onEdit?: () => void
  onDelete?: () => void
}

export function NoteCard({ content, onEdit, onDelete }: NoteCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-3 ">
      <div className="flex-1 text-gray-800 text-base whitespace-pre-line">{content}</div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-400"></span>
        <div className="flex gap-2">
          <Button className="px-2 py-1 text-xs hover:bg-blue-100 text-blue-600 font-medium shadow-none" onClick={onEdit} type="button">
            Editar
          </Button>
          <Button className="px-2 py-1 text-xs bg-gray-100 hover:bg-red-100 text-red-600 font-medium shadow-none" onClick={onDelete} type="button">
            Excluir
          </Button>
        </div>
      </div>
    </div>
  )
}


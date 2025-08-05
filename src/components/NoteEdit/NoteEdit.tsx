'use client'

import { Button } from '@/layout/Button'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

// Interface para tipar uma nota
interface Note {
  id: string,
  content: string
}

// Extensões usadas no editor TipTap
const extensions = [StarterKit]

const NoteEdit = () => {
  // Estado para armazenar todas as notas
  const [notes, setNotes] = useState<Note[]>([])

  // ID da nota atualmente sendo editada
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null)

  // Controla a exibição do modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Indica se estamos no modo de edição
  const [isEditing, setIsEditing] = useState(false)

  // Instância do editor TipTap
  const editor = useEditor({
    extensions,
    content: '',
    autofocus: false,
    immediatelyRender: false,
  })

  // Carrega as notas do localStorage ao iniciar o componente
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes')
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  // Foca o editor ao clicar na área dele (melhor UX)
  const handleWrapperClick = () => {
    if (editor && !editor.isFocused) {
      editor.commands.focus()
    }
  }

  // Remove uma nota com base no ID
  const deleteNotes = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id)
    setNotes(updatedNotes)
    localStorage.setItem('notes', JSON.stringify(updatedNotes))
  }

  // Preenche o editor com o conteúdo da nota e abre o modal para edição
  const editNotes = (note: Note) => {
    if (!editor) return
    editor.commands.setContent(note.content)
    setCurrentNoteId(note.id)
    setIsEditing(true)
    setIsModalOpen(true)
  }

  // Salva uma nova nota ou atualiza uma nota existente
  const handleSave = () => {
    if (!editor) return

    const content = editor.getHTML().trim()

    // Ignora conteúdos vazios
    if (content === '<p></p>' || content === '') return

    if (isEditing && currentNoteId) {
      // Atualiza nota existente
      const updatedNotes = notes.map(note =>
        note.id === currentNoteId ? { ...note, content } : note
      )
      setNotes(updatedNotes)
      localStorage.setItem('notes', JSON.stringify(updatedNotes))
    } else {
      // Cria nova nota
      const newNote: Note = {
        id: uuidv4(),
        content,
      }
      const updatedNotes = [...notes, newNote]
      setNotes(updatedNotes)
      localStorage.setItem('notes', JSON.stringify(updatedNotes))
      setCurrentNoteId(newNote.id)
    }

    // Limpa o estado e fecha o modal
    editor.commands.clearContent()
    setIsModalOpen(false)
    setIsEditing(false)
    setCurrentNoteId(null)
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">

      {/* Botão para criar nova nota */}
      <div className="flex justify-center mb-6">
        <Button
          onClick={() => {
            setIsModalOpen(true)
            setIsEditing(false)
            setCurrentNoteId(null)
            editor?.commands.clearContent()
          }}
        >
          Nova Nota
        </Button>
      </div>

      {/* Modal para edição/criação de nota */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
            <h2 className="text-lg font-semibold mb-4">
              {isEditing ? 'Editar Nota' : 'Nova Nota'}
            </h2>
            <div
              className="bg-white min-h-[200px] border border-gray-300 rounded-md p-4 cursor-text"
              onClick={handleWrapperClick}
            >
              <EditorContent
                editor={editor}
                className="prose focus:outline-none max-w-none"
              />
            </div>

            <div className="flex justify-end mt-4 space-x-2">
              <Button
                onClick={() => {
                  editor?.commands.clearContent()
                  setIsModalOpen(false)
                  setIsEditing(false)
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                Salvar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de notas */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Minhas Notas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {notes.map(note => (
            <div
              key={note.id}
              className="bg-blue-100 border border-blue-300 rounded-lg p-4 shadow-sm hover:bg-blue-200 transition"
              onClick={() => editNotes(note)}
            >
              <div
                className="text-gray-800 text-sm mb-2 line-clamp-4"
                dangerouslySetInnerHTML={{ __html: note.content.slice(0, 100) }}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation() // Evita que o clique no botão propague para o card
                  deleteNotes(note.id)
                }}
                className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-md"
              >
                Deletar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NoteEdit

'use client'

import { Button } from '@/layout/Button'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

// --- Interface para o tipo de dado da Nota ---
interface Note {
  id: string
  content: string
}

// ============================================================================
// --- Componente da Barra de Ferramentas (MenuBar) ---
// ============================================================================
const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const [, setRerender] = useState(false)

  useEffect(() => {
    if (!editor) return

    const forceUpdate = () => setRerender(r => !r)

    editor.on('selectionUpdate', forceUpdate)
    editor.on('transaction', forceUpdate)

    return () => {
      editor.off('selectionUpdate', forceUpdate)
      editor.off('transaction', forceUpdate)
    }
  }, [editor])

  if (!editor) {
    return null
  }

  const buttonClass =
    'px-3 py-1 text-sm font-semibold text-gray-800 bg-gray-200 rounded hover:bg-gray-300 transition-colors'
  const activeButtonClass =
    'bg-gray-500 text-white ring-2 ring-offset-1 ring-offset-gray-100 ring-blue-500'

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 mb-4 bg-gray-100 rounded-md sticky top-0 z-10">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`${buttonClass} ${editor.isActive('bold') ? activeButtonClass : ''}`}
      >
        Negrito
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`${buttonClass} ${editor.isActive('italic') ? activeButtonClass : ''}`}
      >
        Itálico
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`${buttonClass} ${editor.isActive('underline') ? activeButtonClass : ''}`}
      >
        Sublinhado
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${buttonClass} ${editor.isActive('heading', { level: 1 }) ? activeButtonClass : ''}`}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${buttonClass} ${editor.isActive('heading', { level: 2 }) ? activeButtonClass : ''}`}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${buttonClass} ${editor.isActive('bulletList') ? activeButtonClass : ''}`}
      >
        Tópicos
      </button>
    </div>
  )
}

// ============================================================================
// --- Componente Principal (NoteEdit) ---
// ============================================================================
const NoteEdit = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [showOptions, setShowOptions] = useState(false)
  const [isNewNote, setIsNewNote] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const extensions = [StarterKit, Underline]

  const editor = useEditor({
    extensions,
    content: '',
    onUpdate: ({ editor }) => {
      if (selectedNote && !isNewNote) {
        const currentContent = editor.getHTML()
        setHasChanges(currentContent !== selectedNote.content)
      }
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none focus:outline-none',
      },
    },
  })

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes')
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes))
    }
  }, [])

  useEffect(() => {
    if (selectedNote && editor) {
      editor.commands.setContent(selectedNote.content)
      setHasChanges(false)
    }
  }, [selectedNote, editor])

  const addNote = () => {
    const newNote = { id: uuidv4(), content: '' }
    setSelectedNote(newNote)
    setIsNewNote(true)
    setShowOptions(false)
    if (editor) {
      editor.commands.setContent('')
      editor.commands.focus()
    }
  }

  const saveNote = () => {
    if (!editor || !selectedNote) return

    const content = editor.getHTML()
    if (isNewNote) {
      const newNote = { ...selectedNote, content }
      const updatedNotes = [...notes, newNote]
      setNotes(updatedNotes)
      localStorage.setItem('notes', JSON.stringify(updatedNotes))
      setIsNewNote(false)
      setSelectedNote(null)
    } else {
      const updatedNotes = notes.map(note =>
        note.id === selectedNote.id ? { ...note, content } : note
      )
      setNotes(updatedNotes)
      localStorage.setItem('notes', JSON.stringify(updatedNotes))
      setSelectedNote(null)
    }
  }

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id)
    setNotes(updatedNotes)
    localStorage.setItem('notes', JSON.stringify(updatedNotes))
    if (selectedNote?.id === id) {
      setSelectedNote(null)
    }
  }

  const openNote = (note: Note) => {
    setSelectedNote(note)
    setIsNewNote(false)
    setHasChanges(false)
  }

  return (
    <div className="relative min-h-screen bg-black text-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map(note => (
          <div
            key={note.id}
            onClick={() => openNote(note)}
            className={`p-4 rounded cursor-pointer transition-colors duration-300 ${
              selectedNote?.id === note.id ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <div
              className="text-sm line-clamp-3 prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: note.content }}
            />
          </div>
        ))}
      </div>

      <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-2">
        {showOptions && (
          <div className="flex flex-col mb-2 space-y-2 animate-fade-in">
            <button
              onClick={addNote}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded shadow"
            >
              Nota
            </button>
            <button className="bg-gray-700 opacity-50 px-4 py-2 rounded cursor-not-allowed">
              Planilha
            </button>
            <button className="bg-gray-700 opacity-50 px-4 py-2 rounded cursor-not-allowed">
              To-do List
            </button>
          </div>
        )}
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="bg-gray-900 hover:bg-gray-700 w-14 h-14 rounded-full flex items-center justify-center text-white text-3xl transition-all duration-300 shadow-lg"
        >
          {showOptions ? '✕' : '+'}
        </button>
      </div>

      {selectedNote && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="bg-gray-900 w-[90%] max-w-5xl max-h-[90vh] p-6 rounded-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
              <h2 className="text-xl font-bold">
                {isNewNote ? 'Nova Nota' : 'Editar Nota'}
              </h2>
              <div className="flex space-x-2">
                {isNewNote ? (
                  <>
                    <Button onClick={saveNote} variant="primary">Salvar</Button>
                    <Button onClick={() => setSelectedNote(null)} variant="secondary">Cancelar</Button>
                  </>
                ) : (
                  <>
                    {hasChanges && (
                      <Button onClick={saveNote} variant="primary">Salvar Alterações</Button>
                    )}
                    <Button onClick={() => deleteNote(selectedNote.id)} variant="danger">Deletar</Button>
                    <Button onClick={() => setSelectedNote(null)} variant="secondary">Fechar</Button>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white rounded-md overflow-y-auto flex-grow text-black">
              <MenuBar editor={editor} />
              <div className="p-4">
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NoteEdit

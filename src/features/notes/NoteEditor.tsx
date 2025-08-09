'use client'

import { Button } from '@/components/ui/button'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Note {
  id: string
  content: string
  title: string
  createdAt: string
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const [, forceUpdate] = useState(false)

  useEffect(() => {
    if (!editor) return

    const update = () => forceUpdate(v => !v)

    editor.on('transaction', update)
    editor.on('selectionUpdate', update)

    return () => {
      editor.off('transaction', update)
      editor.off('selectionUpdate', update)
    }
  }, [editor])

  if (!editor) {
    return null
  }

  const buttonClass = 'px-3 py-1 text-sm font-semibold text-gray-800 bg-gray-200 rounded hover:bg-gray-300 transition-colors dark:text-white dark:bg-gray-600'
  const activeButtonClass = 'bg-gray-700 text-white dark:bg-gray-800 dark:text-white'

  const handleButtonClick = (action: () => void) => {
    action()
    forceUpdate(v => !v)
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 mb-4 bg-gray-100 rounded-md sticky top-0 z-10 dark:bg-gray-700">
      <button
        onClick={() => handleButtonClick(() => editor.chain().focus().toggleHeading({ level: 1 }).run())}
        className={`${buttonClass} ${editor.isActive('heading', { level: 1 }) ? activeButtonClass : ''}`}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </button>
      <button
        onClick={() => handleButtonClick(() => editor.chain().focus().toggleHeading({ level: 2 }).run())}
        className={`${buttonClass} ${editor.isActive('heading', { level: 2 }) ? activeButtonClass : ''}`}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </button>
      <button
        onClick={() => handleButtonClick(() => editor.chain().focus().toggleBulletList().run())}
        className={`${buttonClass} ${editor.isActive('bulletList') ? activeButtonClass : ''}`}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
      >
        Tópicos
      </button>
      <button
        onClick={() => handleButtonClick(() => editor.chain().focus().toggleBold().run())}
        className={`${buttonClass} ${editor.isActive('bold') ? activeButtonClass : ''}`}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        Negrito
      </button>
      <button
        onClick={() => handleButtonClick(() => editor.chain().focus().toggleItalic().run())}
        className={`${buttonClass} ${editor.isActive('italic') ? activeButtonClass : ''}`}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        Itálico
      </button>
      <button
        onClick={() => handleButtonClick(() => editor.chain().focus().toggleUnderline().run())}
        className={`${buttonClass} ${editor.isActive('underline') ? activeButtonClass : ''}`}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
      >
        Sublinhado
      </button>
    </div>
  )
}

export default function NoteEditor() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [showOptions, setShowOptions] = useState(false)
  const [isNewNote, setIsNewNote] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [noteTitle, setNoteTitle] = useState('')

  const extensions = [
    StarterKit.configure({
      heading: {
        levels: [1, 2],
        HTMLAttributes: {
          class: 'heading',
        },
      },
      bulletList: {
        HTMLAttributes: {
          class: 'list-disc',
        },
      },
    }),
    Underline,
  ]

  const editor = useEditor({
    extensions,
    content: '',
    onUpdate: ({ editor }) => {
      const content = editor.getHTML()
      if (selectedNote && !isNewNote) {
        setHasChanges(content !== selectedNote.content)
      }
    },
    editorProps: {
      attributes: {
        class: 'tiptap focus:outline-none min-h-[300px] p-4 prose dark:prose-invert max-w-none',
      },
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes')
    if (storedNotes) {
      try {
        setNotes(JSON.parse(storedNotes))
      } catch (error) {
        console.error('Error parsing notes:', error)
      }
    }
  }, [])

  useEffect(() => {
    if (selectedNote && editor) {
      editor.commands.setContent(selectedNote.content)
      setNoteTitle(selectedNote.title)
      setHasChanges(false)
    }
  }, [selectedNote, editor])

  const addNote = () => {
    const newNote = {
      id: uuidv4(),
      content: '',
      title: 'Nova Nota',
      createdAt: new Date().toISOString(),
    }
    setSelectedNote(newNote)
    setIsNewNote(true)
    setNoteTitle(newNote.title)
    setShowOptions(false)
    if (editor) {
      editor.commands.setContent('')
      editor.commands.focus()
    }
  }

  const saveNote = () => {
    if (!editor || !selectedNote) return

    const content = editor.getHTML()
    const now = new Date().toISOString()

    const noteToSave = {
      ...selectedNote,
      content,
      title: noteTitle,
      createdAt: isNewNote ? now : selectedNote.createdAt,
      updatedAt: now,
    }

    const updatedNotes = isNewNote ? [...notes, noteToSave] : notes.map(note => (note.id === selectedNote.id ? noteToSave : note))

    setNotes(updatedNotes)
    localStorage.setItem('notes', JSON.stringify(updatedNotes))
    setIsNewNote(false)
    setSelectedNote(null)
    setNoteTitle('')
  }

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id)
    setNotes(updatedNotes)
    localStorage.setItem('notes', JSON.stringify(updatedNotes))
    if (selectedNote?.id === id) {
      setSelectedNote(null)
      setNoteTitle('')
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
            <h3 className="text-lg font-bold mb-2 truncate">{note.title}</h3>
            <div className="preview text-sm line-clamp-4" dangerouslySetInnerHTML={{ __html: note.content }} />
          </div>
        ))}
      </div>

      <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-2">
        {showOptions && (
          <div className="flex flex-col mb-2 space-y-2 animate-fade-in">
            <button onClick={addNote} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded shadow">
              Nota
            </button>
            <button className="bg-gray-700 opacity-50 px-4 py-2 rounded cursor-not-allowed">Planilha</button>
            <button className="bg-gray-700 opacity-50 px-4 py-2 rounded cursor-not-allowed">To-do List</button>
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
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                value={noteTitle}
                onChange={e => setNoteTitle(e.target.value)}
                className="text-xl font-bold bg-transparent border-b border-gray-700 focus:outline-none focus:border-blue-500 w-full max-w-[50%]"
                placeholder="Título da nota"
              />
              <div className="flex justify-between items-center mb-4">
                <Button
                  className=""
                  onClick={() => {
                    if (!hasChanges || confirm('Deseja descartar as alterações?')) {
                      setSelectedNote(null)
                      setNoteTitle('')
                    }
                  }}
                  variant="secondary"
                >
                  Fechar
                </Button>

                {!isNewNote && (
                  <Button onClick={() => deleteNote(selectedNote.id)} variant="danger">
                    Deletar
                  </Button>
                )}
                <Button onClick={saveNote} variant="primary" disabled={!noteTitle.trim()}>
                  {isNewNote ? 'Salvar' : 'Salvar Alterações'}
                </Button>
              </div>
            </div>

            <div className="dark:bg-gray-900 rounded-md overflow-y-auto flex-grow">
              <MenuBar editor={editor} />
              <div className="min-h-[300px] p-4">
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


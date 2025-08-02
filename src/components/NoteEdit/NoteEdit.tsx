'use client'

import { Button } from '@/layout/Button'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Note {
  id: string,
  content: string
}

const extensions = [StarterKit]

const NoteEdit = () => {
  const [ notes, setNotes ] = useState<Note[]>([])
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null)


  const editor = useEditor({
    extensions,
    content: '',
    autofocus: false,
    immediatelyRender: false,
  })

    useEffect(() => {
    const savedNotes = localStorage.getItem('notes')
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  const handleWrapperClick = () => {
    if (editor && !editor.isFocused) {
      editor.commands.focus()
    }
  }

  const handleSave = () => {
    if (!editor) return
    const content = editor.getHTML()

    const newNote: Note = {
      id: uuidv4(),
      content,
    }

    const updatedNotes = [...notes, newNote]
    setNotes(updatedNotes)
    localStorage.setItem('notes', JSON.stringify(updatedNotes))
    setCurrentNoteId(newNote.id)
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div
        className="bg-white min-h-[400px] rounded-lg shadow-md border border-gray-300 p-6 cursor-text"
        onClick={handleWrapperClick}
      >
        <EditorContent
          editor={editor}
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none"
        />
      </div>

      <div className='flex justify-center mt-4'>
        <Button
          onClick={handleSave}
        >
          Salvar
        </Button>
      </div>

      <div>
        {notes.map(note =>(
          <li
          key={note.id}
          className={currentNoteId === note.id ? 'bg-blue-100' : ''}
          >
            <div dangerouslySetInnerHTML={{__html: note.content.slice(0, 100)}}></div>
          </li>
        ))}
      </div>
    </div>
  )
}

export default NoteEdit
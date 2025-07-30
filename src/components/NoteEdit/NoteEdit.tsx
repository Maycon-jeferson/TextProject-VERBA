import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const extensions = [StarterKit]

const NoteEdit = () => {
  const editor = useEditor({
    extensions,
    content: '',
    immediatelyRender: false,
  })

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="bg-white min-h-[400px] rounded-lg shadow-md border border-gray-300 p-6">
        <EditorContent
          editor={editor}
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
        />
      </div>
    </div>
  )
}

export default NoteEdit

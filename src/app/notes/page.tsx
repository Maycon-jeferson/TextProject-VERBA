'use client'

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import NoteEditor from "@/features/notes/NoteEditor"

export default function NotesPage() {
    const router = useRouter()
    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="mb-4">
                <Button onClick={() => router.push('/')}>
                    Voltar
                </Button>
            </div>

            <NoteEditor />
        </div>
    )
}

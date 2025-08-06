'use client'

import { useRouter } from "next/navigation"
import { Button } from "../../layout/Button"
import NoteEdit from "@/components/NoteEdit/NoteEdit"

export default function NewFinance() {
    const router = useRouter()
    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="mb-4">
                <Button onClick={() => router.push('/')}>
                    Voltar
                </Button>
            </div>

            <NoteEdit />
        </div>
    )
}

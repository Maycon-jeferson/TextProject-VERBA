"use client";

import NotesLayout from '@/components/layout/NotesLayout'
import { NoteInput } from '@/features/notes/components/NoteInput'

export default function Home() {
  return (
    <NotesLayout>
      <NoteInput/>
    </NotesLayout>
  );
}

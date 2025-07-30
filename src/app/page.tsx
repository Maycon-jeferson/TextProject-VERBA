"use client";

import { NotesLayout } from '../layout/Header/Header'
import { NoteInput } from '../layout/NoteInput/NoteInput'

export default function Home() {
  return (
    <NotesLayout>
      <NoteInput/>
    </NotesLayout>
  );
}

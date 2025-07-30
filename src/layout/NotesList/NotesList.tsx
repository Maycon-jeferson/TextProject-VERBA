import React from "react";
import { NoteCard } from "../Card/Card";

export interface Note {
  id: string;
  content: string;
  createdAt: Date;
}

interface NotesListProps {
  notes: Note[];
  onEditNote?: (id: string) => void;
  onDeleteNote?: (id: string) => void;
}

export function NotesList({ notes, onEditNote, onDeleteNote }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <div className="col-span-full text-gray-400 text-center py-12 border-2 border-dashed border-gray-200 rounded-lg bg-white">
        Nenhuma nota ainda. Adicione sua primeira nota!
      </div>
    );
  }
  return (
    <>
      {notes.map(note => (
        <NoteCard
          key={note.id}
          content={note.content}
          onEdit={() => onEditNote && onEditNote(note.id)}
          onDelete={() => onDeleteNote && onDeleteNote(note.id)}
        />
      ))}
    </>
  );
} 
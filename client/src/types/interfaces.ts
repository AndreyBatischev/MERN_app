import { Note } from "../modules/note"

export interface NoteInput {
    title?: string,
    text?: string
  }

export interface AddNoteDialogProps {
  onDismiss: () => void
  onNoteSave: (note: Note) => void
}

 
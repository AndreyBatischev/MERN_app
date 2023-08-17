import { Note } from "../modules/note"

export interface NoteInput {
    title?: string,
    text?: string
  }

export interface AddEditNoteDialogProps {
  noteToEdit?: Note,
  onDismiss: () => void
  onNoteSave: (note: Note) => void
}

export interface NoteProps {
  note: Note,
  noNoteClicked: (note: Note) => void,
  onDeleteNoteClicked: (note: Note) => void,
  className?: string
}
 
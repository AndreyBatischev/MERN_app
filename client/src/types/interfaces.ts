import { Note } from "../models/note"
import { User } from "../models/user"

export interface NoteInput {
    title?: string,
    text?: string
  }

export interface AddEditNoteDialogProps {
  noteToEdit?: Note,
  onDismiss: () => void,
  onNoteSave: (note: Note) => void
}

export interface NoteProps {
  note: Note,
  onNoteClicked: (note: Note) => void,
  onDeleteNoteClicked: (note: Note) => void,
  className?: string
}
 
export interface SignUpModalProps {
  onDismiss: () => void,
  onSingUpSuccessful: (user: User) => void
}
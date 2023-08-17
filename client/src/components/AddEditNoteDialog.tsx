import { Button, Form, Modal } from "react-bootstrap";
import { AddEditNoteDialogProps, NoteInput } from "../types/interfaces";
import { useForm } from "react-hook-form";
import * as NoteApi from '../network/notes_api'
import { Note } from "../modules/note";

const AddEditNoteDialog = ({onDismiss, onNoteSave, noteToEdit}: AddEditNoteDialogProps) => {
    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || ""
        }
    })

    async function onSubmit(input:NoteInput) {
        try {
            let noteResponse: Note

            if(noteToEdit) {
                noteResponse = await NoteApi.updateNote(input, noteToEdit._id)
            }else {
                noteResponse = await NoteApi.createNote(input)
            }
            onNoteSave(noteResponse)
        } catch (error) {
            console.log("🚀 ~ file: AddEditNoteDialog.tsx:11 ~ onSubmit ~ error:", error)
        }
    }

    return ( 
        <Modal show  onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit ? "Edit note" : " Add note"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                        type="text"
                        placeholder="Title"
                        isInvalid={!!errors.title}
                        {...register("title", {required: "Required"} )}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control 
                        as="textarea"
                        placeholder="Text"
                        rows={5}
                        {...register("text")}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button 
                type="submit"
                form="addEditNoteForm"
                disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
     );
}
 
export default AddEditNoteDialog;
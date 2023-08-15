import { Button, Form, Modal } from "react-bootstrap";
import { AddNoteDialogProps, NoteInput } from "../types/interfaces";
import { useForm } from "react-hook-form";
import * as NoteApi from '../network/notes_api'

const AddNoteDialog = ({onDismiss, onNoteSave}: AddNoteDialogProps) => {
    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<NoteInput>()

    async function onSubmit(input:NoteInput) {
        try {
            const noteResponse = await NoteApi.createNote(input)
            onNoteSave(noteResponse)
        } catch (error) {
            console.log("🚀 ~ file: AddNoteDialog.tsx:11 ~ onSubmit ~ error:", error)
        }
    }

    return ( 
        <Modal show  onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    some text
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
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
                form="addNoteForm"
                disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
     );
}
 
export default AddNoteDialog;
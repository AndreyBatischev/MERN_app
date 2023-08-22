import { useForm } from "react-hook-form"
import { User } from "../models/user"
import { SingUpCredentials } from "../network/notes_api"
import * as NoteApi from "../network/notes_api"
import { Button, Form, Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap"
import TextInputField from "./form/TextInputField"
import styleUtiles from "../styles/utils.module.css"

interface SingUpModalProps {
    onDismiss: () => void,
    onSingUpSuccessful: (user: User) => void
}

export const SingUpModal = ({onDismiss, onSingUpSuccessful}: SingUpModalProps) => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SingUpCredentials>()

    async function onSubmit(credentials:SingUpCredentials ) {
        try {
            const newUser = await NoteApi.singUp(credentials)
            onSingUpSuccessful(newUser)
            
        } catch (error) {
            console.log("🚀 ~ file: SingUpModal.tsx:17 ~ onSubmit ~ error:", error)
        }
        
    }

  return (
    <Modal show onHide={onDismiss}>
        <ModalHeader closeButton>
            <ModalTitle>
                Sing Up
            </ModalTitle>
        </ModalHeader>
        <ModalBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField 
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="Username"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.username}
                />
                <TextInputField 
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Email"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.email}
                />
                <TextInputField 
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.password}
                />
                <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className={styleUtiles.width100}
                >
                    Sing Up
                </Button>
            </Form>
        </ModalBody>
    </Modal>
  )
}

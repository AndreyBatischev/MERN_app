import { useForm } from "react-hook-form"
import { SignUpCredentials } from "../network/notes_api"
import * as NotesApi from "../network/notes_api"
import { Button, Form, Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap"
import TextInputField from "./form/TextInputField"
import styleUtiles from "../styles/utils.module.css"
import {SignUpModalProps} from "../types/interfaces"


export const SingUpModal = ({onDismiss, onSingUpSuccessful}: SignUpModalProps) => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignUpCredentials>()

    async function onSubmit(credentials:SignUpCredentials ) {
        try {
            
            const newUser = await NotesApi.singUp(credentials)
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

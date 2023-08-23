import { useForm } from "react-hook-form"
import { LoginCredentials } from "../network/notes_api"
import * as NotesApi from "../network/notes_api"
import {SignUpModalProps} from "../types/interfaces"
import { Button, Form, Modal } from "react-bootstrap"
import TextInputField from "./form/TextInputField"
import styleUtiles from "../styles/utils.module.css"



const  LoginModal = ({onDismiss, onSingUpSuccessful}: SignUpModalProps) => {

    const {register, handleSubmit, formState: {errors, isSubmitting}}  = useForm<LoginCredentials>()

    async function onSubmit(credentials: LoginCredentials){
        try {
            const user = await NotesApi.login(credentials)
        } catch (error) {
            console.log("🚀 ~ file: LoginModal.tsx:14 ~ onSubmit ~ error:", error)
        }
    }

  return (
    <Modal show onHide={onDismiss} >
        <Modal.Header closeButton>
            <Modal.Title>
                Log In
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                    Log In
                </Button>
            </Form>
        </Modal.Body>

    </Modal>
  )
}

export default LoginModal
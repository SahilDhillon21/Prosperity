import { Modal } from "react-bootstrap"
import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { validateEmail } from "../utils/validateEmail";
import * as UserNetwork from '../network/user.network'
import User from "../models/user.model";


interface SignupModalProps {
    onDismiss: () => void,
    onUserSignup: (newUser: User) => void,
}

export interface SignupFormProps {
    username?: string,
    email?: string,
    password?: string,
}

export const SignupDialog = ({ onDismiss, onUserSignup }: SignupModalProps) => {

    const form = useForm()

    const { register, handleSubmit, formState: { isSubmitting } } = form

    const [usernameError, setUsernameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const handleSignupSubmit = async (data: SignupFormProps) => {
        const { username, email, password } = data

        let hasError = false

        if (!username || username.length < 3) {
            hasError = true
        } 

        if (!email || !validateEmail(email)) {
            setEmailError(true)
            hasError = true
        }

        if (!password || password.length < 4) {
            setPasswordError(true)
            hasError = true
        }

        if (hasError) {
            return
        } else {
            try {
                const signedUpUser = await UserNetwork.callUserSignup(data)
                onUserSignup(signedUpUser)
                
            } catch (error) {
                alert("Coudln't sign up (signup dialog error)")
            }
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Sign up
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form noValidate onSubmit={handleSubmit(handleSignupSubmit)} id="signup_form">
                    <Stack gap={3} className="m-3">

                        <TextField
                            label="Username"
                            type="text"
                            {...register("username")}
                            error={usernameError}
                            helperText={usernameError && "Username must be at least 3 characters long"}
                        />

                        <TextField
                            label="Email"
                            type="email"
                            {...register("email")}
                            error={emailError}
                            helperText={emailError && "Please enter a valid email address"}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            {...register("password")}
                            error={passwordError}
                            helperText={passwordError && "Password must be at least 4 characters"}
                        />

                    </Stack>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    className="w-100"
                    variant="contained"
                    type="submit"
                    form="signup_form"
                    disabled={isSubmitting}
                >
                    Sign up
                </Button>
            </Modal.Footer>

        </Modal>
    )
}

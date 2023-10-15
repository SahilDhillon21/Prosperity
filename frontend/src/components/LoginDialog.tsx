import { Alert, Modal } from "react-bootstrap"
import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as UserNetwork from '../network/user.network'
import User from "../models/user.model";

interface LoginDialogProps {
    onDismiss: () => void,
    onUserLogin: (user: User) => void,
}

export interface LoginFormProps {
    username?: string,
    password?: string,
}

export const LoginDialog = ({ onDismiss, onUserLogin }: LoginDialogProps) => {

    const form = useForm()

    const { register, handleSubmit, formState: { isSubmitting } } = form

    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const [invalidCredentials, setInvalidCredentials] = useState(false)



    const handleLoginSubmit = async (data: LoginFormProps) => {
        const { username, password } = data

        let hasError = false

        if (!username) {
            setUsernameError(true)
            hasError = true
        }

        if (!password) {
            setPasswordError(true)
            hasError = true
        }

        if (hasError) {
            return
        } else {
            const user = await UserNetwork.callUserLogin(data)

            if(JSON.stringify(user) === "{}"){
                setInvalidCredentials(true)
            } else {
                onUserLogin(user)
            }

        }
    }


    return (
        <Modal show onHide={onDismiss}>

            <Modal.Header closeButton>
                <Modal.Title>
                    Log in
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {invalidCredentials && 
                
                <Alert variant="danger">
                    Invalid Credentials
                </Alert>
                
                }
                <form noValidate onSubmit={handleSubmit(handleLoginSubmit)} id="login_form">
                    <Stack gap={3} className="m-3">

                        <TextField
                            label="Username"
                            type="text"
                            {...register("username")}
                            error={usernameError}
                            helperText={usernameError && "Username field can't be empty"}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            {...register("password")}
                            error={passwordError}
                            helperText={passwordError && "Password field can't be empty"}
                        />

                    </Stack>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    className="w-100"
                    variant="contained"
                    type="submit"
                    form="login_form"
                    disabled={isSubmitting}
                >
                    Login
                </Button>
            </Modal.Footer>

        </Modal>
    )
}
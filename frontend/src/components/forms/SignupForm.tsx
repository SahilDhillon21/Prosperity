import { Button, Stack, TextField } from "@mui/material"
import { useState } from "react"
import { useForm } from 'react-hook-form'
import { signUp } from "../../network/user.network"

interface SignupCredentials {
  username: string,
  email: string,
  password: string
}

export const SignupForm = () => {
  const form = useForm<SignupCredentials>({
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  })

  const { register, handleSubmit } = form

  const [usernameError, setUsernameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const onSignupFormSubmit = async (data: SignupCredentials) => {
    setPasswordError(false)
    setEmailError(false)
    setUsernameError(false)
    const {username, email, password} = data
    if (username.length <= 3) {
      setUsernameError(true)
    }

    const emailRegex = /^\S+@\S+\.\S+$/

    if (!emailRegex.test(email) || email === ''){
      setEmailError(true)
    }

    if(password.length <=3){
      setPasswordError(true)
    }

    if(usernameError || passwordError || emailError) return

    const newUser = signUp(data)
    console.log(newUser);
  }

  return (
    <>
      <h1>Sign up</h1>

      <form onSubmit={handleSubmit(onSignupFormSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField 
          label="Username" 
          type="text" 
          {...register("username")} 
          error={usernameError}
          helperText = {usernameError && "Username must be at least 3 characters long"}
          />

          <TextField 
          label="Email" 
          type="email" 
          {...register("email")} 
          helperText = {emailError && "Email must be valid"}
          error={emailError}
          
          />

          <TextField 
          label="Password" 
          type="password" 
          {...register("password")} 
          helperText={passwordError && "Password must be at least 4 character long"}
          error={passwordError}
          
          />

          <Button type="submit" variant="contained" color="secondary">
            Sign up
          </Button>
        </Stack>
      </form>
    </>
  )
}
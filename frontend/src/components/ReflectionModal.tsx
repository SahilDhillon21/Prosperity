import { Button, Stack, TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as HabitNetwork from '../network/habit.network';


interface ReflectionModalProps {
    onDismiss: () => void,
    onReflectionSaved: (reflection: string) => void,
    habitId: string,
}

export const ReflectionModal = ({ onDismiss, onReflectionSaved, habitId }: ReflectionModalProps) => {

    const form = useForm()
    const { register, handleSubmit, formState: { isSubmitting } } = form

    const handleReflectionSubmit = async (data: any) => {
        const { reflection } = data

        try {
            await HabitNetwork.callCompleteHabit(habitId, reflection)
            // add some functionality to show tick mark in the ui
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Modal show onHide={onDismiss}>

            <Modal.Header closeButton>
                <Modal.Title>
                    Good job!
                </Modal.Title>

            </Modal.Header>

            <Modal.Body>
                <h6 style={{color: 'black'}}>Add a reflection to record how you felt, anything you noticed, plans for the future etc</h6>
                <form noValidate id="reflection-form" onSubmit={handleSubmit(handleReflectionSubmit)}>

                    <Stack gap={2}>

                        <TextField
                            label="Reflection"
                            {...register('reflection')}
                            multiline
                            rows={4}
                        />

                    </Stack>

                </form>

                <Modal.Footer>
                    <Button disabled={isSubmitting} variant="contained" color="success" type="submit" form="reflection-form">
                        Save
                    </Button>
                </Modal.Footer>


            </Modal.Body>

        </Modal>


    )
}

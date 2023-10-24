import { Modal, Stack } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { useForm } from "react-hook-form";
import { useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import Habit from '../models/habit.model';
import * as HabitNetwork from '../network/habit.network'

interface CreateEditHabitProps {
    onDismiss: () => void,
    habitToEdit?: Habit | null,
    onHabitSaved: (newHabit: Habit) => void,
}

export interface CreateEditHabitFormProps {
    name: string,
    description?: string,
    timeValue?: Dayjs | null,
    habitId?: string
}

export const CreateEditHabit = ({ onDismiss, habitToEdit, onHabitSaved }: CreateEditHabitProps) => {

    const form = useForm({
        defaultValues: {
            name: habitToEdit?.name || '',
            description: habitToEdit?.description || '',
            time: habitToEdit?.time || '',
        }
    })

    const { register, handleSubmit, formState: { isSubmitting } } = form

    const [nameError, setNameError] = useState(false)

    const [timeValue, setTimeValue] = useState<Dayjs | null>(dayjs(new Date()))

    const onCreateEditHabitSubmit = async (data: CreateEditHabitFormProps) => {
        const { name, description } = data

        setNameError(false)

        var hasError = false
        if (!name || name.length < 1) {
            hasError = true
            setNameError(true)
        }

        if (hasError) {
            console.log("error in form!");
            return
        }

        data["timeValue"] = timeValue

        if (habitToEdit) {
            data["habitId"] = habitToEdit._id
        }

        try {

            let newHabit
            if (habitToEdit) {
                newHabit = await HabitNetwork.callUpdateHabit(data)
            } else {
                newHabit = await HabitNetwork.callCreateHabit(data)
            }

            onHabitSaved(newHabit)

        } catch (error) {
            console.log(error);
        }

        console.log("name: " + name);
        console.log("description: " + description);
        console.log("time: " + timeValue?.format('h:mm A  '));
    }

    return (
        <>
            <Modal show onHide={onDismiss}>

                <Modal.Header closeButton>
                    <Modal.Title>
                        {habitToEdit ? `Edit ${habitToEdit.name}` : "Create habit"}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form noValidate className='m-3' id='createEditHabitForm' onSubmit={handleSubmit(onCreateEditHabitSubmit)}>

                        <Stack gap={3}>

                            <h3 className='mb-0'>Name</h3>
                            <TextField
                                label="Name"
                                variant='filled'
                                error={nameError}
                                helperText={nameError && "Name cannot be empty"}
                                {...register("name")}
                            />

                            <h3 className='mb-0 mt-4'>Description</h3>
                            <TextField
                                multiline
                                rows={5}
                                label="Description"
                                {...register("description")}
                            />

                            <h3 className='mb-0 mt-4'>Set time to complete this habit</h3>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <MobileTimePicker value={timeValue} onChange={(newValue) => setTimeValue(newValue)} />

                            </LocalizationProvider>
                        </Stack>

                    </form>
                </Modal.Body>

                <Modal.Footer >
                    <Button disabled={isSubmitting} type='submit' variant='contained' form='createEditHabitForm' className='w-100 mt-2'>
                        <h3 className='m-0'>{habitToEdit ? "Save" : "Create"}</h3>
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

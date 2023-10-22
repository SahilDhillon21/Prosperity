import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Task from '../models/task.model';
import * as TodoNetwork from "../network/todo.network";
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';


interface TaskCreatorEditorProps {
    onDismiss: () => void,
    taskToEdit: Task | null,
    onTaskSaved: (newTask: Task, createTask: boolean) => void,
}

export const TaskCreatorEditor = ({ onDismiss, taskToEdit, onTaskSaved }: TaskCreatorEditorProps) => {
    const form = useForm({
        defaultValues: {
            title: taskToEdit?.title || '',
            description: taskToEdit?.description || '',
        }
    })

    var oldDate

    // 2022-04-17T15:30

    if (taskToEdit && taskToEdit.target) {
        oldDate = taskToEdit.target.toString().substring(0, 16)
    } else {
        oldDate = ''
    }

    const initialDate = oldDate === '' ? null : dayjs(oldDate)

    const [datevalue, setDateValue] = useState<Dayjs | null>(initialDate);

    const [titleError, setTitleError] = useState(false)
    const [dateError, setDateError] = useState(false)


    const { register, handleSubmit, formState: { isSubmitting } } = form

    const createEditTask = async (data: any) => {

        var hasError = false

        if (!data.title || data.title.length < 1) {
            hasError = true
            setTitleError(true)
        }


        if (datevalue) {
            let today = new Date()
            let pickedDate = new Date(datevalue.toString())

            if(pickedDate < today){
                hasError = true
                setDateError(true)
            }
        }

        if(hasError) return


        try {
            var newTask
            if (taskToEdit) {
                newTask = await TodoNetwork.callUpdateTask(data, datevalue, taskToEdit._id)
                onTaskSaved(newTask, false)
            } else {
                newTask = await TodoNetwork.callCreateTask(data, datevalue)
                onTaskSaved(newTask, true)

            }
            setDateValue(null)
            return
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal show onHide={() => onDismiss()}>

            <Modal.Header closeButton>
                <h3>{taskToEdit ? "Edit task" : "Create new task"} </h3>
            </Modal.Header>

            <Modal.Body>
                <form className='m-3' onSubmit={handleSubmit(createEditTask)} noValidate>

                    <Stack gap={3}>
                        <TextField
                            label="Title"
                            required
                            error={titleError}
                            helperText={titleError && "Title cannot be empty"}
                            defaultValue={taskToEdit?.title || ''}
                            {...register("title")}
                        />

                        <TextField
                            label="Description"
                            minRows={2}
                            multiline
                            defaultValue={taskToEdit ? taskToEdit.description : ''}
                            {...register("description")}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="To be completed before"
                                defaultValue={dayjs(oldDate)}
                                value={datevalue} onChange={(newValue) => setDateValue(newValue)}
                            />
                            <p style={{color: 'red'}}> {dateError && "Date cannot be older than today"} </p>
                        </LocalizationProvider>

                        <Button style={{ background: 'green' }} type="submit" disabled={isSubmitting}>
                            <h5>Save</h5>
                        </Button>

                    </Stack>

                </form>
            </Modal.Body>

        </Modal>
    )
}

import DoneIcon from '@mui/icons-material/Done';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import TaskModel from "../models/task.model";
import * as TodoNetwork from "../network/todo.network";
import { Dayjs } from 'dayjs';
import { formatDate } from '../utils/formateDate';

interface TodoProps {
    userId: string
}

export interface TaskProps {
    title: string,
    description: string,
}

const Todo = ({ userId }: TodoProps) => {

    const form = useForm()

    const { register, handleSubmit, formState: { isSubmitting } } = form

    const [todo, setTodo] = useState<TaskModel[]>([])

    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false)

    const [datevalue, setDateValue] = useState<Dayjs | null>(null);

    function getDefaultDate() {
        const today = new Date();
        today.setHours(23, 59, 0, 0); // Set to 11:59 PM

        // Format the date to 'YYYY-MM-DD' for input type 'date'
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
        const day = today.getDate().toString().padStart(2, '0');
        const hours = today.getHours().toString().padStart(2, '0');
        const minutes = today.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    const createTask = async (data: any) => {
        try {
            await TodoNetwork.callCreateTask(data, datevalue)
            setShowCreateTaskModal(false)
            return
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        async function fetchTodo() {
            try {
                const taskList = await TodoNetwork.getTodo(userId)
                setTodo(taskList)
            } catch (error) {
                console.log("can't fetch todo (component todo useEffect error)");
            }
        }

        fetchTodo()

    }, [userId, todo])


    return (
        <Container className='m-2'>
            <Container className='mb-3'>
                {todo.length > 0 ?
                    <>
                        {todo.map((task, index) => (
                            <Row className='mt-2' key={task._id}>

                                <Col xs={1} md={1} lg={1} style={{ border: "2px solid black", color: "black" }} className='d-flex align-items-center justify-content-center'>
                                    <h2>{index + 1}</h2>
                                </Col>

                                <Col xs={11} md={10} lg={10} className='p-2' style={{ background: "black", color: "white" }}>
                                    <h3>{task.title}</h3>
                                    <h6>{task.description}</h6>
                                    {task.target
                                        &&
                                        <p style={{ color: 'green' }}>To be completed before: {" "+ formatDate(task.target.toString()) }
                                            
                                        </p>
                                    }
                                </Col>

                                <Col xs={12} md={1} lg={1} className='p-2 text-center d-flex align-items-center justify-content-center' style={{ background: "black", color: "white" }}>
                                    {/* add on click to complete tasks to this button i.e. delete from database */}
                                    <Button variant='success' style={{ margin: 0 }}>
                                        <DoneIcon />
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                    </>

                    :

                    <h4>No tasks</h4>
                }
            </Container>

            <Button onClick={() => setShowCreateTaskModal(true)}>+ Add task  </Button>

            <Modal show={showCreateTaskModal} onHide={() => setShowCreateTaskModal(false)}>

                <Modal.Header closeButton>
                    <h3>Create new task </h3>
                </Modal.Header>

                <Modal.Body>
                    <form className='m-3' onSubmit={handleSubmit(createTask)} noValidate>

                        <Stack gap={3}>
                            <TextField
                                label="Title"
                                required
                                {...register("title")}
                            />

                            <TextField
                                label="Description"
                                minRows={2}
                                multiline
                                {...register("description")}
                            />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="To be completed before"
                                    value={datevalue} onChange={(newValue) => setDateValue(newValue)}
                                />
                            </LocalizationProvider>

                            <Button style={{ background: 'green' }} type="submit" disabled={isSubmitting}>
                                <h5>Create</h5>
                            </Button>

                        </Stack>

                    </form>
                </Modal.Body>

            </Modal>

        </Container>
    );
}

export default Todo;

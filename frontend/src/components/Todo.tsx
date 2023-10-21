import DoneIcon from '@mui/icons-material/Done';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import TaskModel from "../models/task.model";
import * as TodoNetwork from "../network/todo.network";
import { formatDate } from '../utils/formateDate';
import { TaskCreatorEditor } from './TaskCreatorEditor';


interface TodoProps {
    userId: string
}

export interface TaskProps {
    title: string,
    description: string,
}

const Todo = ({ userId }: TodoProps) => {
    const [taskToEdit, setTaskToEdit] = useState<TaskModel | null>(null)

    const [todo, setTodo] = useState<TaskModel[]>([])

    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false)


    const handleTaskComplete = async (taskId: any) => {
        try {
            await TodoNetwork.callCompleteTask(taskId)
            setTodo(todo.filter(existingTask => existingTask._id !== taskId))
            setTaskToEdit(null)
        } catch (error) {
            console.log("network error - couldn't complete task");
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

    }, [userId])


    return (
        <Container className='m-2'>
            <Container className='mb-3'>
                {todo.length > 0 ?
                    <>
                        {todo.map((task, index) => (
                            <Row className='mt-2' key={task._id} style={{ cursor: 'pointer' }} onClick={() => {
                                setTaskToEdit(task)
                                setShowCreateTaskModal(true)
                            }}>

                                <Col xs={1} md={1} lg={1} style={{ border: "2px solid black", color: "black" }} className='d-flex align-items-center justify-content-center'>
                                    <h2>{index + 1}</h2>
                                </Col>

                                <Col xs={11} md={10} lg={10} className='p-2' style={{ background: "black", color: "white" }}>
                                    <h3>{task.title}</h3>
                                    <h6>{task.description}</h6>
                                    {task.target
                                        &&
                                        <p style={{ color: 'green' }}>To be completed before: {" " + formatDate(task.target.toString())}

                                        </p>
                                    }
                                </Col>

                                <Col xs={12} md={1} lg={1} className='p-2 text-center d-flex align-items-center justify-content-center' style={{ background: "black", color: "white" }}>
                                    {/* add on click to complete tasks to this button i.e. delete from database */}
                                    <Button variant='success' style={{ margin: 0 }} onClick={(e) => {
                                        handleTaskComplete(task._id)
                                        setTaskToEdit(null)
                                        e.stopPropagation()
                                    }}>
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

            <Button onClick={() => {
                setTaskToEdit(null)
                setShowCreateTaskModal(true)
            }}>+ Add task  </Button>

            {showCreateTaskModal &&
                <TaskCreatorEditor
                    onDismiss={() => setShowCreateTaskModal(false)}
                    taskToEdit={taskToEdit}
                    onTaskSaved={(newTask) => {
                        setShowCreateTaskModal(false)
                        setTodo([...todo, newTask])
                    }}
                />
            }
        </Container>
    );
}

export default Todo;

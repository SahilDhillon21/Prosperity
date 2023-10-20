import { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import TaskModel from "../models/task.model"
import User from '../models/user.model';
import * as TodoNetwork from "../network/todo.network"
import DoneIcon from '@mui/icons-material/Done';

interface TodoProps {
    userId: string
}

const Todo = ({ userId }: TodoProps) => {

    const [todo, setTodo] = useState<TaskModel[]>([])

    const createTask = async () => {
        try {
            const newTask = await TodoNetwork.callCreateTask()
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

    }, [userId])


    return (
        <Container className='m-2'>

            <Button onClick={createTask}>
                Create task
            </Button>

            {todo.length > 0 ?
                <>
                    {todo.map((task,index) => (
                        <Row className='mt-2' key={task._id}>

                            <Col xs={1} md={1} lg={1} style={{ border: "2px solid black", color: "black" }} className='d-flex align-items-center justify-content-center'>
                                <h2>{index + 1}</h2>
                            </Col>

                            <Col xs={11} md={10} lg={10} className='p-2' style={{ background: "black", color: "white" }}>
                                <h3>{task.title}</h3>
                                <h6>{task.description}</h6>
                            </Col>

                            <Col xs={12} md={1} lg={1} className='p-2 text-center d-flex align-items-center justify-content-center' style={{ background: "black", color: "white" }}>
                                {/* add on click to complete tasks to this button i.e. delete from database */}
                                <Button variant='success' style={{margin: 0}}>
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
    );
}

export default Todo;

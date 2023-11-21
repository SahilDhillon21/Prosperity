import { Button, CloseButton, Col, Row } from "react-bootstrap";
import User from "../models/user.model"
import { Autocomplete, Box, Paper, Stack, TextField, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from 'react';


interface CreateGroupProps {
    allUsers: User[],
}

const CreateGroup = ({ allUsers }: CreateGroupProps) => {
    const navigate = useNavigate()

    const [userValue, setUserValue] = useState<User | null>(null)

    const [defaultDescriptionValue, setDefaultDescriptionValue] = useState("")

    const handleCreateGroup = async (e: FormEvent) => {

    }

    return (
        <Row className='justify-content-center'>

            <Col xs={6} md={6} lg={6} className='text-center p-3 m-1'>
                <Paper elevation={1} className='bg-dark text-light text-center'>

                    <form onSubmit={(e) => handleCreateGroup(e)} className='text-white m-3'>

                        <Row className='py-4'>
                            <Col className='offset-2 text-center' md={8}>
                                <h3>Share expenses</h3>
                            </Col>
                            <Col>
                                <CloseButton
                                    className='bg-light'
                                    onClick={() => navigate('/finances', { replace: true })}
                                />
                            </Col>
                        </Row>

                        <Stack gap={1} spacing={1} className="mb-4 text-center">
                            <h6 className="m-0 p-0">Name</h6>
                            <TextField
                                sx={{ width: "50%", alignSelf: 'center', background: "white", border: "none" }}
                            />

                            <h6 className="m-0 p-0">Add members</h6>
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={allUsers}
                                getOptionLabel={(option) => option.username}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        placeholder="Favorites"
                                    />
                                )}
                            />

                        </Stack>

                        <Row className='my-2 pb-3'>
                            <Col lg={12}>
                                <h6>Group description</h6>
                                <TextField
                                    multiline
                                    className='w-75'
                                    sx={{ backgroundColor: 'white' }}
                                    minRows={3}
                                    value={defaultDescriptionValue}
                                    onChange={(e) => setDefaultDescriptionValue(e.target.value)}
                                />
                            </Col>
                        </Row>

                        <Row className='my-2 pb-3'>
                            <Col lg={12}>

                                <Button type='submit'
                                    style={{ border: "2px solid black" }}
                                    className='bg-light text-dark'>
                                    <h6 className='m-0'>Create</h6>
                                </Button>

                            </Col>
                        </Row>


                    </form>

                </Paper>
            </Col>

        </Row >
    )
}

export default CreateGroup
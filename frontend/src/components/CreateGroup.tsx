import { Autocomplete, Avatar, LinearProgress, ListItem, ListItemAvatar, ListItemText, Paper, Stack, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import { FormEvent, useState } from 'react';
import { Button, CloseButton, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import User from "../models/user.model";
import { createGroup } from '../network/finance.network';


interface CreateGroupProps {
    allUsers: User[],
    onGroupCreated: (msg: string) => void,
    render: Boolean,
    loggedInUser: User | null,
}

const CreateGroup = ({ allUsers, onGroupCreated, render, loggedInUser }: CreateGroupProps) => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [selectedUsersError, setSelectedUsersError] = useState(false)

    const [groupName, setGroupName] = useState("")
    const [groupNameError, setGroupNameError] = useState(false)

    const handleAutocompleteChange = (event: React.ChangeEvent<{}>, value: User[]) => {
        setSelectedUsers(value);
    };

    const [descriptionValue, setDescriptionValue] = useState("")

    const handleCreateGroup = async (e: FormEvent) => {
        e.preventDefault()

        var hasError = false

        if (groupName.length < 3) {
            setGroupNameError(true)
            hasError = true
        }

        if (selectedUsers.length === 0) {
            setSelectedUsersError(true)
            hasError = true
        }

        if (hasError) return

        setLoading(true)
        setTimeout(async () => {
            await createGroup({ groupName, selectedUsers, descriptionValue })
            setLoading(false)
            navigate('/finances', { replace: true })
            onGroupCreated("Group " + groupName + " was added")
        }, 3000)

    }

    const loader =
        <div className="m-4">
            <h3 className="pt-3">Creating group &nbsp;
                <img width="50" height="50" src="https://img.icons8.com/stickers/100/group-foreground-selected.png" alt="group-foreground-selected" />
            </h3>
            <br />
            <LinearProgress className="mb-3" />
            <br />
        </div>

    return (
        <Row className='justify-content-center'>

            <Col xs={6} md={6} lg={6} className='text-center p-3 m-1'>
                <Paper elevation={1} className='bg-dark text-light text-center'>

                    {loading ? loader
                        :
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
                                <h6 className="m-0 p-0">Group name</h6>
                                <TextField
                                    sx={{ width: "80%", alignSelf: 'center', background: "white", border: "none" }}
                                    value={groupName}
                                    onChange={(v) => setGroupName(v.target.value)}
                                    error={groupNameError}
                                    helperText={groupNameError && "Group name must be atleast 3 characters long"}
                                />

                                <h6>Add members</h6>
                                <Autocomplete
                                    multiple
                                    id="tags-standard"
                                    options={allUsers}
                                    size="medium"
                                    sx={{ backgroundColor: 'white', width: '80%', alignSelf: 'center' }}
                                    getOptionLabel={(option) => option.username}
                                    renderOption={(props, option) => (
                                        <ListItem {...props}>
                                            <ListItemAvatar>
                                                <Avatar alt={option.username} src={option.image} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="subtitle1" fontWeight="bold">
                                                        {option.username}
                                                    </Typography>
                                                }
                                                secondary={`${option.accountId}`}
                                            />
                                        </ListItem>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Username"
                                            helperText={selectedUsersError && "Please select one or more users"}
                                            error={selectedUsersError}
                                        />
                                    )}
                                    onChange={handleAutocompleteChange}
                                    value={selectedUsers}
                                />

                            </Stack>

                            <Row className='my-2 pb-3'>
                                <Col lg={12}>
                                    <h6>Group description</h6>
                                    <TextField
                                        multiline
                                        sx={{ backgroundColor: 'white', width: "80%" }}
                                        minRows={3}
                                        value={descriptionValue}
                                        onChange={(e) => setDescriptionValue(e.target.value)}
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


                        </form>}

                </Paper>
            </Col>

        </Row >
    )
}

export default CreateGroup
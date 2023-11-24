import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Avatar, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { FormEvent, useState } from 'react';
import { Button, CloseButton, Col, Row } from 'react-bootstrap';
import { Radio } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import User from '../models/user.model';
import * as FinanceNetwork from '../network/finance.network';

interface CreateDueProps {
    onDueCreated: (reciever: string, amount: number) => void,
    allUsers: User[],
}



const CreateDue = ({ allUsers, onDueCreated }: CreateDueProps) => {

    const navigate = useNavigate()

    const [type, setType] = useState("Borrowed")
    const [personText, setPersonText] = useState("From")

    const handleTypeChange = (event: SelectChangeEvent) => {
        const T = event.target.value as string
        setType(T);
        if (T === "Borrowed") setPersonText("from")
        else setPersonText("To")
    };

    const [loading, setLoading] = useState(false)

    const [userValue, setUserValue] = useState<User | null>(null)

    const [amount, setAmount] = useState<number>(1)
    const [amountError, setAmountError] = useState(false)

    const handleAmountChange = (event: any) => {
        setAmount(event.target.value)
    }

    const [noteValue, setNoteValue] = useState("")

    const dueLoader =

        <div className='text-center align-items-center pt-3 pb-2' style={{
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <h3>Informing {userValue?.username}... <img width="25" height="25" src="https://img.icons8.com/color/96/commercial.png" alt="informing" /></h3>
            <Radio
                visible={true}
                height="80"
                width="80"
                ariaLabel="radio-loading"
                colors={["#03C988", "#1C82AD", "#00337C"]}
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>

    const handleTransferMoney = (e: FormEvent) => {
        e.preventDefault()
        var hasError = false

        if (!userValue) return

        try {
            if (amount <= 0) {
                hasError = true
                setAmountError(true)
                return
            }

            if (hasError) return

            setLoading(true)

            setTimeout(async () => {

                await FinanceNetwork.createDue({
                    type,
                    userValue,
                    amount,
                    noteValue,
                })

                setLoading(false)

                onDueCreated(userValue.username, amount);

                navigate('/finances', {
                    replace: true
                })
            }, 2000)

        } catch (error) {
            console.log(error)
        }

    }


    return (
        <Row className='justify-content-center'>
            <Col xs={6} md={6} lg={6} className='text-center p-3 m-1'>
                <Paper elevation={1} className='bg-dark text-light text-center'>

                    {loading ?
                        dueLoader

                        :

                        <form onSubmit={(e) => handleTransferMoney(e)} className='text-white'>

                            <Row className='py-4'>
                                <Col className='offset-2 text-center' md={8}>
                                    <h3>Add due</h3>
                                </Col>
                                <Col>
                                    <CloseButton
                                        className='bg-light'
                                        onClick={() => navigate('/finances', { replace: true })}
                                    />
                                </Col>
                            </Row>

                            <Row className='py-4'>
                                <Col className='offset-2 text-center' md={8}>
                                    <Select
                                        value={type}
                                        className='bg-light'
                                        onChange={handleTypeChange}
                                    >
                                        <MenuItem value={"Borrowed"}>Borrowed</MenuItem>
                                        <MenuItem value={"Lent"}>Lent</MenuItem>
                                    </Select>
                                </Col>
                            </Row>

                            <Row className='pb-4'>
                                <Col md={4} xs={4} lg={4} className='offset-1'>
                                    <h6>Amount</h6>
                                    <TextField
                                        type='number'
                                        label='Amount'
                                        variant='filled'
                                        focused
                                        value={amount}
                                        onChange={handleAmountChange}
                                        sx={{ input: { color: 'white', fontSize: 'larger' } }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CurrencyRupeeIcon className='text-white' fontSize='small' />
                                                </InputAdornment>
                                            ),
                                        }}
                                        helperText={amountError && "Amount must be greater than zer0"}
                                        error={amountError}
                                    >

                                    </TextField>
                                </Col>

                                <Col md={6} xs={6} lg={6} className='text-center'>
                                    <h6>{personText}</h6>
                                    <Autocomplete
                                        id="country-select-demo"
                                        sx={{ input: { color: 'black' }, label: { color: 'black' } }}
                                        options={allUsers}
                                        autoHighlight
                                        value={userValue}
                                        onChange={(event: any, newValue: any | null) => {
                                            setUserValue(newValue);
                                        }}

                                        getOptionLabel={(user) => user.username}
                                        renderOption={(props, user) => (
                                            <ListItem {...props}>
                                                <ListItemAvatar>
                                                    <Avatar alt={user.username} src={user.image} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="subtitle1" fontWeight="bold">
                                                            {user.username}
                                                        </Typography>
                                                    }
                                                    secondary={`${user.accountId}`}
                                                />
                                            </ListItem>
                                        )}

                                        renderInput={(params) => (
                                            <TextField
                                                className='bg-light'
                                                {...params}
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password',
                                                }}
                                            />
                                        )}
                                    />

                                </Col>
                            </Row>

                            <Row className='my-2 pb-3'>
                                <Col lg={12}>
                                    <h6>Note</h6>
                                    <TextField
                                        multiline
                                        className='w-75 '
                                        sx={{ backgroundColor: 'white' }}
                                        minRows={3}
                                        value={noteValue}
                                        onChange={(e) => setNoteValue(e.target.value)}
                                    />
                                </Col>
                            </Row>

                            <Row className='my-2 pb-3'>
                                <Col lg={12}>

                                    <Button type='submit'
                                        style={{ border: "2px solid black" }}
                                        className='bg-light text-dark'>
                                        <h6 className='m-0'>Add</h6>
                                    </Button>

                                </Col>
                            </Row>


                        </form>

                    }
                </Paper>
            </Col>

        </Row >
    )
}

export default CreateDue
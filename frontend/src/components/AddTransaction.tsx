import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { MenuItem, Paper, Select, SelectChangeEvent, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { FormEvent, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { RotatingSquare } from 'react-loader-spinner';
import * as FinanceController from '../network/finance.network';
import { useNavigate } from 'react-router-dom';

interface AddTransactionProps {
    eCategories: Map<string, string>,
    iCategories: Map<string, string>,
    balance: number,
    onTransactionCreated: () => void,
}

const AddTransaction = ({ eCategories, iCategories, balance, onTransactionCreated }: AddTransactionProps) => {

    const navigate = useNavigate()

    const [type, setType] = useState("Expense")

    const handleTypeChange = (event: SelectChangeEvent) => {
        setType(event.target.value)
    }

    const [category, setCategory] = useState("Food and groceries")

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value)
    }

    const [amount, setAmount] = useState<number>(1)
    const [amountError, setAmountError] = useState(false)
    const [amountErrorText, setAmountErrorText] = useState("")

    const handleAmountChange = (event: any) => {
        setAmount(event.target.value)
    }

    const [defaultNoteValue, setDefaultNoteValue] = useState("erer")

    const [categoryDisplayList, setCategoryDisplayList] = useState(new Map())

    const [loading, setLoading] = useState(false)

    const transactionLoader =

        <div className='text-center align-items-center pt-3'>
            <h3>Making an entry... </h3>
            <RotatingSquare
                height="100"
                width="100"
                color="#00337C"
                ariaLabel="rotating-square-loading"
                strokeWidth="4"
                wrapperStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                wrapperClass="text-center"
                visible={true}
            />
        </div>

    useEffect(() => {
        if (type === "Expense") {
            setCategoryDisplayList(eCategories)
        } else {
            setCategory("Salary")
            setCategoryDisplayList(iCategories)
        }

    }, [type, eCategories, iCategories])

    useEffect(() => {
        var noteValue

        if (type === "Expense") {
            noteValue = "Spent ₹" + amount + " on " + category
        } else {
            noteValue = "Earned ₹" + amount + " from " + category
        }

        setDefaultNoteValue(noteValue)

    }, [type, category, amount])

    const handleCreateTransaction = async (e: FormEvent) => {
        e.preventDefault()
        var hasError = false

        try {
            if (amount <= 0) {
                hasError = true
                setAmountError(true)
                setAmountErrorText("Amount must be greater than 0")
                return
            }

            if (type === "Expense" && amount > balance) {
                hasError = true
                setAmountError(true)
                setAmountErrorText("Not enough balance!")
            }

            if (hasError) return

            setLoading(true)

            setTimeout(async () => {

                await FinanceController.createTransaction({ amount, type, category, defaultNoteValue })

                setLoading(false)

                onTransactionCreated();

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
                        transactionLoader

                        :

                        <form onSubmit={(e) => handleCreateTransaction(e)} className='text-white'>

                            <h3 className='py-2'>Add transaction</h3>

                            <Row className='pb-4'>
                                <Col md={8} xs={12} lg={8} >
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
                                        helperText={amountError && amountErrorText}
                                        error={amountError}
                                    >

                                    </TextField>
                                </Col>

                                <Col md={4} xs={12} lg={4} className='text-center'>
                                    <Select
                                        value={type}
                                        onChange={handleTypeChange}
                                        autoWidth
                                        label="Age"
                                        className='bg-white text-center'
                                    >

                                        <MenuItem value={"Expense"}>Expense</MenuItem>
                                        <MenuItem value={"Income"}>Income</MenuItem>

                                    </Select>
                                </Col>
                            </Row>

                            <Row className='pb-4'>

                                <Col md={12} lg={12} xs={12}>
                                    <h6>Category</h6>
                                    <Select
                                        value={category}
                                        onChange={handleCategoryChange}
                                        autoWidth
                                        label="Category"
                                        className='bg-white text-center w-75'
                                    >

                                        {Array.from(categoryDisplayList.entries()).map(([key, value]) => (
                                            <MenuItem value={key} key={key}>
                                                <img src={value} height={30} width={30} alt="" />
                                                <b className='mx-2'>{key}</b>
                                            </MenuItem>
                                        ))}

                                    </Select>
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
                                        value={defaultNoteValue}
                                        onChange={(e) => setDefaultNoteValue(e.target.value)}
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

export default AddTransaction
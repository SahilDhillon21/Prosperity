import { MenuItem, Paper, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Form, useForm } from 'react-hook-form'
import InputAdornment from '@mui/material/InputAdornment';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

interface AddTransactionProps {
    eCategories: Map<string, string>,
    iCategories: Map<string, string>,
}

const AddTransaction = ({ eCategories, iCategories }: AddTransactionProps) => {

    const form = useForm()

    const { register, handleSubmit, formState: { isSubmitting } } = form

    const [type, setType] = useState("Expense")

    const handleTypeChange = (event: SelectChangeEvent) => {
        setType(event.target.value)
    }

    const [category, setCategory] = useState("Food and groceries")

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value)
    }

    const [categoryDisplayList, setCategoryDisplayList] = useState(new Map())

    useEffect(() => {
        if (type === "Expense") {
            setCategoryDisplayList(eCategories)
        } else {
            setCategory("Salary")
            setCategoryDisplayList(iCategories)
        }

    }, [type, eCategories, iCategories])

    const handleCreateTransaction = async (data: any) => {

    }

    return (
        <Row className='justify-content-center'>

            <Col xs={6} md={6} lg={6} className='text-center p-3 m-1'>
                <Paper elevation={1} className='bg-dark text-light'>

                    <h3 className='py-2'>Add transaction</h3>

                    <form onSubmit={handleSubmit(handleCreateTransaction)} className='text-white'>


                        <Row className='pb-4'>
                            <Col md={8} xs={12} lg={8} >
                                <TextField
                                    type='number'
                                    label='Amount'
                                    variant='filled'
                                    focused
                                    sx={{ input: { color: 'white', fontSize: 'larger' } }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CurrencyRupeeIcon className='text-white' fontSize='small' />
                                            </InputAdornment>
                                        ),
                                    }}
                                >

                                </TextField>
                            </Col>

                            <Col md={4} xs={12} lg={4} className='text-center'>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
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
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={category}
                                    onChange={handleCategoryChange}
                                    autoWidth
                                    label="Age"
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


                    </form>

                </Paper>
            </Col>

        </Row >
    )
}

export default AddTransaction
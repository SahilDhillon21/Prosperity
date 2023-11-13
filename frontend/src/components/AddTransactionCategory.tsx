import { Stack, TextField } from '@mui/material'
import { Col, FormControl, Row } from 'react-bootstrap'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormEvent, useState } from 'react';

const AddTransactionCategory = () => {
    const [category, setCategory] = useState('Expense');

    const [image, setImage] = useState<File | null>(null)

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <Row className='text-white p-3 justify-content-center'>
            <Col xs={8} md={8} lg={8} className='bg-blue3 p-3 m-1'>
                <h4 className='text-center p-2'>Add new category</h4>
                <form onSubmit={(e) => handleSubmit(e)}>

                    <Stack gap={3}>

                        <Row>
                            <Col xs={12} md={10} lg={10} className='mb-3'>
                                <TextField
                                    color='primary'
                                    id="outlined-basic"
                                    label="Name"
                                    className='text-white bg-white w-100'
                                    variant="filled"
                                />
                            </Col>

                            <Col xs={12} md={2} lg={2} className='text-center mb-3'>
                                <Select
                                    labelId="demo-simple-select-label"
                                    value={category}
                                    onChange={handleCategoryChange}
                                    className='text-dark bg-light'
                                    color='primary'
                                >
                                    <MenuItem value={"Expense"}>Expense</MenuItem>
                                    <MenuItem value={"Income"}>Income</MenuItem>

                                </Select>
                            </Col>

                            <input type='file' required accept='image' id='image' onChange={(e) => setImage((prev) => {
                                if (!e.target.files) return null
                                return e.target.files[0]
                            })} />

                        </Row>

                    </Stack>

                </form>
            </Col>
        </Row>
    )
}

export default AddTransactionCategory
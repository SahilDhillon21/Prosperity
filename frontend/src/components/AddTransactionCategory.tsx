import { Button, Stack, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormEvent, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import * as FinanceNetwork from '../network/finance.network';
import { uploadFile } from '../utils/uploadFile';
import { ThreeDots } from 'react-bootstrap-icons';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';


const AddTransactionCategory = () => {
    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate()

    const [category, setCategory] = useState('Expense');
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)

    const [loading, setLoading] = useState(false)

    const [image, setImage] = useState<File | null>(null)
    const [imageError, setImageError] = useState(false)

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {

            var hasError = false

            if (!image) {
                hasError = true
                setImageError(true)
                return
            }

            if (name.length < 1) {
                hasError = true
                setNameError(true)
            }

            if (hasError) return

            setImageError(false)
            setLoading(true)

            const imgURL = await uploadFile(image, "transaction_category_preset")

            console.log(imgURL)

            await FinanceNetwork.addCategory({ name, category, imgURL })

            const preText = category === 'Income' ? "New source of income " : "New expense category "

            enqueueSnackbar(preText + name + " was added ", { variant: 'info' })

            navigate('/finances', { replace: true })
        } catch (error) {
            console.log(error)
        }
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
                                    helperText={nameError && "Category name can't be empty"}
                                    error={nameError}
                                    onChange={(e) => setName(e.target.value)}
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

                            <label htmlFor="image">Category image</label>
                            <input type='file' required accept='image' id='image' onChange={(e) => setImage(() => {
                                if (!e.target.files) return null
                                return e.target.files[0]
                            })} />
                            {imageError && <p style={{ color: 'red' }}>Category must have an image</p>}

                        </Row>

                        <Row>
                            <Col xs={12} md={12} lg={12} className='text-center'>
                                {loading ?
                                    <ThreeDots
                                        height="80"
                                        width="80"
                                        radius="9"
                                        color="#4fa94d"
                                        //@ts-ignore
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClassName=""
                                        visible={true}
                                    />
                                    :
                                    <Button type='submit' className='w-100' variant='contained' color='success'>Add</Button>
                                }
                            </Col>
                        </Row>

                    </Stack>

                </form>
            </Col>
        </Row>

    )
}

export default AddTransactionCategory
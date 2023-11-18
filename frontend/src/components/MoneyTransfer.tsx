import { Button, CloseButton, Col, Row } from 'react-bootstrap';
import { Paper, Select, SelectChangeEvent, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useNavigate } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import { FormEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import * as UserNetwork from '../network/user.network'
import User from '../models/user.model';

interface MoneyTransferProps {
  balance: number,
  onMoneyTransferred: () => void,
}

const MoneyTransfer = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [userValue, setUserValue] = useState<User|null>(null)

  const [allUsers, setAllUsers] = useState<User[]>([])

  const [amount, setAmount] = useState<number>(1)
  const [amountError, setAmountError] = useState(false)
  const [amountErrorText, setAmountErrorText] = useState("")

  const handleAmountChange = (event: any) => {
    setAmount(event.target.value)
  }

  const transactionLoader =

    <div className='text-center align-items-center pt-3' style={{
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <h3>Sending money <img width="25" height="25" src="https://img.icons8.com/fluency/96/filled-sent.png" alt="filled-sent" /></h3>
      <FallingLines
        color="#03C988"
        width="100"
        visible={true}
      />
    </div>

  const handleTransferMoney = (e: FormEvent) => {
    e.preventDefault()
  }

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const users = await UserNetwork.getAllUsers()
        setAllUsers(users)
      } catch (error) {
        console.log(error)
      }
    }

    getAllUsers()
  }, [])

  return (
    <Row className='justify-content-center'>

      <Col xs={6} md={6} lg={6} className='text-center p-3 m-1'>
        <Paper elevation={1} className='bg-dark text-light text-center'>

          {loading ?
            transactionLoader

            :

            <form onSubmit={(e) => handleTransferMoney(e)} className='text-white'>

              <Row className='py-4'>
                <Col className='offset-2 text-center' md={8}>
                  <h3>Transfer</h3>
                </Col>
                <Col>
                  <CloseButton
                    className='bg-light'
                    onClick={() => navigate('/finances', { replace: true })}
                  />
                </Col>
              </Row>

              <Row className='pb-4'>
                <Col md={5} xs={5} lg={5} className='offset-1'>
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
                    helperText={amountError && amountErrorText}
                    error={amountError}
                  >

                  </TextField>
                </Col>

                <Col md={5} xs={5} lg={5} className='text-center'>
                  <h6>To</h6>
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
                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                          loading="lazy"
                          width="20"
                          // src={user.image}
                          alt=""
                        />
                        {user.username} <hr />
                        {user.accountId}
                      </Box>
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
                  <h6>Remarks</h6>
                  <TextField
                    multiline
                    className='w-75 '
                    sx={{ backgroundColor: 'white' }}
                    minRows={3}
                  />
                </Col>
              </Row>

              <Row className='my-2 pb-3'>
                <Col lg={12}>

                  <Button type='submit'
                    style={{ border: "2px solid black" }}
                    className='bg-light text-dark'>
                    <h6 className='m-0'>Send</h6>
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

export default MoneyTransfer
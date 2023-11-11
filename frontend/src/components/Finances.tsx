import { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import User from '../models/user.model'
import * as FinanceNetwork from '../network/finance.network'
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { useForm } from 'react-hook-form';

interface FinanceProps {
  user: User | null
}

function Finances({ user }: FinanceProps) {

  const [balance, setBalance] = useState(0)
  const [showEditBalanceBox, setShowEditBalanceBox] = useState(false)

  document.body.style.backgroundColor = "#00337C"

  // BALANCE AREA VARIABLE
  const balanceArea =
    <span className='mx-1'

      onMouseOver={() => document.getElementById('edit-icon')?.classList.remove('d-none')}
      onMouseOut={() => document.getElementById('edit-icon')?.classList.add('d-none')}

    >

      ₹{balance === 0 ?

        <Spinner animation="grow" className='mx-2 my-1' size="sm" variant="success" /> :
        balance?.toString()
      }
      <span id='edit-icon' className='d-none' style={{ cursor: 'pointer' }} onClick={() => setShowEditBalanceBox(true)}>
        <SaveAsIcon
          className='mx-1 mb-1'
          fontSize='small'
        />
      </span>
    </span>

  // BALANCE FORM VARIABLE 

  const handleSetBalance = async (data: any) => {
    const { amt } = data
    if (user) {
      if (amt < 0) {
        alert("Amount can't be less than zero!")
        return
      }
      const transaction = await FinanceNetwork.setBalance(user.accountId, amt)
      setBalance(amt)
      setShowEditBalanceBox(false)
      // logic to add this transaction to the transaction list live
    }
  }

  const form = useForm()
  const { register, handleSubmit, formState: { isSubmitting } } = form

  const setBalanceForm =
    <form className='bg-blue2 d-inline mx-2 my-0 p-0' id='setBalanceForm' onSubmit={handleSubmit(handleSetBalance)}>
      <input className='text-green bg-dark m-0' style={{ width: '40%', height: '20%' }} type="text" defaultValue={balance} {...register('amt')} />
      <span>
        <Button type="submit" className='bg-transparent hover-green border-0 p-1'>
          <DoneIcon />
        </Button>
      </span>

      <span>

        <Button  disabled={isSubmitting}
        className='bg-transparent hover-red border-0 p-1' onClick={() => setShowEditBalanceBox(false)}>
          <ClearIcon />
        </Button>

      </span>

    </form>


  useEffect(() => {
    const getDetails = async () => {
      if (user) {
        const accountBalance = await FinanceNetwork.getBalance(user.accountId)
        setBalance(accountBalance)
      }
    }

    getDetails()

  }, [user])

  return (
    <Container className='mt-5 px-5 finance'>
      {user ?
        <>
          <Row className='mb-1'>
            <Col xs={7} md={7} lg={7}>
              <h4 className='text-uppercase'>{user.username}'s account</h4>
            </Col>

            <Col xs={5} md={5} lg={5}

            >
              <h4 className='align-middle m-0'>Balance:
                {showEditBalanceBox ?

                  setBalanceForm :
                  balanceArea
                }
              </h4>

            </Col>
          </Row>

          <Row className='bg-blue1 p-3 '>
            <Col xs={12} md={12} lg={12}>
              <h4 className='text-center'>My Expenses</h4>
            </Col>
          </Row>
        </>
        :
        <h5>Log in now to start tracking your finances!</h5>
      }
    </Container>
  )
}

export default Finances
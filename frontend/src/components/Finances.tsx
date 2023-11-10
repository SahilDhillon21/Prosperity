import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import User from '../models/user.model'
import * as FinanceNetwork from '../network/finance.network'

interface FinanceProps {
  user: User | null
}

function Finances({ user }: FinanceProps) {

  const [balance, setBalance] = useState(0)

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
          <Row>
            <Col xs={8} md={8} lg={8}>
              <h4 className='text-uppercase'>{user.username}'s account</h4>
            </Col>

            <Col xs={4} md={4} lg={4}>
              <h4>Balance: <span>₹{balance.toString()}</span></h4>
            </Col>
          </Row>

          <Row className='bg-blue1 p-3'>
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
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { actions } from '../constants';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { CiSquarePlus } from 'react-icons/ci';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { baseExpenseCategories, baseIncomeCategories } from '../constants';
import Account from '../models/account.model';
import User from '../models/user.model';
import * as FinanceNetwork from '../network/finance.network';
import * as UserNetwork from '../network/user.network';
import AddTransaction from './AddTransaction';
import AddTransactionCategory from './AddTransactionCategory';
import CreateGroup from './CreateGroup';
import Groups from './Groups';
import MoneyTransfer from './MoneyTransfer';
import TransactionCard from './TransactionCard';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import CreateDue from './CreateDue';


interface FinanceProps {
  user: User | null
}

function Finances({ user }: FinanceProps) {
  const navigate = useNavigate()

  const [allUsers, setAllUsers] = useState<User[]>([])

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

  const [balance, setBalance] = useState(-1)
  const [showEditBalanceBox, setShowEditBalanceBox] = useState(false)

  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    const getAccount = async () => {
      const acc = await FinanceNetwork.getCurrentAccount()
      setAccount(acc)
      setBalance(acc.balance)
    }

    getAccount()
  }, [])

  document.body.style.backgroundColor = "#00337C"

  // BALANCE AREA VARIABLE
  const balanceArea =
    <span className='mx-1'

      onMouseOver={() => document.getElementById('edit-icon')?.classList.remove('d-none')}
      onMouseOut={() => document.getElementById('edit-icon')?.classList.add('d-none')}

    >

      ₹{balance === -1 ?

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


  const [reRenderTransactionCard, setReRenderTransactionCard] = useState(false)
  // Whenever this value changes, we want to re render the transaction card to include the latest transaction

  const [reRenderGroups, setReRenderGroups] = useState(false)

  const handleSetBalance = async (data: any) => {
    const { amt } = data
    if (user) {
      if (amt < 0) {
        alert("Amount can't be less than zero!")
        return
      }
      await FinanceNetwork.setBalance(user.accountId, amt)
      setBalance(amt)
      setShowEditBalanceBox(false)
      setReRenderTransactionCard(!reRenderTransactionCard)
    }
  }


  // Expense categories

  const [eCategories, setECategories] = useState<Map<string, string>>(new Map())
  const [iCategories, setICategories] = useState<Map<string, string>>(new Map())

  useEffect(() => {
    const addCategories = () => {
      const expcategories = account?.expenseCategories
      const incomecategories = account?.incomeCategories

      let finalECategories: Map<string, string> = new Map()

      baseExpenseCategories.forEach((value, key) => {
        finalECategories.set(key, value)
      })

      if (expcategories) {
        for (let i = 0; i < expcategories.length; i++) {
          finalECategories.set(expcategories[i].name, expcategories[i].image)
        }
      }

      setECategories(finalECategories)

      let finalICategories: Map<string, string> = new Map()

      baseIncomeCategories.forEach((value, key) => {
        finalICategories.set(key, value)
      })

      if (incomecategories) {
        for (let i = 0; i < incomecategories.length; i++) {
          finalICategories.set(incomecategories[i].name, incomecategories[i].image)
        }
      }

      setICategories(finalICategories)
    }

    addCategories()


  }, [account])

  const [fetchBalance, setFetchBalance] = useState(false)

  useEffect(() => {
    const getDetails = async () => {
      if (user) {
        const accountBalance = await FinanceNetwork.getBalance(user.accountId)
        setBalance(accountBalance)
      }
    }

    getDetails()

  }, [user, fetchBalance])

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

        <Button disabled={isSubmitting}
          className='bg-transparent hover-red border-0 p-1' onClick={() => setShowEditBalanceBox(false)}>
          <ClearIcon />
        </Button>

      </span>

    </form>

  return (
    <Container className='mt-5 px-5 finance'>

      <SnackbarProvider maxSnack={3}>
        {user ?
          <>
            <Row className='mb-1'>
              <Col xs={5} md={5} lg={5}>
                <h4 className='text-uppercase'>{user.username}'s account</h4>
              </Col>

              <Col xs={4} md={4} lg={4}>
                <h4 className='align-middle m-0'>Balance:
                  {showEditBalanceBox ?

                    setBalanceForm :
                    balanceArea
                  }
                </h4>

              </Col>

              <Col xs={3} md={3} lg={3} className='text-center'>
                <Dropdown>
                  <Dropdown.Toggle variant="light" size='sm' className='w-100'>
                    <b>Actions</b>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {actions.map((action) => (
                      <Dropdown.Item>
                        <ListItem>
                          <ListItemAvatar>
                            <Link to={`/finances/${action.link}`}>
                              <Avatar alt={action.name} src={action.image} sx={{ height: '30px', width: '30px', margin: 0, padding: 0 }} />
                            </Link>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography variant="body1" color="black" className='m-0 p-0'>
                                <Link to={`/finances/${action.link}`}>{action.name}</Link>
                              </Typography>
                            }
                          />
                        </ListItem>
                      </Dropdown.Item>
                    ))}

                  </Dropdown.Menu>
                </Dropdown>

              </Col>
            </Row>

            <Row className='bg-blue1 p-3 '>
              <Col xs={12} md={12} lg={12}>
                <h4 className='text-center'>My Expenses</h4>
              </Col>
            </Row>

            <Routes>

              <Route path='addTransactionCategory' element={<AddTransactionCategory />} />

              <Route path='addDue' element={<CreateDue allUsers={allUsers} onDueCreated={() => {}}/>} />

              <Route path='addTransaction'
                element={<AddTransaction
                  onTransactionCreated={() => {
                    enqueueSnackbar("Transaction added successfully!", { variant: 'success' })
                    setReRenderTransactionCard(!reRenderTransactionCard)
                    setFetchBalance(!fetchBalance)
                  }}
                  balance={balance}
                  eCategories={eCategories}
                  iCategories={iCategories} />}>
              </Route>

              <Route path='transfer'
                element=
                {< MoneyTransfer
                  balance={balance}
                  allUsers={allUsers}
                  onMoneyTransferred={(reciever: string, amount: number) => {
                    enqueueSnackbar("Tranferred ₹" + amount + " to " + reciever + " successfully", { variant: 'success' })
                    setReRenderTransactionCard(!reRenderTransactionCard)
                    setFetchBalance(!fetchBalance)
                  }} />} />

              <Route path='createGroup'
                element={
                  <CreateGroup allUsers={allUsers}
                    loggedInUser={user}
                    onGroupCreated={(msg) => {
                      enqueueSnackbar(msg, { variant: "info" })
                      setReRenderGroups(!reRenderGroups)
                    }}
                    render={reRenderGroups}

                  />}
              />

            </Routes>

            <Row className='mt-4'>
              <Col xs={12} md={5} lg={5}>
                <h3>Groups
                  <CiSquarePlus className="my-auto cursor-pointer" fontSize="medium" onClick={() => { navigate('createGroup', { replace: true }) }} />
                </h3>
                <Groups />
              </Col>
            </Row>

            <Row className='mt-4'>
              <Col xs={12} md={5} lg={5}>
                <h3>All transactions</h3>
              </Col>

              <Col xs={6} md={7} lg={7} className='m-0 text-end mb-2'>

                <Button variant='light' className='rounded-0 mx-1'>

                  <NavLink to='addTransaction'>
                    <img width="20" height="20" className='mb-1' src="https://img.icons8.com/color/96/left-handed.png" alt="left-handed" />
                    &nbsp; Add expense/income
                  </NavLink>

                </Button>

                <Button variant='light' className='rounded-0 mx-1'>

                  <NavLink to='transfer'>
                    <img width="20" className='mb-1' height="20" src="https://img.icons8.com/material-outlined/24/initiate-money-transfer.png" alt="initiate-money-transfer" />
                    &nbsp; Transfer money
                  </NavLink>
                </Button>

                <Button className='rounded-0 text-light' variant=''>

                  <NavLink to='addTransactionCategory'>
                    New category
                  </NavLink>

                </Button>

              </Col>


              <hr className=' m-0' />
              <TransactionCard accountId={account?.accountId} render={reRenderTransactionCard} eCategories={eCategories} iCategories={iCategories} />

            </Row>
          </>
          :
          <h5>Log in now to start tracking your finances!</h5>
        }
      </SnackbarProvider>


    </Container>
  )
}

export default Finances
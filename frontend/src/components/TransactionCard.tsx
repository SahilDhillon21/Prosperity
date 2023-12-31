import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RemoveIcon from '@mui/icons-material/Remove';
import SystemSecurityUpdateGoodIcon from '@mui/icons-material/SystemSecurityUpdateGood';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { Blocks } from 'react-loader-spinner';
import { transferImage, updateImage } from '../constants';
import Transaction from '../models/transaction.model';
import * as FinanceNetwork from '../network/finance.network';
import { formatDate } from '../utils/formateDate';

interface TransactionCardProps {
    eCategories: Map<string, string>,
    iCategories: Map<string, string>,
    accountId: string | undefined,
    render: Boolean,
}

const TransactionCard = ({ eCategories, iCategories, accountId, render }: TransactionCardProps) => {
    // Copy to clipboard part
    const copiedTransactionId = useRef("")
    const { enqueueSnackbar } = useSnackbar();

    const handleCopyTransactionId = () => {
        navigator.clipboard.writeText(copiedTransactionId.current)
        enqueueSnackbar('Copied: ' + copiedTransactionId.current, { variant: 'success' })
    }

    // Blocks loader
    const [showLoader, setShowLoader] = useState(false)

    // Transactions useState
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        const getAllTransactions = async () => {
            try {
                setShowLoader(true)
                setTimeout(async () => {
                    const alltransactions = await FinanceNetwork.getAllTransactions()
                    setTransactions(alltransactions)
                    setShowLoader(false)
                }, 1000)

            } catch (error) {
                console.log(error);
            }
        }

        getAllTransactions()

    }, [render])

    return (
        <>
            <Col xs={12} md={12} lg={12} className='p-3 my-auto align-items-center bg-dark text-light '>

                {showLoader ?
                    <Row className='justify-content-center'>
                        <Col md={12} xs={12} lg={12} className='text-center'>
                            <Blocks
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                            />
                        </Col>
                    </Row>

                    :

                    transactions.map((T) => {

                        var badge
                        var img
                        var amountBadge
                        var category = T.category

                        // Adjust category badge in case of transfer
                        // In case of transfer, category should show 'To <person name>'
                        // If this was the sending account, we need to fetch account name for secondAccount,
                        // and if it was receiving account, then we need to fetch firstAccount (accountId) username

                        if (T.type === "Update") {
                            img = updateImage
                            badge = <Badge className='text-white mt-2'> Balance update </Badge>
                            amountBadge =
                                <h5 className='m-0 text-blue3'>
                                    <SystemSecurityUpdateGoodIcon fontSize='small' className='mb-1' /> ₹{T.amount}
                                </h5>

                            category = "Balance set to ₹" + T.amount
                        }

                        else if (T.type === "Transfer") {
                            img = transferImage
                            badge = <Badge className='text-dark bg-light mt-2'> Transfer </Badge>
                            if (T.accountId === accountId) {
                                amountBadge = <h5 className='text-danger mt-1'> Sent ₹{T.amount}</h5>
                                category = "To " + T.secondAccountUsername
                            } else {
                                amountBadge = <h5 className='text-success mt-1'> Received ₹{T.amount}</h5>
                                category = "From "+T.firstAccounUsername
                            }
                        }

                        else if (T.type === "Expense") {
                            img = eCategories.get(T.category)
                            badge = <Badge bg="danger text-white mt-2"> Debited </Badge>
                            amountBadge = <h5 className='m-0 text-red'>
                                <RemoveIcon fontSize='small' className='mb-1' /> ₹{T.amount}
                            </h5>
                        }
                        else {
                            img = iCategories.get(T.category)
                            badge = <Badge bg="success text-white mt-2"> Credited </Badge>
                            amountBadge = <h5 className='m-0 text-success'>
                                <AddIcon fontSize='small' className='mb-1' /> ₹{T.amount}
                            </h5>
                        }

                        return (
                            <>
                                <Row className='mt-3 min-vh-50' key={T.transactionId} >

                                    {/* <p>
                                    {JSON.stringify(T)}
                                </p> <hr /> */}


                                    <Col sm={1} md={1} lg={1} className='my-auto align-items-center text-center py-1'>
                                        <img src={img} alt={T.category} height="64px" width="64px" />
                                    </Col>

                                    <Col sm={3} md={3} lg={3} className='my-auto align-items-center py-1'>
                                        <h5 className='align-items-center'>{category}</h5>
                                        <p className='text-lightWhite m-0 p-0'>{formatDate(T.createdAt)}</p>
                                    </Col>

                                    <Col sm={2} md={2} lg={2} className='my-auto align-items-center text-center py-1'>
                                        <h5>{badge}</h5>
                                    </Col>

                                    <Col sm={2} md={2} lg={2} className='my-auto align-items-center text-center py-1'>
                                        {amountBadge}
                                    </Col>

                                    <Col sm={3} md={3} lg={3} className='my-auto align-items-center text-center py-1'>
                                        <h6 className='m-0'>Id: {T.transactionId.substring(0, 18) + "..."}</h6>
                                    </Col>

                                    <Col xs={1} md={1} lg={1} className='my-auto mx-0 py-1'
                                        onClick={
                                            () => {
                                                copiedTransactionId.current = T.transactionId
                                                // copy the transaction.id from the object
                                                handleCopyTransactionId()
                                            }}
                                    >
                                        <ContentCopyIcon sx={{ cursor: 'pointer' }} />
                                    </Col>

                                </Row>
                                <hr />
                            </>
                        )
                    })}


            </Col>
            <hr />
        </>
    )
}

export default TransactionCard
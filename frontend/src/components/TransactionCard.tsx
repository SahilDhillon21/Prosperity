import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Transaction from '../models/transaction.model';
import * as FinanceNetwork from '../network/finance.network';
import { updateImage, transferImage } from '../constants';
import { formatDate } from '../utils/formateDate';
import SystemSecurityUpdateGoodIcon from '@mui/icons-material/SystemSecurityUpdateGood';

interface TransactionCardProps {
    eCategories: Map<string, string>,
    iCategories: Map<string, string>,
    accountId: string | undefined,
}

const TransactionCard = ({ eCategories, iCategories, accountId }: TransactionCardProps) => {
    // Copy to clipboard part
    const copiedTransactionId = useRef("")
    const { enqueueSnackbar } = useSnackbar();

    const handleCopyTransactionId = () => {
        navigator.clipboard.writeText(copiedTransactionId.current)
        enqueueSnackbar('Copied: ' + copiedTransactionId.current, { variant: 'success' })
    }

    // Transactions useState
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        const getAllTransactions = async () => {
            try {
                const alltransactions = await FinanceNetwork.getAllTransactions()
                setTransactions(alltransactions)
            } catch (error) {
                console.log(error);
            }
        }

        getAllTransactions()

    }, [])

    return (
        <>
            <Col xs={12} md={12} lg={12} className='p-3 my-auto align-items-center bg-dark text-light '>

                {transactions.map((T) => {

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
                        badge = <Badge className='text-white mt-1'> Balance update </Badge>
                        amountBadge =
                            <h5 className='m-0 text-blue3'>
                                <SystemSecurityUpdateGoodIcon fontSize='small' className='mb-1' /> ₹{T.amount}
                        </h5>

                        category = "Balance set to ₹"+T.amount
                    }

                    else if (T.type === "Transfer") {
                        img = transferImage
                        badge = <Badge className='text-dark bg-light mt-1'> Transfer </Badge>
                        if (T.accountId === accountId) {
                            amountBadge = <Badge className='text-light bg-danger mt-1'> Sent ₹{T.amount}</Badge>
                            category = T.secondAccountUsername
                        } else {
                            amountBadge = <Badge className='text-light bg-success mt-1'> Received ₹{T.amount}</Badge>
                            category = T.firstAccounUsername
                        }
                    }

                    else if (T.type === "Debit") {
                        img = eCategories.get(T.category)
                        badge = <Badge bg="danger text-white mt-1"> Debited </Badge>
                    }
                    else img = iCategories.get(T.category)

                    return (
                        <>
                            <Row className='mt-3'>

                                <p>
                                    {JSON.stringify(T)}
                                </p> <hr />


                                <Col sm={1} md={1} lg={1} className='my-auto align-items-center text-center'>
                                    <img src={img} alt={T.category} height="64px" width="64px" />
                                </Col>

                                <Col sm={3} md={3} lg={3} className='my-auto align-items-center'>
                                    <h5 className='align-items-center'>{category}</h5>
                                    <p className='text-lightWhite m-0 p-0'>{formatDate(T.createdAt)}</p>
                                </Col>

                                <Col sm={2} md={2} lg={2} className='my-auto align-items-center text-center'>
                                    <h5>{badge}</h5>
                                </Col>

                                <Col sm={2} md={2} lg={2} className='my-auto align-items-center text-center'>
                                    {amountBadge}
                                </Col>

                                <Col sm={3} md={3} lg={3} className='my-auto align-items-center text-center'>
                                    <h6 className='m-0'>Id: {T.transactionId.substring(0, 18) + "..."}</h6>
                                </Col>

                                <Col xs={1} md={1} lg={1} className='my-auto mx-0'
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
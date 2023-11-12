import { Col, Row } from 'react-bootstrap'
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Badge from 'react-bootstrap/Badge';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RemoveIcon from '@mui/icons-material/Remove';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useRef, useState } from 'react';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

const TransactionCard = () => {
    const copiedTransactionId = useRef("")
    const { enqueueSnackbar } = useSnackbar();

    const handleCopyTransactionId = () => {
        navigator.clipboard.writeText(copiedTransactionId.current)
        enqueueSnackbar('Copied: '+copiedTransactionId.current, { variant: 'success' })
    }

    return (
        <>
            <Col xs={12} md={12} lg={12} className='p-3 my-auto align-items-center bg-dark text-light '>
                <Row className='mt-3'>

                    <Col sm={1} md={1} lg={1} className='my-auto align-items-center text-center'>
                        <RestaurantIcon style={{ fontSize: '55px', color: 'red' }} />
                    </Col>

                    <Col sm={3} md={3} lg={3} className='my-auto align-items-center'>
                        <h5 className='align-items-center'>Food and groceries</h5>
                        <p className='text-lightWhite m-0 p-0'>November 12, 2023, 8:36 AM</p>
                    </Col>

                    <Col sm={2} md={2} lg={2} className='my-auto align-items-center text-center'>
                        <h5><Badge bg="danger text-white mt-1"> Deducted </Badge></h5>
                    </Col>

                    <Col sm={2} md={2} lg={2} className='my-auto align-items-center text-center'>
                        <h5 className='m-0 text-danger'><RemoveIcon fontSize='small'/> ₹560<ArrowDropDownIcon fontSize='large' /></h5>
                    </Col>

                    <Col sm={3} md={3} lg={3} className='my-auto align-items-center text-center'>
                        <h5 className='m-0'>Id: 100283902318</h5>
                    </Col>

                    <Col xs={1} md={1} lg={1} className='my-auto mx-0'
                        onClick={
                            () => {
                                copiedTransactionId.current = "192381923"
                                // copy the transaction.id from the object
                                handleCopyTransactionId()
                            }}
                    >
                        <ContentCopyIcon sx={{ cursor: 'pointer' }} />
                    </Col>

                </Row>
                <hr />


            </Col>
            <hr />
        </>
    )
}

export default TransactionCard
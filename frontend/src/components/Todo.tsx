import { Col, Container, Row } from 'react-bootstrap';


const Todo = () => {

    return (
        <Container className='m-2'>
            <Row >

                <Col xs={1} md={1} lg={1} style={{border: "2px solid black", color:"black"}} className='d-flex align-items-center justify-content-center'>
                    <h2>1</h2>
                </Col>

                <Col xs={11} md={10} lg={10} className='p-2' style={{ background: "black", color: "white" }}>
                    <h3>Title</h3>
                    <h6>Description</h6>
                </Col>

                <Col xs={12} md={1} lg={1} className='p-2 text-center d-flex align-items-center' style={{ background: "black", color: "white" }}>
                    <h3>Tick</h3>
                </Col>

            </Row>
            {/* <Row>
                <h1>T1</h1>
            </Row>
            <Row>
                <h1>T1</h1>
            </Row>
            <Row>
                <h1>T1</h1>
            </Row> */}
        </Container>
    );
}

export default Todo;

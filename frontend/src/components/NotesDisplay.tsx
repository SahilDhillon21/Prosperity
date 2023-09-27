import { Card, Col, Row } from 'react-bootstrap';
import Note from '../models/note.model';
import Typography from '@mui/material/Typography';



export const NotesDisplay = ({ notes }: { notes: Note[] }) => {

    return (
        <div>
            <Row>
                {notes.map((note) => (
                    <Col sm={12} md={3} lg={3} >
                        <Card style={{ marginTop: '5%' }}>
                            <Card.Header>
                                <Card.Title>
                                    <Typography variant='h4'>
                                        {note.title}
                                    </Typography>
                                </Card.Title>
                            </Card.Header>

                            <Card.Body>
                                <Card.Text>
                                    <Typography variant='h6'>
                                        {note.content}
                                    </Typography>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

        </div>
    )
}

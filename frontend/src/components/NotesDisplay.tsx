import { Col, Row } from 'react-bootstrap';
import Note from '../models/note.model';
import { NoteCard } from './NoteCard';
import NoteModuleStyles from '../styles/NotesPage.module.css'

interface NotesDisplayProps{
    notes: Note[],
    className?: string
}

export const NotesDisplay = ({notes, className} : NotesDisplayProps) => {

    return (
        <div>
            <Row xs={1} md={2} xl={4} className='g-3'>
                {notes.map((note) => (
                    <Col >
                        <NoteCard note={note} className={NoteModuleStyles.note} />
                    </Col>
                ))}
            </Row>

        </div>
    )
}

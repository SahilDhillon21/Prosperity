import { Col, Row } from 'react-bootstrap';
import Note from '../models/note.model';
import { NoteCard } from './NoteCard';
import NoteModuleStyles from '../styles/NotesPage.module.css'

interface NotesDisplayProps{
    notes: Note[],
    deleteNoteFromGrid: (note: Note) => void,
    className?: string,
    handleNoteClicked: (note: Note) => void
}

export const NotesDisplay = ({notes, className, deleteNoteFromGrid, handleNoteClicked} : NotesDisplayProps) => {

    return (
        <div className='w-100'>
            <Row xs={1} md={2} xl={4} className='g-3' >
                {notes.map((note) => (
                    <Col key={note._id}>
                        <NoteCard 
                        note={note} 
                        className={NoteModuleStyles.note} 
                        onNoteDelete={(note) => deleteNoteFromGrid(note)}
                        onNoteClicked={(note) => handleNoteClicked(note)}
                        />
                    </Col>
                ))}
            </Row>

        </div>
    )
}

import Typography from '@mui/material/Typography';
import { Card } from 'react-bootstrap';
import Note from '../models/note.model';
import styles from '../styles/note.module.css';
import { formatDate } from '../utils/formateDate';
import { MdDelete } from 'react-icons/md'
import styleUtils from '../styles/utils.module.css'

interface NoteCardProps {
    note: Note,
    onNoteClicked: (note: Note) => void,
    onNoteDelete: (note: Note) => void,
    className: string,
}

export const NoteCard = ({ note, className, onNoteDelete, onNoteClicked }: NoteCardProps) => {

    const { title, content, createdAt, updatedAt } = note

    var createdUpdatedAt: string

    if (updatedAt > createdAt) {
        createdUpdatedAt = "Updated: " + formatDate(updatedAt)
    } else {
        createdUpdatedAt = "Created: " + formatDate(createdAt)
    }


    return (
        <>
            <Card className={`${styles.noteCard} ${className}`} onClick={() => onNoteClicked(note)}>
                <Card.Header>
                    <Card.Title className={styleUtils.flexCenter}>
                        <Typography variant='h5' fontFamily={"Segoe UI"}>
                            {title}
                        </Typography>
                        <MdDelete
                            className='text-muted ms-auto'
                            onClick={(e) => {
                                onNoteDelete(note)
                                e.stopPropagation()
                            }}
                        />
                    </Card.Title>
                </Card.Header>

                <Card.Body className={styles.cardBody}>
                    <Card.Text className={styles.cardText}>
                        <Typography variant='h6' fontFamily={"Segoe UI"}>
                            {content}
                        </Typography>
                    </Card.Text>
                </Card.Body>

                <Card.Footer className='text-mute'>
                    {createdUpdatedAt}
                </Card.Footer>
            </Card>
        </>
    )
}

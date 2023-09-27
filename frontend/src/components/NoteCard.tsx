import Typography from '@mui/material/Typography';
import { Card } from 'react-bootstrap';
import Note from '../models/note.model';
import styles from '../styles/note.module.css';
import { formatDate } from '../utils/formateDate';

interface NoteCardProps {
    note: Note,
    className: string,
}

export const NoteCard = ({ note, className }: NoteCardProps) => {

    const {title, content, createdAt, updatedAt} = note

    var createdUpdatedAt: string

    if(updatedAt > createdAt){
        createdUpdatedAt = "Updated: "+ formatDate(updatedAt)
    } else {
        createdUpdatedAt = "Created: "+ formatDate(createdAt)
    }


    return (
        <>
            <Card className={`${styles.noteCard} ${className}`}>
                <Card.Header>
                    <Card.Title>
                        <Typography variant='h4' fontFamily={"Segoe UI"}>
                            {title}
                        </Typography>
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

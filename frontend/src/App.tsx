import { Container } from 'react-bootstrap';
import './global.css';
import { NotesDisplay } from './components/NotesDisplay';
import { useEffect, useState } from 'react';
import NoteModel from './models/note.model';
import axios from 'axios';
import { Button } from '@mui/material';
import NoteModuleStyles from './styles/NotesPage.module.css'


function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])

  const createNote = async () => {
    try {
      const newNote = await axios.post('/notes/createNote', {
        title: "trial note",
        content: "My note content  \n HEIEI \n   "
      })
      
      const newNoteArray = [...notes, newNote.data]      
      setNotes(newNoteArray)
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await axios.get('/notes')
        const notes = response.data
        setNotes(notes)

      } catch (error) {
        alert("load notes failed (frontend) ")
      }
    }
    loadNotes()
  }, [])
  

  return (
    <div>
      <Container>
        <Button onClick={createNote}>
          Create note
        </Button>
        <NotesDisplay notes={notes} className={NoteModuleStyles.note} />
      </Container>
    </div >
  );
}

export default App;

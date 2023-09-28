import { Container } from 'react-bootstrap';
import './global.css';
import { NotesDisplay } from './components/NotesDisplay';
import { useEffect, useState } from 'react';
import NoteModel from './models/note.model';
import axios from 'axios';
import { Button } from '@mui/material';
import NoteModuleStyles from './styles/NotesPage.module.css'
import * as NoteNetwork from './network/note.network'

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])

  useEffect(() => {
    async function loadNotes() {
      try {
        // const response = await axios.get('/notes')
        // const notes = response.data

        const notes = await NoteNetwork.fetchNotes()
        setNotes(notes)

      } catch (error) {
        alert("load notes failed (frontend) ")
      }
    }
    loadNotes()
  }, [])
  
  const handleCreateNote = () => {
    // const newNote = createNote()
  }

  return (
    <div>
      <Container>
        <Button onClick={handleCreateNote}>
          Create note
        </Button>
        <NotesDisplay notes={notes} className={NoteModuleStyles.note} />
      </Container>
    </div >
  );
}

export default App;

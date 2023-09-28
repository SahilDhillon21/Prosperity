import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { AddNoteDialog } from './components/AddNoteDialog';
import { NotesDisplay } from './components/NotesDisplay';
import './global.css';
import NoteModel from './models/note.model';
import * as NoteNetwork from './network/note.network';
import NoteModuleStyles from './styles/NotesPage.module.css';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])

  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false)

  const handleDeleteNoteFromGrid = async (note: NoteModel) => {
    try {
      await NoteNetwork.deleteNote(note._id)
      setNotes(notes.filter(existingNote => existingNote._id !== note._id))
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NoteNetwork.fetchNotes()
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

        <Button onClick={() => setShowCreateNoteModal(true)} >
          Create note
        </Button>

        <NotesDisplay
          notes={notes}
          className={NoteModuleStyles.note}
          deleteNoteFromGrid={(note) => handleDeleteNoteFromGrid(note)}
        />

        {showCreateNoteModal &&
          <AddNoteDialog
            onDismiss={() => setShowCreateNoteModal(false)}
            onNoteSaved={(newNote) => {
              setNotes([...notes, newNote])
            }}
          />
        }

      </Container>
    </div >
  );
}

export default App;

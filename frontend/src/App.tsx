import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import NoteModel from './models/note.model';
import axios from 'axios';

function App() {

  const [notes, setNotes] = useState<NoteModel[]>([])

  const createNote = async () => {
    try {
      const newNote = await axios.post('/notes/createNote', {
        title: "trial note",
        content: "My note content"
      })

      console.log(newNote.data);

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
      <Button onClick={createNote}>
        create note
      </Button>
      {JSON.stringify(notes)}
    </div>
  );
}

export default App;

import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Col, Container, Spinner } from 'react-bootstrap';
import { AddNoteDialog } from './components/AddNoteDialog';
import { NotesDisplay } from './components/NotesDisplay';
import './global.css';
import NoteModel from './models/note.model';
import * as NoteNetwork from './network/note.network';
import * as UserNetwork from './network/user.network';
import NoteModuleStyles from './styles/NotesPage.module.css';
import { SignupDialog } from './components/SignupDialog';
import User from './models/user.model';
import MainNavbar from './components/MainNavbar';
import { LoginDialog } from './components/LoginDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])

  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)

  const [notesLoading, setNotesLoading] = useState(false)
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false)

  const [showSignUpModal, setShowSignupModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)


  const handleDeleteNoteFromGrid = async (note: NoteModel) => {
    try {
      await NoteNetwork.deleteNote(note._id)
      setNotes(notes.filter(existingNote => existingNote._id !== note._id))
    } catch (error) {
      alert(error)
    }
  }

  const handleUserLogout = async () => {
    try {
      await UserNetwork.callUserLogout()
      setLoggedInUser(null)
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false)
        setNotesLoading(true)
        const notes = await NoteNetwork.fetchNotes()
        setNotes(notes)

      } catch (error) {
        setShowNotesLoadingError(true)
      } finally {
        setNotesLoading(false)
      }
    }
    loadNotes()
  }, [])

  useEffect(() => {
    async function getLoggedInUser() {
      try {
        const user = await UserNetwork.callAuthenticatedUser()
        setLoggedInUser(user)
      } catch (error) {
        alert("cant fetch logged in user (useffect error)")
      }
    }

    getLoggedInUser()

  }, [])

  return (
    <div>
      <Container className={NoteModuleStyles.notesPage}>
        <MainNavbar />

        <Button onClick={() => setShowCreateNoteModal(true)} >
          Create note
        </Button>

        <Button onClick={() => setShowSignupModal(true)} >
          Sign up
        </Button>

        <Button variant='contained' color='error' onClick={() => handleUserLogout()} >
          Log out
        </Button>

        <Button variant='contained' color='success' onClick={() => setShowLoginModal(true)} >
          Log in
        </Button>

        {notesLoading && <Spinner animation='border' variant='primary' />}
        {showNotesLoadingError && <p>Something went wrong. Please try again.</p>}

        {!notesLoading && !showNotesLoadingError &&
          <>
            {notes.length > 0
              ? <NotesDisplay
                notes={notes}
                className={NoteModuleStyles.note}
                deleteNoteFromGrid={(note) => handleDeleteNoteFromGrid(note)}
                handleNoteClicked={(note) => setNoteToEdit(note)}
              />
              : <h3>You currently don't have any notes. Create one and they'll show up here</h3>
            }
          </>
        }

        {loggedInUser ?
          <Col>
            {JSON.stringify(loggedInUser)}
          </Col>
          : <Col>
            <h3>User not logged in</h3>
          </Col>
        }

        {showCreateNoteModal &&
          <AddNoteDialog
            onDismiss={() => setShowCreateNoteModal(false)}
            onNoteSaved={(newNote) => {
              setNotes([...notes, newNote])
              setShowCreateNoteModal(false)
            }}
          />
        }

        {showSignUpModal &&
          <SignupDialog
            onDismiss={() => setShowSignupModal(false)}
            onUserSignup={(newUser) => setLoggedInUser(newUser)}
          />
        }

        {showLoginModal &&
          <LoginDialog
            onDismiss={() => setShowLoginModal(false)}
            onUserLogin={(user) => { setLoggedInUser(user) }}
          />
        }

        {noteToEdit &&
          <AddNoteDialog
            noteToEdit={noteToEdit}
            onDismiss={() => { setNoteToEdit(null) }}
            onNoteSaved={(updatedNote) => {
              setNoteToEdit(null)
              setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote))
            }}
          />
        }

      </Container>
    </div >
  );
}

export default App;

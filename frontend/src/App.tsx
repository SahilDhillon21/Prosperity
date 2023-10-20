import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
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
import Todo from "./components/Todo"

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
      setNotes([])
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
  }, [loggedInUser])

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
      <MainNavbar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignupClicked={() => setShowSignupModal(true)}
        onLogoutClicked={() => handleUserLogout()}
      />
      <Container className={NoteModuleStyles.notesPage}>


        <Button onClick={() => setShowCreateNoteModal(true)} style={{margin: "1%"}}>
          Create note
        </Button>

        {notesLoading && <Spinner animation='border' variant='primary' />}
        {showNotesLoadingError && <p>Something went wrong. Please try again.</p>}

        {loggedInUser ?
          <Row>
            {!notesLoading && !showNotesLoadingError &&
              <>
                {notes.length > 0
                  ? <NotesDisplay
                    notes={notes}
                    className={NoteModuleStyles.note}
                    deleteNoteFromGrid={(note) => handleDeleteNoteFromGrid(note)}
                    handleNoteClicked={(note) => setNoteToEdit(note)}
                  />
                  : <h3>You currently don't have any notes. Create one and they'll show up here.</h3>
                }
              </>
            }
          </Row>

          :

          <Col>
            <h3>Kindly log in to view your notes</h3>
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
            onUserLogin={(user) => {
              setLoggedInUser(user)
              setShowLoginModal(false)
            }}
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

      <Container>

        <h3>TODO</h3>

        <Todo />

      </Container>

    </div >
  );
}

export default App;

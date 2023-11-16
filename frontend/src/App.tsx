import { useEffect, useState } from 'react';
import { Routes, Route, NavLink, Outlet } from 'react-router-dom'
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
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Habits } from './components/Habits';
import Finances from './components/Finances';
import Productivity from './components/Productivity';
import AddTransactionCategory from './components/AddTransactionCategory';
import { SnackbarProvider } from 'notistack';
import AddTransaction from './components/AddTransaction';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])

  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)

  const [notesLoading, setNotesLoading] = useState(false)
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false)

  const [showSignUpModal, setShowSignupModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

  // background color
  const [bgcolor, setBgcolor] = useState("white")
  const [buttonGroupBg, setButtonGroupBg] = useState("black")

  useEffect(() => {
    document.body.style.backgroundColor = bgcolor
  }, [bgcolor])


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

  useEffect(() => {
    // async function 
  })

  const home = (
    <>
      <Container className={NoteModuleStyles.notesPage}>


        <Button onClick={() => setShowCreateNoteModal(true)} style={{ margin: "1%" }}>
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

      {
        loggedInUser ?
          <Container className='mt-5 mb-5'>

            <h3>TODO list</h3>

            <Todo
              userId={loggedInUser._id}
            />

          </Container>
          :
          <h3>Log in to view your todo list.</h3>
      }
    </>
  )

  return (
    <div>
      <SnackbarProvider maxSnack={3}>

        <MainNavbar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModal(true)}
          onSignupClicked={() => setShowSignupModal(true)}
          onLogoutClicked={() => handleUserLogout()}
        />

        {showLoginModal &&
          <LoginDialog
            onDismiss={() => setShowLoginModal(false)}
            onUserLogin={(user) => {
              setLoggedInUser(user)
              setShowLoginModal(false)
            }}
          />
        }

        {showSignUpModal &&
          <SignupDialog
            onDismiss={() => setShowSignupModal(false)}
            onUserSignup={(newUser) => setLoggedInUser(newUser)}
          />
        }

        <Container className='mt-3'>
          <Row >
            <Col className='text-center'>
              <ButtonGroup variant="contained" color='success'>

                <Button onClick={() => setBgcolor("white")}><NavLink to='/'>Home</NavLink></Button>

                <Button onClick={() => setBgcolor("white")}><NavLink to='/habits'>Habits</NavLink></Button>

                <Button onClick={() => setBgcolor("white")}><NavLink to='/productivity'>Productivity</NavLink></Button>

                <Button onClick={() => setBgcolor("white")}><NavLink to='/journal'>Journal</NavLink></Button>

                <Button onClick={() => {
                  setBgcolor("#00337C")
                  setButtonGroupBg("white")
                }
                }>
                  <NavLink to='/finances'>Finances</NavLink>
                </Button>

              </ButtonGroup>
            </Col>
          </Row>
        </Container>


        <Routes>

          <Route path='/' element={home} />

          <Route path='habits' element={<Habits />} />

          <Route path='finances/*' element={<Finances user={loggedInUser} />}>

            {/* <Route path='addTransactionCategory' element={<AddTransactionCategory />} /> */}

            {/* <Route path='addTransaction' element={<AddTransaction />} /> */}

          </Route>

          <Route path='productivity' element={<Productivity />} />

        </Routes>

      </SnackbarProvider>

    </div>
  );
}

export default App;

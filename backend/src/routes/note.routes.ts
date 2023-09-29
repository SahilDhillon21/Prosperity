import  express  from "express";
import * as NotesController from '../controllers/note.controller'

const router = express.Router()

router.get('/',NotesController.getNotes)

router.post('/createNote',NotesController.createNote)

router.post('/deleteNote/:noteId', NotesController.deleteNote)

router.patch('/updateNote/:noteId', NotesController.updateNote)

export default router
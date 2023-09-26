import  express  from "express";
import * as NotesController from '../controllers/note.controller'

const router = express.Router()

router.get('/',NotesController.getNotes)

router.post('/createNote',NotesController.createNote)

export default router
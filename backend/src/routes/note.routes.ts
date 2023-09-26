import  express  from "express";

const router = express.Router()

router.get('/',NotesController.getNotes)
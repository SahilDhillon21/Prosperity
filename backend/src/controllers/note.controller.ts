import { RequestHandler } from "express"
import Note from "../models/note.model"

export const getNotes: RequestHandler = async (req, res) => {
    try {
        const notes = await Note.find().exec()
        res.status(200).json(notes)
    } catch (error) {
        alert(error)
        alert("Couldn't fetch notes (error in not controller 'getNotes')")
    }
}

export const createNote: RequestHandler = async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    try {

        if (!title) {
            alert("Note must have a title!")
            return
        }

        const newNote = await Note.create({
            title: title,
            content: content,
        })

        console.log(JSON.stringify(newNote));

        res.status(200).json(newNote)

    } catch (error) {
        alert(error)
        alert("Couldn't create note (createNote handler) ")
    }
}

export const updateNote: RequestHandler = async (req, res) => {
    const noteId = req.params.noteId
    const title = req.body.title
    const content = req.body.content

    console.log("new title: "+ title);
     

    try {
        if (!title) {
            alert("Note must have a title!")
            return
        }

        const oldNote = await Note.findById(noteId).exec()

        if (!oldNote) {
            alert("such a note doesn't exist")
            return
        }

        oldNote.title = title
        oldNote.content = content

        const updatedNote = await oldNote.save()

        

        res.status(200).json(updatedNote)
    } catch (error) {
        alert("error at updateNote controller")
    }
}

export const deleteNote: RequestHandler = async (req, res) => {
    const noteId = req.params.noteId

    try {
        const noteToBeDeleted = await Note.findById(noteId).exec()

        if (!noteToBeDeleted) {
            res.status(404).json({ "message": "Note doesn't exist" })
            return
        }

        await noteToBeDeleted.deleteOne()

        res.sendStatus(204)
    } catch (error) {
        alert("error in deleteNote handler")
    }
}


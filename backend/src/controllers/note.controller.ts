import { RequestHandler } from "express"
import Note from "../models/note.model"
import createHttpError from "http-errors"
import User from "../models/user.model"

export const getNotes: RequestHandler = async (req, res) => {
    try {
        const userId = req.session.userId

        if (!userId) {
            res.status(200).json({ message: "User not authenticated" })
            return
        }

        const user = await User.findById(userId).populate('notes')

        if (!user) {
            res.status(200).json({ message: "This user doesn't have an account" })
            return
        }


        res.status(200).json(user.notes)

    } catch (error) {
        alert(error)
        alert("Couldn't fetch notes (error in not controller 'getNotes')")
    }
}

export const createNote: RequestHandler = async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const userId = req.session.userId


    try {

        if (!title) {
            alert("Note must have a title!")
            return
        }

        if (!userId) {
            throw createHttpError(401, "User not authenticated")
        }



        const newNote = await Note.create({
            title: title,
            content: content,
        })

        const user = await User.findById(userId).exec()

        if (!user) {
            throw createHttpError(401, "This user doesn't have an account")
        }

        user.notes.push(newNote._id)

        await user.save()

        await newNote.save()

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

    console.log("new title: " + title);


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


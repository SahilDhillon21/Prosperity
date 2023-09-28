import axios from "axios"

export const createNote = async () => {
    // try {
    //     const newNote = await axios.post('/notes/createNote', {
    //         title: "trial note",
    //         content: "My note content  \n HEIEI \n   "
    //     })

    //     const newNoteArray = [...notes, newNote.data]
    //     setNotes(newNoteArray)
    // } catch (error) {
    //     alert(error)
    // }
}

export const fetchNotes = async () => {
    try {
        const response = await axios.get('/notes')
        return response.data
    } catch (error) {
        alert("Something went wrong in fetchNotes (frontend network)")
    }
}
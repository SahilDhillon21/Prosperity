import axios from "axios"
export const fetchNotes = async () => {
    try {
        const response = await axios.get('/notes')
        return response.data
    } catch (error) {
        alert("Something went wrong in fetchNotes (frontend network)")
    }
}

export const createNote = async (note: any) => {
    try {
        const response = await axios.post('/notes/createNote', note)
        return response.data
    } catch (error) {
        alert("error in createNote (frontend network)")
    }
}

export const updateNote = async (noteId: any, note: any) => {
    try {
        const response = await axios.patch(`/notes/updateNote/${noteId}`, note)
        return response.data
    } catch (error) {
        alert("error in updateNote (frontend network)")
    }
}

export const deleteNote = async (noteId: any) => {
    try {
        await axios.post(`/notes/deleteNote/${noteId}`)
    } catch (error) {
        alert("error in deleteNote (frontend network)")
    }
}
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Note from "../models/note.model";
import * as NoteNetwork from '../network/note.network';

interface AddNoteDialogProps {
  noteToEdit?: Note,
  onDismiss: () => void,
  onNoteSaved: (note: Note) => void,
}

export const AddNoteDialog = ({ onDismiss, onNoteSaved, noteToEdit }: AddNoteDialogProps) => {
  const form = useForm({
    defaultValues: {
      title: noteToEdit?.title || "",
      content: noteToEdit?.content || ""
    }
  })

  const { register, handleSubmit, formState: { isSubmitting } } = form

  const [titleError, setTitleError] = useState(false)

  const handleNoteSubmit = async (data: any) => {
    const { title } = data

    if (!title || title.length < 3) {
      setTitleError(true)
      return
    }

    try {
      var newNote
      if (noteToEdit) {
        newNote = await NoteNetwork.updateNote(noteToEdit._id, data)
      } else {
        newNote = await NoteNetwork.createNote(data)
      }
      onNoteSaved(newNote)
    } catch (error) {
      alert("handleNoteSubmit error (while submitting form)")
    }
  }

  return (
    <Modal show={true} onHide={onDismiss}>

      <Modal.Header closeButton>

        <Modal.Title>
          {noteToEdit
            ? "Edit note"
            : "Create note"}
        </Modal.Title>

      </Modal.Header>

      <Modal.Body>

        <form onSubmit={handleSubmit(handleNoteSubmit)} noValidate>

          <Stack gap={3}>
            <TextField
              label="Title"
              required
              {...register("title")}
              error={titleError}
              helperText={titleError && "Title must be at least 3 characters long"}
            />

            <TextField
              label="Note"
              minRows={5}
              multiline
              {...register("content")}
            />

            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
              Save
            </Button>

          </Stack>

        </form>

      </Modal.Body>

    </Modal>
  )
}

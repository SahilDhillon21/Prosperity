import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Note from "../models/note.model";
import * as NoteNetwork from '../network/note.network';


interface AddNoteDialogProps {
  onDismiss: () => void,
  onNoteSaved: (note: Note) => void,
}

export const AddNoteDialog = ({ onDismiss, onNoteSaved }: AddNoteDialogProps) => {
  const form = useForm()

  const { register, handleSubmit, formState: { isSubmitting } } = form

  const [titleError, setTitleError] = useState(false)

  const handleNoteSubmit = async (data: any) => {
    const { title } = data

    if (!title || title.length < 3) {
      setTitleError(true)
      return
    }

    try {
      const newNote = await NoteNetwork.createNote(data)
      onNoteSaved(newNote)
      onDismiss()
    } catch (error) {
      alert("handleNoteSubmit error (while submitting form)")
    }
  }

  return (
    <Modal show={true} onHide={onDismiss}>

      <Modal.Header closeButton>

        <Modal.Title>
          Create note
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

            <TextField label="Note" minRows={5} multiline {...register("content")} />

            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
              Save
            </Button>

          </Stack>

        </form>

      </Modal.Body>

    </Modal>
  )
}

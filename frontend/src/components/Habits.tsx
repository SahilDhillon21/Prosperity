import { Button, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { Container, Offcanvas, Stack } from "react-bootstrap";
import Habit from "../models/habit.model";
import { CreateEditHabit } from "./CreateEditHabit";
import * as HabitNetwork from '../network/habit.network' 



export const Habits = () => {

  const [habits, setHabits] = useState<Habit[]>([])

  const [habitToEdit, setHabitToEdit] = useState<Habit|null>(null)  

  useEffect(() => {

    const getHabits = async () => {
      try {
        const allHabits = await HabitNetwork.fetchHabits()
        setHabits(allHabits)
      } catch (error) {
        console.log(error)
      }
    }

    getHabits()

  }, [])

  const [showCreateEditHabitModal, setShowCreateEditHabitModal] = useState(false)


  return (
    <>
      <CssBaseline>

        <Container className="mt-3">

          {habits.map((habit => {
            return (
              <h1>{habit.name}</h1>
            )
          }))}

          <Button onClick={() => setShowCreateEditHabitModal(true)}> + Add </Button>

          {showCreateEditHabitModal &&
            <CreateEditHabit 
            habitToEdit={habitToEdit} 
            onDismiss={() => setShowCreateEditHabitModal(false)}
            onHabitSaved={() => {}}
            />
          }


        </Container>
      </CssBaseline>

    </>

  )
}


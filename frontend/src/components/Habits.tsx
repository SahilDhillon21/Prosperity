import { Button, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Container, Offcanvas, Row, Stack } from "react-bootstrap";
import Habit from "../models/habit.model";
import { CreateEditHabit } from "./CreateEditHabit";
import * as HabitNetwork from '../network/habit.network'
import Paper from '@mui/material/Paper';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';



export const Habits = () => {

  const [habits, setHabits] = useState<Habit[]>([])

  const [habitToEdit, setHabitToEdit] = useState<Habit | null>(null)

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

  }, [habits])

  const [showCreateEditHabitModal, setShowCreateEditHabitModal] = useState(false)


  return (
    <>
      <CssBaseline>

        <Container className="mt-3">

          <Row className="justify-content-center d-flex">
            <Col xs={3} md={3} >
              <Paper elevation={3} className="px-3 py-2">
                <Row>
                  <Col xs={9} md={9} lg={9}>
                    {habits.map((habit => {
                      return (
                        <h1>{habit.name}</h1>
                      )
                    }))}
                  </Col>

                  <Col xs={3} md={3} lg={3} className="mt-2 mb-0">
                    <CheckBoxOutlineBlankIcon fontSize="large" style={{cursor: "pointer"}}/>
                  </Col>
                </Row>
              </Paper>
            </Col>
          </Row>

          <Button onClick={() => setShowCreateEditHabitModal(true)}> + Add </Button>

          {showCreateEditHabitModal &&
            <CreateEditHabit
              habitToEdit={habitToEdit}
              onDismiss={() => setShowCreateEditHabitModal(false)}
              onHabitSaved={() => { }}
            />
          }


        </Container>
      </CssBaseline>

    </>

  )
}


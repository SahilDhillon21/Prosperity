import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Button, CssBaseline } from "@mui/material";
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Habit from "../models/habit.model";
import * as HabitNetwork from '../network/habit.network';
import { CreateEditHabit } from "./CreateEditHabit";
import { wasDoneToday } from '../utils/wasDoneToday';



export const Habits = () => {

  const [habits, setHabits] = useState<Habit[]>([])

  const [habitToEdit, setHabitToEdit] = useState<Habit | null>(null)

  const [habitDoneToday, setHabitDoneToday] = useState<Boolean[]>([])

  const [rerender, setRerender] = useState(false)

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
  }, [rerender])

  useEffect(() => {
    const setTodaysHabitDoneArray = () => {
      var tempHabits = [];
      for (let i = 0; i < habits.length; i++) {
        const hb = habits[i];

        if (wasDoneToday(hb.completedDays)) {
          tempHabits.push(true);
        } else {
          tempHabits.push(false);
        }
      }

      setHabitDoneToday(tempHabits);
    }

    setTodaysHabitDoneArray();
  }, [habits]);

  const [showCreateEditHabitModal, setShowCreateEditHabitModal] = useState(false)


  const handleHabitDoneToday = async (habitId: string, reflection: string) => {
    try {
      const completedHabit = await HabitNetwork.callCompleteHabit(habitId, reflection)
      // add some functionality to show tick mark in the ui
    } catch (error) {
      console.log(error)
    }
  }

  const handleHabitUndoneToday = async (habitId: string) => {
    try {
      await HabitNetwork.callUndoHabit(habitId)
      // add some functionality to show tick mark in the ui
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <CssBaseline>

        <Container className="mt-5">

          <h5>{habitDoneToday.toString()}</h5>
          <h5>{habits.toString()}</h5>
          <Row className="justify-content-center d-flex">
            <Col xs={6} md={6} >
              <Paper elevation={3} className="px-3 py-2">
                <Row>

                  {habits.map((habit, index) => {
                    return (
                      <>
                        <Col xs={10} md={10} lg={10}>
                          <h1>{habit.name}</h1>
                        </Col >
                          {habitDoneToday

                            && habitDoneToday[index] === true ?
                            <Col xs={2} md={2} lg={2} className="mt-2 mb-0"
                              onClick={() => {
                                handleHabitUndoneToday(habit._id)
                                setRerender(!rerender)
                              }}
                            >
                              <CheckBoxIcon
                                fontSize='large'
                                style={{ cursor: "pointer" }}
                                color='success'
                              />

                            </Col>
                            :
                            <Col xs={2} md={2} lg={2} className="mt-2 mb-0"
                              onClick={() => {
                                handleHabitDoneToday(habit._id, "my reflection")
                                setRerender(!rerender)
                              } }
                            >
                              <CheckBoxOutlineBlankIcon
                                fontSize="large"
                                style={{ cursor: "pointer" }}

                              />

                            </Col>

                          }

                      </>
                    )
                  })}



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


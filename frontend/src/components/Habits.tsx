import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Button, CssBaseline } from "@mui/material";
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Habit from "../models/habit.model";
import * as HabitNetwork from '../network/habit.network';
import { wasDoneToday } from '../utils/wasDoneToday';
import { CreateEditHabit } from "./CreateEditHabit";
import { ReflectionModal } from './ReflectionModal';
import getMondayToSunday from '../utils/getMondayToSunday';
import dayjs from 'dayjs';
import Table from 'react-bootstrap/Table';
import getWeeklyRecordOfHabit from '../utils/getWeeklyRecordOfHabit';

export const Habits = () => {

  const [habits, setHabits] = useState<Habit[]>([])

  const [habitToEdit, setHabitToEdit] = useState<Habit | null>(null)

  const [habitDoneToday, setHabitDoneToday] = useState<Boolean[]>([])

  const [rerender, setRerender] = useState(false)

  const [showReflectionModal, setShowReflectionModal] = useState(false)

  const [weekDates, setWeekDates] = useState<string[]>([])

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [weeklyHabitTableRecord, setWeeklyHabitTableRecord] = useState<Boolean[][]>([])

  useEffect(() => {
    const setWeeklyTable = () => {
      const mondaySunday = getMondayToSunday()

      const monday = mondaySunday[0]
      const sunday = mondaySunday[1]

      var dates = []

      for (var day = monday; day <= sunday; day.setDate(day.getDate() + 1)) {
        const dj = dayjs(day)
        dates.push(dj.format('DD/MM/YYYY'))
      }

      setWeekDates(dates)
    }

    setWeeklyTable()

  })

  useEffect(() => {
    const createWeeklyHabitBooleanArray = (habits: Habit[]) => {
      var mainArray: any = []

      for(let i = 0; i<habits.length; i++){
        mainArray[i] = []
        mainArray[i].push(habits[i].name)

        const habitRecord = getWeeklyRecordOfHabit(weekDates, habits[i].completedDays)

        for(let j=1; j<=7; j++){
          mainArray[i][j] = habitRecord[j-1]
        }
      }

      setWeeklyHabitTableRecord(mainArray)
    }

    createWeeklyHabitBooleanArray(habits)
  }, [habits, weekDates])

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

  const [habitReflectionModalId, setHabitReflectionModalId] = useState('')

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
          {weekDates && weekDates.map((date) => {
            return (
              <h1>{date}</h1>
            )
          })}

          <Row className="justify-content-center d-flex">
            <Col xs={6} md={6} >
              <Paper elevation={3} className="px-3 py-2">
                <Row>

                  {habits.map((habit, index) => {
                    return (
                      <>
                        <Col xs={10} md={10} lg={10}>
                          <h3 style={{ color: 'black' }}>{habit.name}</h3>
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
                              setShowReflectionModal(true)
                              setHabitReflectionModalId(habit._id)
                              // handleHabitDoneToday(habit._id, "my reflection")
                              setRerender(!rerender)
                            }}
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

          <Table striped hover variant="dark" responsive style={{ tableLayout: 'fixed' }} className='mt-3'>

            <thead>
              <tr>
                <th ></th>
                {daysOfWeek.map((d) => (
                  <th className='text-center'>{d.substring(0, 3)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='text-center align-middle' style={{ wordWrap: 'break-word' }}>Habit nameeeeeeeeeeeeeeeeee</td>
                <td className='text-center align-middle'>Tick</td>
                <td>Tick</td>
                <td>Tick</td>
                <td>Tick</td>
                <td>Tick</td>
                <td>Tick</td>
                <td>Tick</td>
              </tr>
              <tr>
                <td className='text-center'>Habit</td>
                <td className='text-center'>Tick</td>
                <td>Tick</td>
                <td>Tick</td>
                <td>Tick</td>
                <td>Tick</td>
                <td>Tick</td>
                <td>Tick</td>
              </tr>
            </tbody>

          </Table>


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

      {showReflectionModal &&
        <ReflectionModal
          onDismiss={() => setShowReflectionModal(false)}
          habitId={habitReflectionModalId}
          onReflectionSaved={() => setShowReflectionModal(false)}
        />
      }

    </>

  )
}


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
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const Habits = () => {

  const [habits, setHabits] = useState<Habit[]>([])

  const [habitToEdit, setHabitToEdit] = useState<Habit | null>(null)

  const [habitDoneToday, setHabitDoneToday] = useState<Boolean[]>([])

  const [rerender, setRerender] = useState(false)

  const [showReflectionModal, setShowReflectionModal] = useState(false)

  const [weekDates, setWeekDates] = useState<string[]>([])

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [weekDisplacement, setWeekDisplacement] = useState(0)


  const [weeklyHabitTableRecord, setWeeklyHabitTableRecord] = useState<any[][]>([])

  useEffect(() => {
    const setWeeklyTable = () => {
      const mondaySunday = getMondayToSunday(weekDisplacement)

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

  }, [habits, weekDisplacement])

  useEffect(() => {
    const createWeeklyHabitBooleanArray = (habits: Habit[]) => {
      var mainArray: any = []

      for (let i = 0; i < habits.length; i++) {
        mainArray[i] = []
        mainArray[i].push(habits[i].name)

        const habitRecord = getWeeklyRecordOfHabit(weekDates, habits[i].completedDays, habits[i].createdAt)

        for (let j = 1; j <= 7; j++) {
          mainArray[i][j] = habitRecord[j - 1]
        }
      }

      setWeeklyHabitTableRecord(mainArray)
    }

    createWeeklyHabitBooleanArray(habits)
  }, [habits, weekDates, rerender])

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

          {weekDates.map((D) => {
            return(
              <h4>{D}</h4>
            )
          })}

          <Row className="justify-content-center d-flex">
            <Col xs={6} md={6} >
              <Paper elevation={3} className="px-3 py-2">
                <Row>

                  {habits.map((habit, index) => {
                    return (
                      <>
                        <Col className='align-middle' xs={10} md={10} lg={10} key={index}>
                          <h3 className='align-middle' style={{ color: 'black' }}>{habit.name}</h3>
                        </Col >
                        {habitDoneToday

                          && habitDoneToday[index] === true ?
                          <Col xs={2} md={2} lg={2} className=" align-middle"
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
                          <Col xs={2} md={2} lg={2} className="align-middle"
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

          <Row className='mt-5 mb-5'>
            <Col xs={6} sm={1} md={1} lg={1} className='text-center align-middle my-auto' onClick={() => {
              setWeekDisplacement(weekDisplacement-1)
              setRerender(!rerender)
            }}>
              <ArrowLeftIcon sx={{ fontSize: 60, backgroundColor: 'lightGrey', cursor: "pointer" }} />
            </Col>

            <Col xs={12} sm={12} md={10} lg={10}>
              {habits.length < 1 ? "Start a new habit to view your weekly progress"
                :
                <Table striped hover variant="dark" responsive style={{ tableLayout: 'fixed' }} >

                  <thead>
                    <tr>
                      <th className='text-center'>My habits</th>
                      {daysOfWeek.map((d, index) => (
                        <th key={index} className='text-center'>{d.substring(0, 3)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>

                    {weeklyHabitTableRecord.map((habit, ind) => {
                      return (
                        <tr key={ind}>
                          {habit.map((item, index) => {
                            var object

                            if (index === 0) object = <h5 className='text-center align-middle' style={{ wordWrap: 'break-word' }}>{item}</h5>
                            else if (item === "F") object = <CircleOutlinedIcon />
                            else if (item === "NA") object = <HorizontalRuleOutlinedIcon />
                            else if (item === true) object = <CheckCircleOutlinedIcon color='success' />
                            else object = <CancelOutlinedIcon color='error' />
                            return (
                              <td key={index} className='text-center align-middle'>
                                {object}
                              </td>

                            )
                          })}
                        </tr>
                      )
                    })}

                  </tbody>

                </Table>
              }


            </Col>

            <Col xs={6} sm={1} md={1} lg={1} className='text-center align-middle my-auto' onClick={() =>{
              setWeekDisplacement(weekDisplacement+1)
              setRerender(!rerender)
            }}>
              {weekDisplacement !== 0 &&

                <ArrowRightIcon sx={{ fontSize: 60, backgroundColor: 'lightGrey', cursor: "pointer" }} />

              }
            </Col>

          </Row>

          <Button onClick={() => setShowCreateEditHabitModal(true)}> + Add </Button>

          {showCreateEditHabitModal &&
            <CreateEditHabit
              habitToEdit={habitToEdit}
              onDismiss={() => setShowCreateEditHabitModal(false)}
              onHabitSaved={() => { setShowCreateEditHabitModal(false) }}
            />
          }

        </Container>
      </CssBaseline>

      {showReflectionModal &&
        <ReflectionModal
          onDismiss={() => setShowReflectionModal(false)}
          habitId={habitReflectionModalId}
          onReflectionSaved={() => {
            setShowReflectionModal(false)
            setRerender(!rerender)
          }}
        />
      }

    </>

  )
}


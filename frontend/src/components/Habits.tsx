import { Button, CssBaseline } from "@mui/material"
import { useState, useEffect } from "react"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Col, Container, Offcanvas, Row } from "react-bootstrap";
import accordionStyle from '../styles/accordion.module.css'

export const Habits = () => {

  const [habits, setHabits] = useState([])

  useEffect(() => {
    const getHabits = async () => {

    }
  })

  const [showCreateHabitCanvas, setShowCreateHabitCanvas] = useState(false)


  return (
    <>
      <CssBaseline>

        <Container className="mt-3">

          {habits.map((habit => {
            return (
              <h1>{habit}</h1>
            )
          }))}

          <Button onClick={() => setShowCreateHabitCanvas(true)}>SHow </Button>

          {showCreateHabitCanvas &&
            <Offcanvas show

              onHide={() => setShowCreateHabitCanvas(false)}
              placement="bottom"
            >

              <Offcanvas.Header closeButton>
                <Offcanvas.Title> <h3>Create new habit</h3> </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>

                

              </Offcanvas.Body>

            </Offcanvas>
          }


        </Container>




      </CssBaseline>

    </>

  )
}


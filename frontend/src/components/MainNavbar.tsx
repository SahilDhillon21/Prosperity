import { Button } from '@mui/material'
import { Container, Nav, Navbar } from "react-bootstrap"
import User from "../models/user.model"
import ButtonStyles from "../styles/button.module.css"

interface MainNavbarProps {
    loggedInUser: User | null,
    onLoginClicked: () => void,
    onSignupClicked: () => void,
    onLogoutClicked: () => void,
}

const MainNavbar = ({ loggedInUser, onLoginClicked, onSignupClicked, onLogoutClicked }: MainNavbarProps) => {
    return (
        <>
            <Navbar expand='md' variant="dark" bg="black" sticky="top">
                <Container>
                    <Navbar.Brand>
                        <h4>Prosperity</h4>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="main-navbar" />
                    <Navbar.Collapse id="main-navbar" />

                    <Nav className="ms-auto">
                        {loggedInUser ?

                            <>
                                <Navbar.Text className={`${ButtonStyles.whiteText} `}>
                                    <h5><a href={`/profile/${loggedInUser.username}`}>{loggedInUser.username}</a></h5>
                                </Navbar.Text>

                                <Button size="large" style={{ color: "red" }} className={`mb-1 me-2 `} onClick={onLogoutClicked}>
                                    Logout
                                </Button>
                            </>

                            :

                            <>
                                <Button style={{ color: "white" }} onClick={onSignupClicked}>
                                    Sign up
                                </Button>

                                <Button style={{ color: "white" }} onClick={onLoginClicked}>
                                    Log in
                                </Button>
                            </>
                        }
                    </Nav>

                </Container>
            </Navbar>
        </>
    )
}

export default MainNavbar


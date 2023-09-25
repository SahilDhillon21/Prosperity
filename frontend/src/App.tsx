import { CssBaseline, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.module.css';
import { Dashboard } from './components/Dashboard';
import MainButtons from './components/MainButtons';
import Navbar from './components/Navbar';
import { getAuthenticatedUser } from './network/user.network';
import { useEffect } from 'react'

interface LoggedInUserProps{
  _id: string,
  username: string,
  email: string,
  password: string
}

function App() {

  const [loggedInUser, setLoggedInUser] = useState<LoggedInUserProps|null>(null)

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await getAuthenticatedUser()
        setLoggedInUser(user)
      } catch (error) {
        alert("can't get logged in userrrr")
      }
    }
    fetchLoggedInUser()
  }, [])

  return (
    <div>

      <CssBaseline />
      <Navbar />

      <MainButtons />

      <h1>{JSON.stringify(loggedInUser)}</h1>
      <h1>{loggedInUser?.email}</h1>

      <Typography variant="h1"></Typography>

      <Routes>

        <Route path='/' element={<Dashboard />} />
        <Route path='/habits' element={<Dashboard />} />
        <Route path='/productivity' element={<Dashboard />} />
        <Route path='/' element={<Dashboard />} />

      </Routes>

    </div>
  );
}

export default App;



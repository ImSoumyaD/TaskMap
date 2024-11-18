import React, { useEffect, useState } from 'react';
import Home from './Components/Home'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import Register from './Components/Register'
import './App.css'
import {Routes, Route, useNavigate} from 'react-router-dom'

const App = () => {
  const navigate = useNavigate()

  //check if user already loggedin
  useEffect(() => {
    let loggedStatus = localStorage.getItem('loggedin')
    if (!loggedStatus) {
      localStorage.setItem('loggedin','false');
      loggedStatus = false
    }
    if (loggedStatus === 'true') {
      navigate('/dashboard')
    }
  }, [navigate])
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App
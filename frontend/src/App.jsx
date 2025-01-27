import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import  Signup  from './pages/Signup';
import { Toaster } from "react-hot-toast";
import Login from './pages/Login';
import { useAuthContext } from './context/AuthContext'
import Dashboard from './pages/Dashboard';
import PredictExpense from './pages/PredictExpense'



export default function App() {

  const {authUser} = useAuthContext();
  return (
    <div className=''>
        <Routes>
          <Route path = "/" element = {authUser ? <Dashboard/> : <Signup/> }/>
          <Route path = "/signup" element = {<Signup/>} />
          <Route path = "/login" element = {<Login/>} />
          <Route path = "/regression" element = {<PredictExpense/>} />
        </Routes>
        <Toaster />

    </div>
  )
}

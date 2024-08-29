import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Header from './pages/Header'
import BlogPost from './pages/BlogPost'


function App() {


  return (
    <>
    <Header/>
  
      
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/login' element={<Login/>} />
          <Route path = '/addblog' element={<BlogPost/>}/>
        </Routes>
     
    </>
  )
}

export default App

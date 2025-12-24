import React from 'react'
import Header from './components/Header.jsx'
import { Navigate, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Products from './pages/Products.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import VerifyOtp from './pages/VerifyOtp.jsx'
import Profile from './pages/Profile.jsx'

const App = () => {
  
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Navigate to="/home" replace />}/>
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/products' element={<Products />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/verify-otp' element={<VerifyOtp />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
    </>
  )
}

export default App

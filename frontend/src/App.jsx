import React from 'react'
import Header from './components/Header.jsx'
import { Navigate, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Products from './pages/Products.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import VerifyOtp from './pages/VerifyOtp.jsx'
import Profile from './pages/Profile.jsx'

import Cart from './pages/Cart.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AddProduct from './pages/admin/AddProduct.jsx'
import EditProduct from './pages/admin/EditProduct.jsx'
import Footer from './components/Footer.jsx'

const App = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to="/home" replace />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/add-product' element={<AddProduct />} />
          <Route path='/admin/edit-product/:id' element={<EditProduct />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App

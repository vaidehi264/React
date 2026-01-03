import React from 'react'
import Header from './components/Header.jsx'
import { Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Products from './pages/Products.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import VerifyOtp from './pages/VerifyOtp.jsx'
import Profile from './pages/Profile.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

import Cart from './pages/Cart.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'
import AddProduct from './admin/AddProduct.jsx'
import EditProduct from './admin/EditProduct.jsx'
import AdminInventory from './admin/AdminInventory.jsx'
import AdminBookings from './admin/AdminBookings.jsx'
import Checkout from './pages/CheckOut.jsx'
import MyBookings from './pages/MyBookings.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'

const App = () => {

  const location = useLocation();
  const hideLayout = location.pathname.startsWith('/admin');

  const user = JSON.parse(localStorage.getItem('techifyUser')) || {}
  const userRole = user.role || 'user';

  return (
    <>
      <Toaster position="top-right" />
      <Header />
      <ScrollToTop />
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
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/my-bookings' element={<MyBookings />} />


        {/* Admin Routes */}
        <Route path='/admin/dashboard' element={<ProtectedRoutes userRole={userRole}><AdminDashboard /></ProtectedRoutes>} />
        <Route path='/admin/inventory' element={<ProtectedRoutes userRole={userRole}><AdminInventory /></ProtectedRoutes>} />
        <Route path='/admin/bookings' element={<ProtectedRoutes userRole={userRole}><AdminBookings /></ProtectedRoutes>} />
        <Route path='/admin/add-product' element={<ProtectedRoutes userRole={userRole}><AddProduct /></ProtectedRoutes>} />
        <Route path='/admin/edit-product/:id' element={<ProtectedRoutes userRole={userRole}><EditProduct /></ProtectedRoutes>} />
      </Routes>


      {!hideLayout && <Footer />}
    </>
  )
}

export default App;

import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Cart from './components/Cart/Cart';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import Footer from './components/Home/Footer/Footer';
import Login from './components/LoginRegister/Login'
import Register from './components/LoginRegister/Register'
import ForgotPassword from './components/LoginRegister/ForgotPassword';
import NavBar from './components/NavBar/NavBar'
import Detail from './components/Home/Detail/Detail';
import Favorites from './components/Favorites/Favorites.jsx';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login/forgotpassword" element={<ForgotPassword />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App
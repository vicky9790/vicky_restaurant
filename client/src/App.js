// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './CartContext';
import Signup from "./components/Signup";
import Login from "./components/Login";
import About  from './pages/About';
import PlaceOrder from "./pages/PlaceOrder";
import AllUsers from "./pages/AllUsers"; 
import Users from "./pages/Users";
import AllOrders from './pages/AllOrders';
import MyOrders from "./pages/MyOrders";



function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/About" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/allusers" element={<AllUsers />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/allorders" element={<AllOrders />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;

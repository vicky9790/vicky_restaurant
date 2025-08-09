// src/App.js
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './CartContext';
import Signup from "./components/Signup";
import Login from "./components/Login";
import About from './pages/About';
import PlaceOrder from "./pages/PlaceOrder";
import AllUsers from "./pages/AllUsers";
import Users from "./pages/Users";
import AllOrders from './pages/AllOrders';
import MyOrders from "./pages/MyOrders";

// Optional NotFound component to show for unknown routes
function NotFound() {
  return <h2>404: Page Not Found</h2>;
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/allusers" element={<AllUsers />} />
          <Route path="/users" element={<Users />} />
          <Route path="/allorders" element={<AllOrders />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;

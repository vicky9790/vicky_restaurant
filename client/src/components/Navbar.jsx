import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import './Navbar.css';

const Navbar = () => {
  useEffect(() => {
    const toggle = document.getElementById("toggle-btn");
    const links = document.querySelector(".nav-links");
    toggle.addEventListener("click", () => {
      links.classList.toggle("show");
    });
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">Vicky's Restaurant</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>         {/* ✅ Changed */}
        <li><Link to="/menu">Menu</Link></li>     {/* ✅ lowercase */}
        <li><Link to="/cart">Cart</Link></li>     {/* ✅ lowercase */}
        <li><Link to="/about">About</Link></li>   {/* ✅ lowercase */}
        <li><Link to="/login">Login</Link></li>   {/* ✅ lowercase */}
      </ul>
      <div className="navbar-toggle" id="toggle-btn">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;

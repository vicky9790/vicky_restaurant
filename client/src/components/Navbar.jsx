import React, { useEffect } from 'react';
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
        <li><a href="/">Home</a></li>
        <li><a href="/menu">Menu</a></li>
        <li><a href="/Cart">Cart</a></li>
        <li><a href="/About">About</a></li>
        <li><a href="/Login">Login</a></li>

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

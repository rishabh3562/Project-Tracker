import React from "react";
import "./css/Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="left">

         <a className="logo" href="/">
          Logo
        </a> 
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/services">Services</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
      <div className="right">
        <button className="btn btn-primary">Login/signUp</button>
      </div>
        </div>
    </nav>
  );
};

export default Navbar;

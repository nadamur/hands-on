import React from 'react';
import Logo from '../assets/handsOnLogo.png';
import {Link} from "react-router-dom";
import '../styles/Navbar.css'

function Navbar() {
  return (
    <div className = "navbar">
        <div className='leftSide'>
            <h1 className='logo'>HANDS-ON</h1>
        </div>
        <div className='rightSide'>
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
        </div>
    </div>
  )
}

export default Navbar;
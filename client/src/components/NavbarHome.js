import React from 'react';
import Logo from '../assets/handsOnLogo.png';
import {Link} from "react-router-dom";
import '../styles/Navbar.css'

function NavbarHome() {
  return (
    <div className = "navbar">
        <div className='leftSide'>
            <h1 className='logo'>HANDS-ON</h1>
        </div>
        <div className='rightSide'>
            <a href='#'> Home </a>
            <a href='#about'> About </a>
            <a href='#features'> Features </a>
            <a href='#team'> Who We Are </a>
            <a href='#contact'> Contact Us </a>
        </div>
    </div>
  )
}

export default NavbarHome;
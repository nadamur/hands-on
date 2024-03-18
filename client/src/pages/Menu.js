import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';
import Translator from '../assets/Translator.png';
import Lessons from '../assets/Lessons.png';
import TimeTrials from "../assets/TimeTrials.png";
import Navbar from '../components/Navbar';

export default function Menu(){
    return(
            <div className="menu">
                <Navbar />
                <h1 className='menuTitle'> START YOUR LEARNING JOURNEY!</h1>
                <div className = 'menuItems'>
                    <Link to="../translator" style={{ textDecoration: 'none' }}>
                    <div className = 'menuItem'>
                        <button>
                            <img src = {Translator} alt = "translator"></img>
                        </button>
                        <button> ASL TO ENGLISH TRANSLATOR</button>
                    
                    </div>
                    </Link>
                    <Link to="../lessons" style={{ textDecoration: 'none' }}>
                    <div className = 'menuItem'>
                        <button>
                            <img src = {Lessons} alt = "lessons"></img>
                        </button>
                        <button> INTERACTIVE ASL LESSONS</button>

                    </div>
                    </Link>

                </div>

            </div>

    )
}
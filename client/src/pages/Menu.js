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
                <header2> START YOUR LEARNING JOURNEY</header2>
                <div className = 'LearningOptions'>
                    <Link to="../translator">
                    <div className = 'learningType'>
                        <button>
                            <img src = {Translator} alt = "translator"></img>
                        </button>
                        <button> ASL TO ENGLISH TRANSLATOR</button>
                    
                    </div>
                    </Link>
                    <Link to="../lessons">
                    <div className = 'learningType'>
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
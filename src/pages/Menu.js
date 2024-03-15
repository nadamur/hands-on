import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';
import Translator from '../assets/Translator.png';
import Lessons from '../assets/Lessons.png';
import TimeTrials from "../assets/TimeTrials.png";

export default function Menu(){
    return(
            <div className="menu">
                <header2> START YOUR LEARNING JOURNEY</header2>
                <div className = 'LearningOptions'>
                    <div className = 'learningType'>
                        <button>
                            <img src = {Translator} alt = "translator"></img>
                        </button>
                        <button> ASL TO ENGLISH TRANSLATOR</button>
                    
                    </div>

                    <div className = 'learningType'>
                        <button>
                            <img src = {Lessons} alt = "translator"></img>
                        </button>
                        <button> INTERACTIVE ASL LESSONS</button>

                    </div>

                    <div className = 'learningType'>
                        <button>
                            <img src = {TimeTrials} alt = "translator"></img>
                        </button>
                        <button> TIME TRIALS</button>

                    </div>

                </div>

            </div>

    )
}
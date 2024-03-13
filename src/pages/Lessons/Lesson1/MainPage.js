import React from 'react';
import '../styles/Lessons.css';
import { Link } from 'react-router-dom';
import Alphabet from '../assets/alphabet.png';
import Intros from '../assets/introductions.png';
import Farewells from '../assets/farewell.png';
import Navbar from '../components/Navbar';


function Lesson1() {
    return (
      <div>
        <Navbar/>
        <div className='lessons'>
          <h1 className='lessonsTitle'>Click a Lesson to Get Started!</h1>
          <div className='lessonsList'>
            
              <div className='lessonsItem'>
                <img src={Alphabet} ></img>
              </div>
            
            
              <div className='lessonsItem'>
                <img src={Intros}></img>
              </div>
           
            
            <div className='lessonsItem'>
              <img src={Farewells}></img>
            </div>
          </div>
        </div>
        </div>
      );
}

export default Lesson1;
import React from 'react';
import '../styles/Lessons.css';
import { Link } from 'react-router-dom';
import Lesson1 from '../assets/lesson1.png';
import Lesson2 from '../assets/lesson2.png';
import Lesson3 from '../assets/lesson3.png';
import Navbar from '../components/Navbar';


function Lessons() {
    return (
      <div>
        <Navbar/>
        <div className='lessons'>
          <h1 className='lessonsTitle'>Click a Lesson to Get Started!</h1>
          <div className='lessonsList'>
            
              <div className='lessonsItem'>
                <img src={Lesson1} ></img>
              </div>
            
            
              <div className='lessonsItem'>
                <img src={Lesson2}></img>
              </div>
           
            
            <div className='lessonsItem'>
              <img src={Lesson3}></img>
            </div>
          </div>
        </div>
        </div>
      );
}

export default Lessons
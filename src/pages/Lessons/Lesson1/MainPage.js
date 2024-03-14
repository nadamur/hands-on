import React from 'react';
import '../../../styles/Lessons.css';
import { Link } from 'react-router-dom';
import Alphabet from '../../../assets/alphabet.png';
import Intros from '../../../assets/introductions.png';
import Farewells from '../../../assets/farewell.png';
import Navbar from '../../../components/Navbar';


function Lesson1() {
    return (
      <div>
        <Navbar/>
        <div className='lessons'>
          <h1 className='lessonsTitle'>Click a Lesson to Get Started!</h1>
          <div className='lessonsList'>
            
              <div className='lessonsItem'>
                <Link to="../lesson/1-Alphabet">
                  <img src={Alphabet} ></img>
                  <h1>Alphabet</h1>
                </Link>   
              </div>
            
              <div className='lessonsItem'>
                <Link to="../lesson/1-Introductions">
                  <img src={Intros}></img>
                  <h1>Introductions</h1>
                </Link>
              </div>
           
            <div className='lessonsItem'>
              <Link to="../lesson/1-Farewell">
                <img src={Farewells}></img>
                <h1>Farewell</h1>
              </Link>
            </div>
          </div>
        </div>
        </div>
      );
}

export default Lesson1;
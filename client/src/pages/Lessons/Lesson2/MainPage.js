import React from 'react';
import '../../../styles/MainPage.css';
import { Link } from 'react-router-dom';
import Question from '../../../assets/question.png';
import People from '../../../assets/people.png';
import Magic from '../../../assets/magic.png';
import Navbar from '../../../components/Navbar';


function Lesson1() {
    return (
      <div>
        <Navbar/>
        <div className='mainPage'>
          <h1 className='lessonsTitle'>Click a Lesson to Get Started!</h1>
          <div className='lessonsList'>
            
              <div className='mainPageItem'>
                <Link to="../lesson/2-Magic Words" style={{ textDecoration: 'none' }}>
                  <img src={Magic} ></img>
                  <h1 style={{ color: 'black' }}>Magic Words</h1>
                </Link>   
              </div>
            
              <div className='mainPageItem'>
                <Link to="../lesson/2-People" style={{ textDecoration: 'none' }}>
                  <img src={People}></img>
                  <h1 style={{ color: 'black' }}>People</h1>
                </Link>
              </div>
           
            <div className='mainPageItem'>
              <Link to="../lesson/2-Questions" style={{ textDecoration: 'none' }}>
                <img src={Question}></img>
                <h1 style={{ color: 'black' }}>Questions</h1>
              </Link>
            </div>
            <div className='mainPageItem'>
              <Link to="../lesson/3-Introductions" style={{ textDecoration: 'none' }}>
                <img src={Question}></img>
                <h1 style={{ color: 'black' }}>TEST</h1>
              </Link>
            </div>
          </div>
        </div>
        </div>
      );
}

export default Lesson1;
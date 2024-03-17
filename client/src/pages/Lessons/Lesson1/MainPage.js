import React from 'react';
import '../../../styles/MainPage.css';
import { Link } from 'react-router-dom';
import Alphabet from '../../../assets/alphabet.png';
import Intros from '../../../assets/introductions.png';
import Farewells from '../../../assets/farewell.png';
import Navbar from '../../../components/Navbar';


function Lesson1() {
    return (
      <div>
        <Navbar/>
        <div className='mainPage'>
          <h1 className='lessonsTitle'>Click a Lesson to Get Started!</h1>
          <div className='lessonsList'>
            
              <div className='mainPageItem'>
                <Link to="../lesson/1-Alphabet" style={{ textDecoration: 'none' }}>
                  <img src={Alphabet} ></img>
                  <h1 style={{ color: 'black' }}>Alphabet</h1>
                </Link>   
              </div>
            
              <div className='mainPageItem'>
                <Link to="../lesson/1-Introductions" style={{ textDecoration: 'none' }}>
                  <img src={Intros}></img>
                  <h1 style={{ color: 'black' }}>Introductions</h1>
                </Link>
              </div>
           
            <div className='mainPageItem'>
              <Link to="../lesson/1-Farewell" style={{ textDecoration: 'none' }}>
                <img src={Farewells}></img>
                <h1 style={{ color: 'black' }}>Farewell</h1>
              </Link>
            </div>
            <div className='mainPageItem'>
                <Link to="../lesson/3-Introductions" style={{ textDecoration: 'none' }}>
                  <img src={Intros}></img>
                  <h1 style={{ color: 'black' }}>TEST</h1>
                </Link>
              </div>
          </div>
        </div>
        </div>
      );
}

export default Lesson1;
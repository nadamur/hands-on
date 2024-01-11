import React from 'react';
import '../styles/Lessons.css';
import { Link } from 'react-router-dom';
import EasyImage from '../assets/1.jpg';
import MediumImage from '../assets/2.jpg';
import HardImage from '../assets/3.jpg';


function Lessons() {
    return (
        <div className='lessons'>
          <h1 className='lessonsTitle'>Choose your lesson difficulty...</h1>
          <div className='lessonsList'>
            
              <div className='lessonsItem'>
                <button>Easy</button>
                <img src={EasyImage} ></img>
              </div>
            
            
              <div className='lessonsItem'>
                <button>Medium</button>
                <img src={MediumImage}></img>
              </div>
           
            
            <div className='lessonsItem'>
              <button>Hard</button>
              <img src={HardImage}></img>
            </div>
          </div>
          <Link to="/learn">
                <button id="menu-page-button">Go back to menu page</button>
            </Link>
        </div>
      );
}

export default Lessons
import styles from "../styles/Home.css";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//simax images
import HelloGIF from '../assets/hello_no_background.gif';
import Title from '../assets/TITLE.png';

const Home = () => {

  return (
    <div className='home' style={{ background: 'linear-gradient(to left, #E2D6F1 0%,#E2D6F1 10%, white 40%, white 100%)'}}>
      <div className='helloSection'>
        <div className='leftSide'>
          <img
            src={HelloGIF}
            alt='Hello ASL Sign'
          />
        </div>
        <div className='rightSide'>
        <img
            src={Title}
            alt='Welcome to Hands-On Learning'
          />
          <button>Get Started!</button>
        </div>
      </div>
      <div className="aboutSection" id="about">
        
      </div>

    </div>
  );
};

export default Home;

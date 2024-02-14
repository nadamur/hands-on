import styles from "../styles/Home.css";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//simax images
import HelloGIF from '../assets/hello_no_background.gif';
import Title from '../assets/TITLE.png';

const Home = () => {

  return (
    <div className='home' style={{ background: 'linear-gradient(to right, #E2D6F1, white)', backgroundPosition: '80% 20%' }}>
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

    </div>
  );
};

export default Home;

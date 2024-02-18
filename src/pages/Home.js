import styles from "../styles/Home.css";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//simax images
import HelloGIF from '../assets/hello_no_background.gif';
import Title from '../assets/TITLE.png';
import Star from '../assets/star1.png';

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
        <div className="aboutTitle">
          <h3 className="title">ABOUT HANDS-ON LEARNING</h3>
          <img src={Star}/>
        </div>
        <p className="description">
          Welcome to Hands-On Learning, your go-to destination for bridging communication gaps between American Sign Language (ASL) and English! Our mission is to make communication accessible and inclusive for everyone, regardless of their hearing ability.<br></br>

          At Hands-On Learning, we understand the importance of effective communication, which is why we've developed a user-friendly platform that empowers users to seamlessly translate ASL gestures into English text and vice versa. Whether you're a member of the Deaf community, a sign language interpreter, or simply curious about ASL, our intuitive translator tool is designed to meet your needs.<br></br>

          Our team is passionate about promoting linguistic diversity and breaking down barriers to communication. With our dedication to accuracy and accessibility, you can trust Hands-On to deliver reliable translations that facilitate meaningful interactions.<br></br>

          Join us in our mission to foster inclusivity and enhance communication experiences for everyone. Explore the world of ASL with confidence, knowing that Hands-On is here to support you every step of the way.<br></br>

          Start translating today and let's create a more connected and inclusive world together!
        </p>
      </div>
    </div>
  );
};

export default Home;

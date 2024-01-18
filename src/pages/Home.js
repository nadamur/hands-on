import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
// banner images
import BannerImage1 from '../assets/asl_4_2.jpg';
import BannerImage2 from '../assets/background.jpg';
//simax images
import HelloGIF from '../assets/hello_gif.gif';
import HelloImage from '../assets/hello.png';
import WonderfulGIF from '../assets/wonderful_gif.gif'

function Home() {
  //simax image
  const [currentHelloImage, setCurrentHelloImage] = useState(HelloImage);
  const [gifPlaying, setGifPlaying] = useState(false);
  //say 'hello' on launch
  useEffect(() =>{
    changeHelloState();
  }, []);
  //play 'hello' gif
  const changeHelloState = () => {
    setGifPlaying(true);
    setCurrentHelloImage(HelloGIF);

    setTimeout(() => {
      setGifPlaying(false);
      setCurrentHelloImage(HelloImage);
    }, 2000); // 2000 milliseconds = 2 seconds
  };
  //play 'wonderful' gif
  const changeWonderfulState = () => {
    setGifPlaying(true);
    setCurrentHelloImage(WonderfulGIF);

    setTimeout(() => {
      setGifPlaying(false);
      setCurrentHelloImage(HelloImage);
    }, 2550); // 2000 milliseconds = 2 seconds
  };

  return (
    <div className='home' style={{ backgroundColor: 'rgb(77, 41, 169)'}}>
      <div className='headerContainer'>
        <div className='leftSide'>
          <img
            src={currentHelloImage}
            alt='Hello ASL Sign'
            style={{ display: gifPlaying ? 'block' : 'none' }}
          />
          <img src = {currentHelloImage} style={{ display: gifPlaying ? 'none' : 'block' }} />
        </div>
        <div className='rightSide'>
          <h1>Hands-On Learning</h1>
          <p>Where Learning Meets Fun!</p>
          <button onClick={changeWonderfulState}>GET STARTED!</button>
        </div>
      </div>
    </div>
  );
}

export default Home;

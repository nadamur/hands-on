import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
//banner images
import BannerImage1 from '../assets/asl_4_2.jpg';
import BannerImage2 from '../assets/asl_5.png'

function Home() {
  //use state to alternate between banner images
  const [currentImage, setCurrentImage] = useState(0);
  //array for banner images
  const images = [BannerImage1,BannerImage2];
  useEffect(() =>{
    //change background every 2 seconds
    const interval = setInterval(()=>{
      setCurrentImage((prevIndex)=>(prevIndex+1)%images.length)
    }, 6000);
    return () => clearInterval(interval);
  }, [images]);
  const backgroundImageStyle ={
    backgroundImage: `url(${images[currentImage]})`,
    transition: 'background-image 1s ease-in-out',
  }
  return (
    <div className='home' style={backgroundImageStyle}>
        <div className='headerContainer'>
            <h1>Hands-On Learning</h1>
            <p>Where Learning Meets Fun!</p>
            <Link to="/learn">
                <button>GET STARTED!</button>
            </Link>
        </div>
    </div>
  )
}

export default Home
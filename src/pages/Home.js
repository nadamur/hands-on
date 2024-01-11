import React from 'react';
import { Link } from 'react-router-dom';
import BannerImage from '../assets/asl_4_2.jpg'
import '../styles/Home.css'

function Home() {
  return (
    <div className='home' style={{backgroundImage: `url(${BannerImage})`}}>
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
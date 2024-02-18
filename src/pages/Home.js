import styles from "../styles/Home.css";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//simax images
import HelloGIF from '../assets/hello_no_background.gif';
import HelloIMG from '../assets/hello_no_background.jpg';
import Title from '../assets/TITLE.png';
import Star from '../assets/star1.png';
import TranslatorIMG from "../assets/Translator.png";
import LessonsIMG from "../assets/Lessons.png";
import TimeTrialsIMG from "../assets/TimeTrials.png";
import BestFriendsGIF from '../assets/best_friends.gif';
import BestFriendsIMG from '../assets/best_friends.jpg';
import Team from '../assets/team.png';

const Home = () => {
  const [helloGifPlaying, setHelloGifPlaying] = useState(false);
  const [bffGifPlaying, setBffGifPlaying] = useState(false);
  const playGIF = (gif) =>{
    if(gif==="hello"){
      setHelloGifPlaying(prevState => !prevState);
    }
    else if (gif==="bff"){
      setBffGifPlaying(prevState => !prevState);
    }
  }
  return (
    <div className='home' style={{ background: 'linear-gradient(to left, #E2D6F1 0%,#E2D6F1 10%, white 40%, white 100%)'}}>
      <div className='helloSection'>
        <div className='leftSide'>
          <img
            src={helloGifPlaying ? HelloGIF : HelloIMG}
            onClick={() =>playGIF("hello")}
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
        <p className="aboutDescription">
          Welcome to Hands-On Learning, your go-to destination for bridging communication gaps between American Sign Language (ASL) and English! Our mission is to make communication accessible and inclusive for everyone, regardless of their hearing ability.<br></br>

          At Hands-On Learning, we understand the importance of effective communication, which is why we've developed a user-friendly platform that empowers users to seamlessly translate ASL gestures into English text and vice versa. Whether you're a member of the Deaf community, a sign language interpreter, or simply curious about ASL, our intuitive translator tool is designed to meet your needs.<br></br>

          Our team is passionate about promoting linguistic diversity and breaking down barriers to communication. With our dedication to accuracy and accessibility, you can trust Hands-On to deliver reliable translations that facilitate meaningful interactions.<br></br>

          Join us in our mission to foster inclusivity and enhance communication experiences for everyone. Explore the world of ASL with confidence, knowing that Hands-On is here to support you every step of the way.<br></br>

          Start translating today and let's create a more connected and inclusive world together!
        </p>
      </div>
      <div className="featuresSection" id="features">
        <div className="featuresTitle">
          <img src={Star}/>
          <h3 className="title">FEATURES</h3>
          <img src={Star}/>
        </div>
        <div className="featuresBlocks">
          <div className="ASLBlock">
            <img src={TranslatorIMG}/>
            <p className="featuresBlockTitle">ASL TO ENGLISH TRANSLATOR</p>
            <p className="description">Our cutting-edge technology empowers you to seamlessly translate American Sign Language (ASL) gestures into written English in real-time. Break down communication barriers and enhance understanding with our intuitive translator, whether you're in a classroom, workplace, or social setting.</p>
          </div>
          <div className="LessonsBlocks">
            <img src={LessonsIMG}/>
            <p className="featuresBlockTitle">INTERACTIVE ASL LESSONS</p>
            <p className="description">Dive into the rich world of American Sign Language with our interactive lessons designed for learners of all levels. From basic vocabulary to advanced expressions, our engaging curriculum combines video demonstrations, interactive exercises, and quiz feedback to help you master ASL fluency and cultural awareness.</p>
          </div>
          <div className="TimeBlocks">
            <img src={TimeTrialsIMG}/>
            <p className="featuresBlockTitle">TIME TRIALS</p>
            <p className="description">Put your ASL skills to the test with our Time Trials feature. Challenge yourself with timed quizzes and exercises tailored to your proficiency level. Track your progress, identify areas for improvement, and celebrate your achievements as you advance on your journey to becoming a confident ASL communicator.</p>
          </div>
        </div>
      </div>
      <div className="teamSection" id="team">
        <div className="teamHeader">
          <div className="bestFriends">
            <img src={bffGifPlaying ? BestFriendsGIF : BestFriendsIMG}
            onClick={() =>playGIF("bff")}/>
            <p className="featuresBlockTitle">WE PRESENT ... THE TEAM!!!</p>
          </div>
          <div className="teamTitle">
            <img src={Star}/>
            <h3 className="whoWeAre">WHO WE ARE</h3>
          </div>
        </div>
        <img src={Team} className="teamIMG"/>
      </div>
    </div>
  );
};

export default Home;

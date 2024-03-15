import React, { useEffect, useState } from 'react';
import '../../styles/Lesson.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
const lessonInfo = require('./Lessons.json');
const ENDPOINT = 'http://127.0.0.1:5000';  // Update with your Flask server endpoint

function Lesson() {
    const [currentTermIndex, setCurrentTermIndex] = useState(0);
    const [predictionText, setPredictionText] = useState('');
    const {lessonID} = useParams();
    //terms
    const [terms, setTerms] = useState([]);
    //copied terms
    const [copiedTerm, setCopiedTerm] = useState();
    //typed Terms
    const [typedTerm, setTypedTerm] = useState();
    //finished Terms (won't be repeated)
    const [finishedTerms, setFinishedTerms] = useState([]);
    const [finishedText, setFinishedText] = useState('');
    //index of phase
    const [currentPhaseIndex, setCurrenPhaseIndex] = useState(0);
    //phases -> 1- show video copy video. 2- show video type sign. 3- show text do sign
    const [phases, setPhases] = useState([]);
    useEffect(()=>{
      //get the lesson terms, scramble them
      const str = lessonID.split("-");
      const lessonNum = str[0];
      const lessonTitle = str[1];
      const lesson = lessonInfo[`lesson${lessonNum}`].find(lesson => lesson.title === lessonTitle);
      let terms = lesson ? lesson.terms : [];
      shuffleArray(terms);
      terms = terms.slice(0, 5);
      setTerms(terms);
      console.log('tlength: ' + terms.length);
      setPhases(['Copy the Sign Shown: ', 'Type the Sign Shown: ', 'Sign the Text Shown: ']);
    }, [lessonID]);
    useEffect(() => {
      const socket = socketIOClient(ENDPOINT);
      socket.on('connect', () => {
        console.log('Connected to server');
      });
    
      socket.on('sentence', data => {
        console.log('Received sentence:', data.sentence);
        setPredictionText(data.sentence.toString());
      });
    
      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });
    
      return () => {
        socket.disconnect();
      };
    }, []);  
    const handleNextTerm = () => { 
      setCurrentTermIndex(prevIndex => (prevIndex + 1) % terms.length);
    };
    const handleTermCopied = () =>{
      //add copied term
      setCopiedTerm(terms[currentTermIndex]);
    }
    const handleTermTyped = () =>{
      //add typed term, remove copied term
      setTypedTerm(copiedTerm);
    }
    const handleTermFinished = () =>{
      setFinishedTerms(prev => [...prev, terms[currentTermIndex-1]]);
      if ((finishedTerms.length+1)===terms.length){
        setFinishedText('Congratulations! You finished your lesson.');
        setPhases(['Done']);
      }
    }
    return (
      <div className='lesson'>
        <Navbar/>
        <h1>Lesson {lessonID}</h1>
        {phases[currentPhaseIndex]==='Copy the Sign Shown: ' &&(
          <div>
            <h1>{phases[currentPhaseIndex]}"{terms[currentTermIndex]}"</h1>
            <button onClick={() =>{handleNextTerm(); handleTermCopied();setCurrenPhaseIndex(prevIndex => (prevIndex + 1) % phases.length);}}>Next Term</button>
          </div>
        )}
        {phases[currentPhaseIndex]==='Type the Sign Shown: ' &&(
          <div>
            <h1>{phases[currentPhaseIndex]}"{copiedTerm}"</h1>
            <button onClick={() =>{handleTermTyped();setCurrenPhaseIndex(prevIndex => (prevIndex + 1) % phases.length);}}>Next Term</button>
          </div>
        )}
        {phases[currentPhaseIndex]==='Sign the Text Shown: ' &&(
          <div>
            <h1>{phases[currentPhaseIndex]}"{typedTerm}"</h1>
            <button onClick={() =>{handleTermFinished();setCurrenPhaseIndex(prevIndex => (prevIndex + 1) % phases.length);}}>Next Term</button>
          </div>
        )}
        {finishedText==='Congratulations! You finished your lesson.' &&(
          <div>
            <h1>{finishedText}</h1>
          </div>
        )}
            <div>
      <img src="http://127.0.0.1:5000/video_feed" alt="Prediction" />
      <pre>{predictionText}</pre>
    </div>
        </div>
      );
}

// Fisher-Yates (Knuth) shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default Lesson;
import React, { useEffect, useState } from 'react';
import '../../styles/Lessons.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useParams } from 'react-router-dom';
const lessonInfo = require('./Lessons.json');


function Lesson() {
    const [currentTermIndex, setCurrentTermIndex] = useState(0);
    const [terms, setTerms] = useState();
    const {lessonID} = useParams();
    useEffect(()=>{
      const str = lessonID.split("-");
      const lessonNum = str[0];
      const lessonTitle = str[1];
      const lesson = lessonInfo[`lesson${lessonNum}`].find(lesson => lesson.title === lessonTitle);
      const terms = lesson ? lesson.terms : [];
      setTerms(terms);
    }, [lessonID]);
    const handleNextTerm = () => {
      setCurrentTermIndex(prevIndex => (prevIndex + 1) % terms.length);
    };
    return (
      <div className='lessons'>
        <Navbar/>
        <h1>ID: {lessonID}</h1>
        {terms &&(
          <div>
            <p>Current Term: {terms[currentTermIndex]}</p>
            <button onClick={handleNextTerm}>Next Term</button>
          </div>
        )}
        </div>
      );
}

export default Lesson;
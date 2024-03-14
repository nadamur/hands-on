import React, { useEffect, useState } from 'react';
import '../../styles/Lessons.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useParams } from 'react-router-dom';
const lessonInfo = require('./Lessons.json');


function Lesson() {
    const [terms, setTerms] = useState();
    const {lessonID} = useParams();
    useEffect(()=>{
      const str = lessonID.split("-");
      const lessonNum = str[0];
      const lessonTitle = str[1];
      const lesson = lessonInfo[`lesson${lessonNum}`].find(lesson => lesson.title === lessonTitle);
      const terms = lesson ? lesson.terms : [];
    }, [])
    return (
      <div className='lessons'>
        <Navbar/>
        <h1>ID: {lessonID}</h1>
        </div>
      );
}

export default Lesson;
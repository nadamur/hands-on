import React from 'react';
import '../styles/Learn.css';
import ASLTranslator from '../assets/translator.jpg';
import Lessons from '../assets/lessons.jpg';
import Trials from '../assets/trials.jpg';

function Learn() {
  return (
    <div className='learn'>
      <h1 className='learnTitle'>Start Your Learning Journey!</h1>
      <div className='learnList'>
        <div className='learnItem'>
          <button>ASL-To-English Translator</button>
          <img src={ASLTranslator} alt='ASL Translator'></img>
        </div>
        <div className='learnItem'>
          <button>ASL Lessons</button>
          <img src={Lessons} alt='ASL Lessons'></img>
        </div>
        <div className='learnItem'>
          <button>ASL Time Trials</button>
          <img src={Trials} alt='ASL Time Trials'></img>
        </div>
      </div>
    </div>
  );
}

export default Learn;

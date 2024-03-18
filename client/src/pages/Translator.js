import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Translator.css';
import Navbar from '../components/Navbar';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:5000';

function Translator() {
    const [currentLanguage, setCurrentLanguage] = useState('English');
    const [predictionText, setPredictionText] = useState('');
    const [translation, setTranslation] = useState('');
    const handleLanguageChange = (language) => {
        setCurrentLanguage(language);
    };
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
      useEffect(()=>{
        setTranslation(prevTranslation => prevTranslation + predictionText + " ");
      }, [predictionText])

    return (
        <div className='translator-page'>
            <Navbar/>
            <h1>Sign to your camera for a live translation</h1>
            <div className='translator'>
            <img src="http://127.0.0.1:5000/video_feed" alt="Prediction" />
                <div className='translation'>
                    <div className='language-buttons'>
                        <button className={currentLanguage === 'English' ? 'selected' : ''} onClick={() => handleLanguageChange('English')}>English</button>
                        <button className={currentLanguage === 'Spanish' ? 'selected' : ''} onClick={() => handleLanguageChange('Spanish')}>Spanish</button>
                        <button className={currentLanguage === 'French' ? 'selected' : ''} onClick={() => handleLanguageChange('French')}>French</button>
                        <button className={currentLanguage === 'Mandarin' ? 'selected' : ''} onClick={() => handleLanguageChange('Mandarin')}>Mandarin</button>
                    </div>
                    <div className='text-box'>
                        <p>{translation}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Translator
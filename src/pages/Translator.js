import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CameraImage from '../assets/cam.jpg';
import '../styles/Translator.css';

function Translator() {
    const [currentLanguage, setCurrentLanguage] = useState('English');
    const handleLanguageChange = (language) => {
        setCurrentLanguage(language);
    };

    return (
        <div className='translator-page'>
            <h1>Sign to your camera for a live translation</h1>
            <div className='translator'>
                <img src={CameraImage} alt='ASL Time Trials'></img>
                <div className='translation'>
                    <div className='language-buttons'>
                        <button className={currentLanguage === 'English' ? 'selected' : ''} onClick={() => handleLanguageChange('English')}>English</button>
                        <button className={currentLanguage === 'Spanish' ? 'selected' : ''} onClick={() => handleLanguageChange('Spanish')}>Spanish</button>
                        <button className={currentLanguage === 'French' ? 'selected' : ''} onClick={() => handleLanguageChange('French')}>French</button>
                        <button className={currentLanguage === 'Mandarin' ? 'selected' : ''} onClick={() => handleLanguageChange('Mandarin')}>Mandarin</button>
                    </div>
                    <div className='text-box'>
                        <textarea placeholder='Translation will appear here...' />
                    </div>
                </div>
            </div>
            <Link to="/learn">
                <button id="menu-page-button">Go back to menu page</button>
            </Link>
        </div>
    )
}

export default Translator
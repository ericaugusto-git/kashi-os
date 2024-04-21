import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import styles from './Intro.module.scss'
import gradient from './Gradient.module.css'
// import React, { useState, useEffect, useRef } from 'react';

function Intro(){
    // const [letterSpacing, setLetterSpacing] = useState(0);
    // const textRef = useRef(null);

    // useEffect(() => {
    //     const fitText = () => {
    //         setTimeout(() => {
    //             const containerWidth = textRef.current?.['parentElement']?.['clientWidth'];
    //             const textWidth = textRef.current?.['scrollWidth'];
    //             console.log(containerWidth);
    //             console.log(textWidth)
    //             if (containerWidth !== undefined && textWidth !== undefined) {
    //                 const availableSpace = containerWidth - textWidth;
    //                 const numCharacters = (textRef.current?.['textContent'] || '').length - 1;
    //                 const newLetterSpacing = Math.max(availableSpace / numCharacters, 0);
    //                 console.log(newLetterSpacing)
    //                 setLetterSpacing(newLetterSpacing);
    //             }
    //         })
    //     };

    //     fitText(); // Call on mount
        
    //     // Call again whenever the window resizes
    //     window.addEventListener('resize', fitText);

    //     // Clean up event listener
    //     return () => {
    //         window.removeEventListener('resize', fitText);
    //     };
    // }, []);
    const { t } = useTranslation();
    const [theme] = useTheme()
    return (
        <div className={`${styles.intro_container} ${gradient.gradient} ${gradient[theme]}`}>
            <h6 className={styles.nome}>Eric Augusto Batista Carvalho</h6>
            <h6 className={styles.abrev}>Eric Augusto</h6>
            <span data-valor={t('front')} className={styles.front}>{t('front')}</span>
        </div>
    )
}

export default Intro;
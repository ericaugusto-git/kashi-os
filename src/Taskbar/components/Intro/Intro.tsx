import styles from './Intro.module.scss'
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

    return (
        <div className={styles.intro_container}>
            <h6 className={styles.nome}>Eric Augusto Batista Carvalho</h6>
            <h6 className={styles.abrev}>Eric Augusto</h6>
            <span className={styles.front}>Front-end Developer</span>
        </div>
    )
}

export default Intro;
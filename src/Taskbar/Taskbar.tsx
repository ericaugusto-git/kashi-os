import { useLayoutEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Taskbar.module.scss';
import Actions from './components/Actions/Actions';
import Clock from './components/Clock/Clock';
import Contact from './components/Contact/Contact';
import Intro from './components/Intro/Intro';

import Skills from './components/Skills/Skills';
import Start from './components/Start/Start';

function Taskbar(){
    const [theme] = useTheme();
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
    useLayoutEffect(() => {
      function updateSize() {
          console.log(window.innerWidth)
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return (
    <footer className={styles.menu + " " + styles[theme]}>
        <Start/>
        <div className={styles.skills}>
        <Skills />
        </div>
        <Intro/>
        <div className={styles.actions}>
        <Actions />
        </div>
        {size[0] <= 1200 && 
        <div className={styles.skills_actions}>
                    <Actions />
                    <Skills />
        </div>}
        {/* <div className={styles.contact}>
            <Contact/>
        </div> */}
        <Clock/>
    </footer>
    )
}

export default Taskbar;
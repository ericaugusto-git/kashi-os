import { useLayoutEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Taskbar.module.scss';
import Actions from './components/Actions/Actions';
import Clock from './components/Clock/Clock';

import Skills from './components/Skills/Skills';
import Start from './components/Start/Start';
import Windows from './components/Windows/Windows';
import MiniAllBtn from './components/MiniAllBtn/MiniAllBtn';

function Taskbar(){
    const [theme] = useTheme();
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
    useLayoutEffect(() => {
      function updateSize() {
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
        <Windows/>
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
        <MiniAllBtn/>
    </footer>
    )
}

export default Taskbar;
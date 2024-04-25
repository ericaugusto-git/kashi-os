import { useTheme } from '../contexts/ThemeContext';
import styles from './Taskbar.module.scss';
import Actions from './components/Actions/Actions';
import Clock from './components/Clock/Clock';
import Contact from './components/Contact/Contact';
import Intro from './components/Intro/Intro';

import Skills from './components/Skills/Skills';
import Start from './components/Start/Start';

function Taskbar(){
    const [theme] = useTheme()
    return (
    <footer className={styles.menu + " " + styles[theme]}>
        <Start/>
        <div className={styles.actions_skills}>
        <div className={styles.skills}>
            <Skills />
        </div>
        <Actions/>
        </div>
        <Intro/>
        {/* <div className={styles.contact}>
            <Contact/>
        </div> */}
        <Clock/>
    </footer>
    )
}

export default Taskbar;
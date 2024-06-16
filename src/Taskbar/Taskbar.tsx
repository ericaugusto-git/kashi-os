import { useTheme } from '../contexts/ThemeContext';
import styles from './Taskbar.module.scss';
import Actions from './components/Actions/Actions';
import Clock from './components/Clock/Clock';

import MiniAllBtn from './components/MiniAllBtn/MiniAllBtn';
import Skills from './components/Skills/Skills';
import Start from './components/Start/Start';
import Windows from './components/Windows/Windows';

function Taskbar(){
    const [theme] = useTheme();

    return (
    <footer className={styles.menu + " " + styles[theme.value]}>
        <Start/>
        <div className={styles.skills}>
        <Skills />
        </div>
        <Windows/>
        <div className={styles.actions}>
        <Actions />
        </div>
     
        {/* <div className={styles.contact}>
            <Contact/>
        </div> */}
        <Clock/>
        <MiniAllBtn/>
    </footer>
    )
}

export default Taskbar;
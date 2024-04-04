import styles from './Taskbar.module.scss';
import Actions from './components/Actions/Actions';
import Clock from './components/Clock/Clock';
import Intro from './components/Intro/Intro';

import Skills from './components/Skills';
import Start from './components/Start';

function Taskbar(){

    return (
    <footer className={styles.menu}>
        <Start/>
        <div className={styles.actions_skills}>
        <Skills />
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
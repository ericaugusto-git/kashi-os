import styles from './Menu.module.scss';
import Actions from './components/Actions';
import Clock from './components/Clock/Clock';
import Contact from './components/Contact/Contact';
import Intro from './components/Intro/Intro';

import Skills from './components/Skills';
import Start from './components/Start';

function Menu(){
    return (
    <footer className={styles.menu}>
        <Start/>
        <Skills/>
        <Actions/>
        <Intro/>
        <Contact/>
        <Clock/>
    </footer>
    )
}

export default Menu;
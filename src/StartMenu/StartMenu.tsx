import styles from './StartMenu.module.scss';
import cuteGif from '../assets/startMenu/start_menu.gif'
import sleep from '../assets/startMenu/sleep.svg'
import powerOff from '../assets/startMenu/power_off.svg'
import {projects} from '../constants/projects'
import { osApps } from '../constants/osApps';
import { motion } from "framer-motion";
import { useContext } from 'react';
import { StartSetterContext } from '../App';

function StartMenu(){
    const [startMenuOpen] = useContext(StartSetterContext);
    return (
            <motion.div 
            layout
            style={{ height: !startMenuOpen ? "0" : "315px", width: !startMenuOpen ? "0" : "315px", left: "10px", position: "fixed", bottom: "61px" }}
            //   initial={{ scaleY: 0, transformOrigin: 'bottom center' }}
            //   animate={{ scaleY: 1 }}
            //   exit={{scaleY: 0, transformOrigin: 'top center'}}
            //   transition={{ duration: 0.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            >
        <div className={styles.start_menu}>
            <div className={styles.col_1}>
            <div className={styles.cute_gif} style={{backgroundImage: `url(${cuteGif})`}}>
            </div>
            <menu>
                <ul>
                    <li>
                        <button className={styles.sleep}>
                        <img src={sleep}></img>
                        <span>
                            put to sleep
                        </span>
                        </button>
                    </li>
                    <li>
                        <button className={styles.power_off}>
                        <img src={powerOff}></img>
                            <span>
                                shut it down
                            </span>
                        </button>
                    </li>
                </ul>
            </menu>
            </div>
            <menu className={styles.col_2}>
                <li>
                    <span className={styles.title}>
                        Projects                
                    </span>
                    <ul>
                        {projects.map((project) =>  (
                        <li key={project.app}>
                            <button>
                            <img src={project.icon}></img>
                                <span>
                                    {project.app}
                                </span>
                            </button>
                        </li>
                        )
                        )
                        }
                       
                    </ul>
                </li>
                <li>
                    <span className={styles.title}>
                    O.S Apps
                    </span>
                    <ul>
                    {osApps.map((app) =>  (
                        <li key={app.label}>
                            <button>
                            <img src={app.icon}></img>
                                <span>
                                    {app.label}
                                </span>
                            </button>
                        </li>
                        )
                        )
                        }
                    </ul>
                </li>
            </menu>
        </div>
        </motion.div>
    )
}

export default StartMenu;
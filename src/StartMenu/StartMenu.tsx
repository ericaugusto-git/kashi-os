import styles from './StartMenu.module.scss';
import cuteGif from '../assets/startMenu/start_menu.gif'
import sleep from '../assets/startMenu/sleep.svg'
import powerOff from '../assets/startMenu/power_off.svg'
import {projects} from '../constants/projects'
import { osApps } from '../constants/osApps';

function StartMenu(){

    return (
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
    )
}

export default StartMenu;
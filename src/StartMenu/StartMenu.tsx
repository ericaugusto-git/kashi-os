import styles from './StartMenu.module.scss';
import cuteGif from '../assets/startMenu/start_menu.gif'
import sleep from '../assets/startMenu/sleep.svg'
import powerOff from '../assets/startMenu/power_off.svg'
import {projects, projectsType} from '../constants/projects'
import { osApps } from '../constants/osApps';
import { motion } from "framer-motion";
import { useContext } from 'react';
import { StartSetterContext, WindowContext } from '../App';
import { WindowType } from '../constants/window';
type WindowsTemplatesType = {
    [key: string]: JSX.Element;
  };

function StartMenu(){
    const [startMenuOpen] = useContext(StartSetterContext);
    const [windows, setWindows] = useContext(WindowContext);

    const windowsTemplates: WindowsTemplatesType = {
        ["playlist"]:    <div style={{ left: 0, width: '100%', height: '352px', position: 'relative' }}>
        <iframe
          src="https://open.spotify.com/embed/playlist/4LOeNOXvVYZth1VCa3W7sD?utm_source=oembed"
          style={{ top: 0, left: 0, width: '100%', height: '100%', position: 'absolute', border: 0 }}
          allowFullScreen
          allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture;"
        ></iframe>
      </div>
    }

    const openApp = (app: WindowType) =>{ 
        let updateWindow = windows.filter((a) => a.app != app.app);
        console.log(JSON.parse(JSON.stringify(updateWindow)));
        windows.map((a) => a.active = false)
        app.active = true;
        app.conteudo = windowsTemplates[app.app as keyof WindowsTemplatesType];
        updateWindow = [...updateWindow, app];
        setWindows(updateWindow);
    }

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
                            <button onClick={() => openApp(project)}>
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
                        <li key={app.app}>
                            <button onClick={() => openApp(app)}>
                            <img src={app.icon}></img>
                                <span>
                                    {app.app}
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
import { motion } from "framer-motion";
import { useContext } from 'react';
import { StartSetterContext } from '../App';
import powerOff from '../assets/startMenu/power_off.svg';
import sleep from '../assets/startMenu/sleep.svg';
import cuteGif from '../assets/startMenu/start_menu.gif';
import { osApps } from '../constants/osApps';
import { projects } from '../constants/projects';
import { WindowType } from '../constants/window';
import useOpenWindow from "../hooks/useOpenWindow";
import styles from './StartMenu.module.scss';
import Cmd from "./components/Cmd/Cmd";
import Playlist from "./components/Playlist/Playlist";
import Paint from "./components/Paint/Paint";
type WindowsTemplatesType = {
    [key: string]: {conteudo: JSX.Element} | WindowType;
  };

function StartMenu(){
    const [startMenuOpen, setStartMenuOpen] = useContext(StartSetterContext);

    const windowsTemplates: WindowsTemplatesType = {
        ["playlist"]:  {conteudo: <Playlist/>,  bodyStyles: {paddingRight: 0}, headerStyles: {paddingLeft: "25px"}},
        ["command line"]:  {conteudo: <Cmd/>},
        ["paint"]:  {conteudo: <Paint/>, cantMax: true, height: "95dvh", width: "100%", x: 0, y: 0}
    }
    const openWindow = useOpenWindow();
    const handleOpenApp = (app: WindowType) => {
        app = {...app, ...windowsTemplates[app.app as keyof WindowsTemplatesType]};
        openWindow(app);
        setStartMenuOpen(false);
    }
    // const openApp = (app: WindowType) =>{ 
    //     // let updateWindow = windows.filter((a) => a.app != app.app);
    //     // console.log(JSON.parse(JSON.stringify(updateWindow)));
    //     // windows.map((a) => a.active = false)
    //     // app.active = true;
    //     // app = {...app, ...windowsTemplates[app.app as keyof WindowsTemplatesType]};
    //     // updateWindow = [...updateWindow, app];
    //     // console.log(app)
    //     // setWindows(updateWindow);
    // }

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
            transition={{ duration: 0.3 }}
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
                            <button onClick={() => handleOpenApp(project)}>
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
                            <button onClick={() => handleOpenApp(app)}>
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
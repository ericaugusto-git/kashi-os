
import styles from "./Destop.module.scss";
import DesktopIcon from "./components/DesktopIcon/DesktopIcon";
import {projects,projectsType} from '../constants/projects'
import perfil from "../assets/desktop/perfil.png";
import jdm from '../assets/jdm.png'
import { useContext } from "react";
import { useWindowContext } from "../contexts/WindowContext";
import useOpenWindow from "../hooks/useOpenWindow";
import { WindowType } from "../constants/window";

function Desktop(){
    const apps: projectsType[] = JSON.parse(JSON.stringify(projects));
    apps.unshift({app: "About me", icon: perfil, styles: {height: "46px", width: "46px"}});
    const openWindow = useOpenWindow();
    const openApp = (app: WindowType) =>{ 
        app.conteudo = <div className="backgroundImage" style={{width: "100%", height: "100%", backgroundImage: `url(${jdm})`}}></div>
        openWindow(app)
    }
    return (
        <>
            <menu className={styles.desktop}>
                { apps.map(
                        (app) => 
                        <li key={app.app} onClick={() => openApp(app)}>
                            <DesktopIcon stylesProp={app.styles} app={app}/>
                        </li>
                    ) 
                }
            </menu>

        </>
    ) 
}

export default Desktop;
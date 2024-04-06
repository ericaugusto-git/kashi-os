
import styles from "./Destop.module.scss";
import DesktopIcon from "./components/DesktopIcon/DesktopIcon";
import {projects,projectsType} from '../constants/projects'
import perfil from "../assets/desktop/perfil.png";
import { useContext } from "react";
import { WindowContext } from "../App";

function Desktop(){
    const apps: projectsType[] = JSON.parse(JSON.stringify(projects));
    apps.unshift({app: "About me", icon: perfil, styles: {height: "46px", width: "46px"}});

    const [windows, setWindows] = useContext(WindowContext);
    const openApp = (app: projectsType) =>{ 
        let updateWindow = windows.filter((a) => a.app != app.app);
        console.log(JSON.parse(JSON.stringify(updateWindow)));
        windows.map((a) => a.active = false)
        app.active = true;

        updateWindow = [...updateWindow, app];
        setWindows(updateWindow);
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
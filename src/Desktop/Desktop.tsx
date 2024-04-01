
import styles from "./Destop.module.scss";
import DesktopIcon from "./components/DesktopIcon/DesktopIcon";
import {projects,projectsType} from '../constants/projects'
import perfil from "../assets/desktop/perfil.png";

function Desktop(){
    const apps: projectsType = JSON.parse(JSON.stringify(projects));
    apps.unshift({app: "About me", icon: perfil, styles: {height: "46px", width: "46px"}},
    )
    return (
    <menu className={styles.desktop}>
        { apps.map(
                (app) => 
                <li key={app.app}>
                    <DesktopIcon stylesProp={app.styles} app={app}/>
                </li>
            ) 
        }
    </menu>
    ) 
}

export default Desktop;
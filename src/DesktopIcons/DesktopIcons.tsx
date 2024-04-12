import perfil from "../assets/desktop/perfil.png";
import jdm from '../assets/jdm.png';
import { projects, projectsType } from '../constants/projects';
import { WindowType } from "../constants/window";
import useOpenWindow from "../hooks/useOpenWindow";
import styles from "./DestopIcons.module.scss";
import DesktopIcon from "./components/DesktopIcon/DesktopIcon";

function DesktopIcons() {
  const apps: projectsType[] = JSON.parse(JSON.stringify(projects));
  apps.unshift({
    app: "About me",
    icon: perfil,
    styles: {
      height: "46px",
      width: "46px"
    }
  });
  const openWindow = useOpenWindow();

  const openApp = (app: WindowType) => {
    app.conteudo = <div className="backgroundImage" style={{
      width: "100%",
      height: "100%",
      backgroundImage: `url(${jdm})`
    }}></div>;
    openWindow(app);
  };

  return <>
            <menu className={styles.desktop}>
                {apps.map(app => <li key={app.app} onClick={() => openApp(app)}>
                            <DesktopIcon stylesProp={app.styles} app={app} />
                        </li>)}
            </menu>

        </>;
}

export default DesktopIcons;
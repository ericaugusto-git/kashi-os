import { useTranslation } from "react-i18next";
import { WindowType } from "../constants/window";
import { windowsTemplates } from "../constants/windowsTemplate";
import useOpenWindow from "../hooks/useOpenWindow";
import styles from "./DestopIcons.module.scss";
import DesktopIcon from "./components/DesktopIcon/DesktopIcon";

function DesktopIcons() {
  const apps = windowsTemplates.filter(a=> a.appType == 'project' || a.desktop);
  // apps.unshift({
    // app: "About me",
    // icon: perfil,
  //   styles: {
  //     height: "46px",
  //     width: "46px"
  //   }
  // });
  const openWindow = useOpenWindow();

  const handleDesktopIconCLick = (app: WindowType) => {
    // app.conteudo = <div className="backgroundImage" style={{
    //   width: "100%",
    //   height: "100%",
    //   backgroundImage: `url(${jdm})`
    // }}></div>;
    openWindow(app);
  };


  return <>
            <menu className={styles.desktop}>
                {apps.map(app => <li key={app.app} onClick={() => handleDesktopIconCLick(app)}>
                            <DesktopIcon app={app} svgMask={app.svgMask?.desktop} buttonStyles={app.desktopStyles?.button} imgWrapperStyles={app.desktopStyles?.img} />
                </li>)}
                {/* <li onClick={openResume}>
                  <DesktopIcon  app={{app: 'resume', icon: resume, appType: 'os', hideInStartMenu: true,}} buttonStyles={{textTransform: 'none'}} svgMask={true}></DesktopIcon>
                </li> */}
            </menu>

        </>;
}

export default DesktopIcons;
import { WindowType } from "../constants/window";
import { windowsTemplates } from "../constants/windowsTemplate";
import useOpenWindow from "../hooks/useOpenWindow";
import styles from "./DestopIcons.module.scss";
import DesktopIcon from "./components/DesktopIcon/DesktopIcon";
import resume from "../assets/desktop/resume.svg";
import { useTranslation } from "react-i18next";
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
  const {t, i18n} = useTranslation();

  const handleDesktopIconCLick = (app: WindowType) => {
    // app.conteudo = <div className="backgroundImage" style={{
    //   width: "100%",
    //   height: "100%",
    //   backgroundImage: `url(${jdm})`
    // }}></div>;
    openWindow(app);
  };

  const openResume = () => {
    console.log(i18n.resolvedLanguage);
    window.open(i18n.resolvedLanguage == 'pt-BR' ? "https://drive.google.com/file/d/16NKogC8sO8VohS8i6Cvv0FU3NWEozyad/view?usp=sharing" : "https://drive.google.com/file/d/1JbOMaBScSv1RJPg5DOIh9EJg3XzphZuK/view?usp=sharing", "_blank");
  }

  return <>
            <menu className={styles.desktop}>
                {apps.map(app => <li key={app.app} onClick={() => handleDesktopIconCLick(app)}>
                            <DesktopIcon app={app} imgWrapperStyles={app.desktopStyles} />
                </li>)}
                <li onClick={openResume}>
                  <DesktopIcon  app={{app: 'resume', icon: resume, appType: 'os', hideInStartMenu: true,}} buttonStyles={{textTransform: 'none'}} svgMask={true}></DesktopIcon>
                </li>
            </menu>

        </>;
}

export default DesktopIcons;
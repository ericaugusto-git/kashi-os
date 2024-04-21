import { motion } from "framer-motion";
import { useContext } from "react";
import { StartSetterContext } from "../App";
import powerOff from "../assets/startMenu/power_off.svg";
import sleep from "../assets/startMenu/sleep.svg";
import cuteGif from "../assets/startMenu/start_menu.gif";
import { windowsTemplates } from "../constants/windowsTemplate";
import { WindowType } from "../constants/window";
import useOpenWindow from "../hooks/useOpenWindow";
import styles from "./StartMenu.module.scss";
import Cmd from "./components/Cmd/Cmd";
import Playlist from "./components/Playlist/Playlist";
import Paint from "./components/Paint/Paint";
import { PcStatusContext } from "../contexts/PcStatusContext";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { useWindowContext } from "../contexts/WindowContext";
type WindowsTemplatesType = {
  [key: string]: WindowType;
};

function StartMenu() {
  const [startMenuOpen, setStartMenuOpen] = useContext(StartSetterContext);
  const osApps = windowsTemplates.filter(a=> a.appType == 'os' && !a.hideInStartMenu);
  const projects = windowsTemplates.filter(a=> a.appType == 'project' && !a.hideInStartMenu);
  const {t} = useTranslation();
  const [theme] = useTheme()
  // const windowsTemplates: WindowsTemplatesType = {
  //   ["playlist"]: {
  //     conteudo: <Playlist />,
  //     bodyStyles: { paddingRight: 0 },
  //     headerStyles: { paddingLeft: "25px" },
  //   },
  //   ["command line"]: { conteudo: <Cmd /> },
  //   ["paint"]: {
  //     enableResizing: false,
  //     conteudo: <Paint />,
  //     cantMax: true,
  //     height: "95dvh",
  //     width: "100%",
  //     x: 0,
  //     y: 0,
  //   },
  // };
  const openWindow = useOpenWindow();
  const handleOpenApp = (app: WindowType) => {
    // app = {
    //   ...app,
    //   ...windowsTemplates[app.app as keyof WindowsTemplatesType],
    // };
    openWindow(app);
    setStartMenuOpen(false);
  };
  const [_, setPcStatus] = useContext(PcStatusContext);
  const [windows, setWindows] = useWindowContext();
  const handlePowerOff = () => {
    setWindows([]);
    setPcStatus("shutdown");
  };
  const handleSleep = () => {
    setPcStatus("sleeping");
  };
  const appsSections = [{title: 'projects', apps: projects, handleOnClick: handleOpenApp},{title: 'os', apps: osApps, handleOnClick: handleOpenApp}]
  // const openApp = (app: WindowType) =>{
  //     // let updateWindow = windows.filter((a) => a.app != app.app);
  //     // 
  //     // windows.map((a) => a.active = false)
  //     // app.active = true;
  //     // app = {...app, ...windowsTemplates[app.app as keyof WindowsTemplatesType]};
  //     // updateWindow = [...updateWindow, app];
  //     // 
  //     // setWindows(updateWindow);
  // }

  return (
    <motion.div
      layout
      style={{
        height: !startMenuOpen ? "0" : "315px",
        width: !startMenuOpen ? "0" : "335px",
        left: "10px",
        position: "fixed",
        bottom: "61px",
        zIndex:10
      }}
      //   initial={{ scaleY: 0, transformOrigin: 'bottom center' }}
      //   animate={{ scaleY: 1 }}
      //   exit={{scaleY: 0, transformOrigin: 'top center'}}
      //   transition={{ duration: 0.1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.start_menu + " " + styles[theme]}>
        <div className={styles.col_1}>
          <div
            className={styles.cute_gif}
            style={{ backgroundImage: `url(${cuteGif})` }}
          ></div>
          <menu>
            <ul>
              <li>
                <button className={styles.sleep} onClick={handleSleep}>
                  <img src={sleep}></img>
                  <span>{t('sleep')}</span>
                </button>
              </li>
              <li>
                <button className={styles.power_off} onClick={handlePowerOff}>
                  <img src={powerOff}></img>
                  <span>{t('shut')}</span>
                </button>
              </li>
            </ul>
          </menu>
        </div>
        <menu className={styles.col_2}>
          {appsSections.map((section) => (
            <li key={section.title}>
            <span className={styles.title}>{t(section.title)}</span>
            <ul>
              {section.apps.map((app) => (
                <li key={app.app}>
                  <button onClick={() => section.handleOnClick(app)}>
                    {/* <img src={app.icon}></img> */}
              {app.svgMask?.startMenu ? (
            <div style={{ maskImage: `url(${app.icon})` }} className={"svgMask " + styles.icon}></div>
          ) : <img src={app.icon}></img>}
                    <span>{t(app.app)}</span>
                  </button>
                </li>
              ))}
            </ul>
            </li>
          ))}
        </menu>
      </div>
    </motion.div>
  );
}

export default StartMenu;

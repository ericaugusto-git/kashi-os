import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StartSetterContext } from "../App";
import powerOff from "../assets/startMenu/power_off.svg";
import sleep from "../assets/startMenu/sleep.svg";
import search from "../assets/startMenu/search.svg";
import { AppType } from "../constants/apps";
import { APPS } from "../constants/apps";
import { usePcStatus } from "../contexts/PcStatusContext";
import {  useTheme } from "../contexts/ThemeContext";
import { useWindowContext } from "../contexts/WindowContext";
import useOpenWindow from "../hooks/useOpenWindow";
import styles from "./StartMenu.module.scss";
import { useDesktopPosition } from "../contexts/DesktopPositonContext";
import { fetchGif } from "../utils/utils";
import { ThemesJS } from "@/constants/themes";

function StartMenu({setSearchVisible, themes}: {setSearchVisible: Dispatch<SetStateAction<boolean>>, themes: ThemesJS}) {
  const [startMenuOpen, setStartMenuOpen] = useContext(StartSetterContext);
  const osApps = APPS.filter(
    (a) => a.appType == "os" && !a.hideInStartMenu
  );
  const projects = APPS.filter(
    (a) => a.appType == "project" && !a.hideInStartMenu
  );
  const { t } = useTranslation();
  const [theme] = useTheme();
  const [position] = useDesktopPosition();
  const [gifUrl, setGifUrl] = useState("");
  const [gifId, setGifId] = useState(themes[theme].giphy_id); // Replace with the specific GIF ID

  useEffect(() => {
    const updateGif = async () => {
      setGifUrl(await fetchGif(gifId));
    }
    updateGif();
  }, [gifId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.userAgent.indexOf('Mac') !== -1;

      if ((isMac && event.metaKey && event.key === 'k') || (!isMac && event.ctrlKey && event.key === 'k')) {
        event.preventDefault();
        event.stopPropagation();
        setSearchVisible((prev) => !prev);        
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setGifId(themes[theme].giphy_id);
  }, [theme, themes]);
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
  const handleOpenApp = (app: AppType) => {
    // app = {
    //   ...name,
    //   ...windowsTemplates[app.name as keyof WindowsTemplatesType],
    // };
    openWindow(app);
    setStartMenuOpen(false);
  };
  const [, setPcStatus] = usePcStatus();
  const [, setWindows] = useWindowContext();
  const handlePowerOff = () => {
    setWindows([]);
    setPcStatus("shutdown");
  };
  const handleSleep = () => {
    setStartMenuOpen(false);
    setPcStatus("sleeping");
  };
  const appsSections = [
    { title: "projects", apps: projects, handleOnClick: handleOpenApp },
    { title: "os", apps: osApps, handleOnClick: handleOpenApp },
  ];
  // const openApp = (app: AppType) =>{
  //     // let updateWindow = windows.filter((a) => a.name != app.name);
  //     //
  //     // windows.map((a) => a.active = false)
  //     // app.active = true;
  //     // app = {...name, ...windowsTemplates[app.name as keyof WindowsTemplatesType]};
  //     // updateWindow = [...updateWindow, app];
  //     //
  //     // setWindows(updateWindow);
  // }

  return (
    <AnimatePresence>
      {startMenuOpen && (
        <motion.div
          key="startmenu"
          layout
          // style={{ overflow: "hidden",           left: "10px",
          // position: "fixed",
          // bottom: "61px",
          // zIndex:10 }}
          // initial={{ scaleX: 0, opacity: 0, }}
          // animate={{ scaleX: 1, opacity:1, transformOrigin: "center left" }}
          // transition={{ duration: 0.2 }}
          // exit={{ scaleY: "0", opacity: 0, transformOrigin: "bottom center" }}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{ width: "369px", height: "349px", opacity: 1 }}
          exit={{ overflow: "hidden", width: 0, height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            height: "349px",
            width: "369px",
            left: "10px",
            position: "fixed",
            [position]: "45px",
            zIndex: 10,
          }}
          // initial={{ scaleY: 0, transformOrigin: 'bottom center' }}
          // animate={{ scaleY: 1 }}
          // exit={{opacity: 0, transformOrigin: 'bottomm center'}}
          // transition={{ duration: 0.3 }}
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // exit={{ opacity: 0 }}
          // transition={{ duration: 0.5 }}
        >
          <div className={styles.start_menu + " " + styles[theme]}>
            <div className={styles.col_1}>
              <a
              onClick={() => {window.open(gifUrl, "_blank")}}
                className={styles.cute_gif}
                style={{ backgroundImage: `url("${gifUrl}")` }}
              >
                {gifUrl && <img src="Poweredby_100px-Black_VertLogo.png"></img>}
              </a>
              <menu>
                <ul>
                  <li>
                    <button className={styles.sleep} onClick={handleSleep}>
                      <img src={sleep}></img>
                      <span>{t("sleep")}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={styles.power_off}
                      onClick={handlePowerOff}
                    >
                      <img src={powerOff}></img>
                      <span>{t("shut")}</span>
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
                      <li key={app.name}>
                        <button
                          className={styles.app_button}
                          onClick={() => section.handleOnClick(app)}
                        >
                          {/* <img src={app.icon}></img> */}
                          {app.svgMask?.startMenu ? (
                            <div
                              style={{ maskImage: `url("${app.icon}")` }}
                              className={"svgMask " + styles.icon}
                            ></div>
                          ) : (
                            <img src={app.icon}></img>
                          )}
                          <span>{t(app.name)}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li className={`${styles.search}`}>
                <button onClick={() => {setSearchVisible(true); setStartMenuOpen(false)}} className={styles.app_button}>
                  <div className={styles.search_label}>
                    <div
                      style={{ maskImage: `url("${search}")` }}
                      className={"svgMask " + styles.icon}
                    ></div>
                    {t("all_apps")}
                  </div>
                  <span>
                    <kbd>ctrl</kbd>
                    <kbd>/</kbd>
                    <kbd>⌘</kbd>
                    <kbd> K</kbd>
                  </span>
                </button>
              </li>
            </menu>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default StartMenu;


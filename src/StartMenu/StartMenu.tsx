import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StartSetterContext } from "../App";
import powerOff from "../assets/startMenu/power_off.svg";
import search from "../assets/startMenu/search.svg";
import sleep from "../assets/startMenu/sleep.svg";
import { WindowType } from "../constants/window";
import { windowsTemplates } from "../constants/windowsTemplate";
import { usePcStatus } from "../contexts/PcStatusContext";
import { Themes, useTheme } from "../contexts/ThemeContext";
import { useWindowContext } from "../contexts/WindowContext";
import useOpenWindow from "../hooks/useOpenWindow";
import styles from "./StartMenu.module.scss";
const gifsId: { [key in Themes]: string } = {
  dark: "OMFfLpauGoT4c",
  light: "N5B19awm2YvwMwf8JE",
  coffe: "k8kITi9SAwe9JWbUaH",
};
function StartMenu({setSearchVisible}: {setSearchVisible: Dispatch<SetStateAction<boolean>>}) {
  const [startMenuOpen, setStartMenuOpen] = useContext(StartSetterContext);
  const osApps = windowsTemplates.filter(
    (a) => a.appType == "os" && !a.hideInStartMenu
  );
  const projects = windowsTemplates.filter(
    (a) => a.appType == "project" && !a.hideInStartMenu
  );
  const { t } = useTranslation();
  const [theme] = useTheme();
  const [gifUrl, setGifUrl] = useState("");
  const [gifId, setGifId] = useState(gifsId[theme.value]); // Replace with the specific GIF ID

  useEffect(() => {
    const fetchGif = async () => {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/${gifId}?api_key=${
            import.meta.env.VITE_REACT_GIPHY_API_KEY
          }`
        );
        const data = await response.json();
        setGifUrl(data.data.images.original.url);
      } catch (error) {
        console.error("Error fetching the GIF:", error);
      }
    };

    fetchGif();
  }, [gifId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.userAgent.indexOf('Mac') !== -1;

      if ((isMac && event.metaKey && event.key === 'k') || (!isMac && event.ctrlKey && event.key === 'k')) {
        event.preventDefault();
        setSearchVisible((prev) => !prev);
        // Your logic for Ctrl/Cmd + K goes here
        
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setGifId(gifsId[theme.value]);
  }, [theme]);
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
  const [, setPcStatus] = usePcStatus();
  const [, setWindows] = useWindowContext();
  const handlePowerOff = () => {
    setWindows([]);
    setPcStatus("shutdown");
  };
  const handleSleep = () => {
    setPcStatus("sleeping");
  };
  const appsSections = [
    { title: "projects", apps: projects, handleOnClick: handleOpenApp },
    { title: "os", apps: osApps, handleOnClick: handleOpenApp },
  ];
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
            top: "41px",
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
          <div className={styles.start_menu + " " + styles[theme.value]}>
            <div className={styles.col_1}>
              <div
                className={styles.cute_gif}
                style={{ backgroundImage: `url("${gifUrl}")` }}
              ></div>
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
                      <li key={app.app}>
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
                          <span>{t(app.app)}</span>
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
                    search
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

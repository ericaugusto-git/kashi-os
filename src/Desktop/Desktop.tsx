import { CSSProperties, useEffect, useRef, useState } from "react";
import { StartSetterContext } from "../App";
import DesktopIcons from "../DesktopIcons/DesktopIcons";
import StartMenu from "../StartMenu/StartMenu";
import Search from "../StartMenu/components/Search/Search";
import TaskbarHypr from "../Taskbar/TaskbarHypr";
import { PcStatusMenu } from "../Taskbar/components/PcStatusMenu/PcStatusMenu";
import ThemeSwitcher from "../Taskbar/components/ThemeSwitcher/ThemeSwitcher";
import WallpaperSwitcher from "../Taskbar/components/WallpaperSwitcher/WallpaperSwitcher";
import Window from "../Window/Window";
import { themes, transitionMs } from "../constants/themes";
import { wallpapers } from "../constants/wallpapers";
import { useContextMenuHandler } from "../contexts/ContextMenuContext";
import { useDesktopPosition } from "../contexts/DesktopPositonContext";
import { usePcStatus } from "../contexts/PcStatusContext";
import { Themes, useTheme } from "../contexts/ThemeContext";
import { useWallpaper } from "../contexts/WallpaperContext";
import WindowContextProvider from "../contexts/WindowContext";
import useComponentVisible from "../hooks/useComponentVisible";
import { generateLayouts, getWppIndex } from "../utils/utils";
import styles from "./Desktop.module.scss";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import Lockscreen from "./components/Lockscreen/Lockscreen";
import Lofi from "./components/Lofi/Lofi";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Layouts } from "react-grid-layout";
import { WindowType } from "@/constants/window";
import { windowsTemplates } from '../constants/windowsTemplate';


function Desktop() {

  const [pcStatus, setPcStatus] = usePcStatus();
  const startButtonRef = useRef<HTMLButtonElement | null>(null);
  const pcStatusButtonRef = useRef<HTMLButtonElement | null>(null);
  const [startMenuRef, isStartMenuOpen, setisStartMenuOpen] = useComponentVisible(false, startButtonRef);
  const [pcStatusMenuRef, pcStatusMenuOpen, setPcStatusMenuOpen] = useComponentVisible(false, pcStatusButtonRef);
  const [searchRef, searchVisible, setSearchVisible] = useComponentVisible(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [theme] = useTheme();
  const isInitialMount = useRef(true);
  const [wallpaper, setWallpaper] = useState<{theme: Themes, wppIndex: number} | null | undefined>({theme: theme, wppIndex: getWppIndex(theme)});
  const [newWallpaper, setNewWallpaper] = useState<string | undefined>();
  const [wallpaperIndex] = useWallpaper();
  const [position] = useDesktopPosition();
  const themeButtonRef = useRef(null);
  const wallpaperButtonRef = useRef(null);
  const  [ themeSwitcherRef, themeSwitcherOpen, setThemeSwitcherOpen ] = useComponentVisible(false,themeButtonRef);
  const  [ wallpaperSwitcherRef, wallpaperSwitcherOpen, setwWallpaperSwitcherOpen ] = useComponentVisible(false,wallpaperButtonRef);
  const handleContextMenu = useContextMenuHandler("desktop");


  const [layouts, setLayouts] = useState<Layouts | null>(generateLayouts());


  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const changeWallpaper = async () => {
    const newWppIndex = getWppIndex(theme);
    setNewWallpaper(wallpapers[theme][newWppIndex]);
    await timeout(parseInt(transitionMs, 10));
    setNewWallpaper(undefined)
    setWallpaper({theme: theme, wppIndex: getWppIndex(theme)});
    // handleSetWallpaper();
  };



  useEffect(() => {
    // setWallpaper(theme === 'light' ? topography : code);
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // Object.values(wallpapers).forEach((wallpaper) => {
      //     new Image().src = wallpaper.imgs[0];
      // });
      setWallpaper({theme: theme, wppIndex: wallpaperIndex})
    } else {
      localStorage.setItem("theme", theme);
      changeWallpaper();
    }
  }, [theme, wallpaperIndex]);



  // const [a, setA] = useState(false);
  useEffect(() => {
    // joke of the year
    const shutup = (event: MouseEvent) => {
      if (!startMenuRef?.current?.contains(event.target as Node) && !pcStatusMenuRef?.current?.contains(event.target as Node) && pcStatus != "lofi") {
        setPcStatus("on");
      }
    };
    window.addEventListener("click",shutup);
    return () => window.removeEventListener("click", shutup);
  }, [pcStatus, setPcStatus, startMenuRef]);


  
  useEffect(() => {
    // const sourceElement = videoRef?.current?.childNodes[0] as HTMLElement;
    // const sourceSrc = sourceElement?.getAttribute('src');
    if(pcStatus != "shutdown"){
      videoRef.current?.load();
    }
  }, [pcStatus]);



    const [_, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const screenHandle = useFullScreenHandle();

  return (
    <FullScreen handle={screenHandle}>
      <div
        className={
          (pcStatus == "on" ? styles.desktop : styles[pcStatus]) +
          " " +
          styles[theme]
        }
        style={{'--theme-color': themes[theme].color, '--accent-color': themes[theme].accent, '--theme-transition-ms': transitionMs} as CSSProperties}
      >

  <div ref={themeSwitcherRef}>
              <ThemeSwitcher setThemeSwitcherOpen={setThemeSwitcherOpen} themeSwitcherOpen={themeSwitcherOpen}/>
          </div>
          <div ref={wallpaperSwitcherRef}>
              <WallpaperSwitcher setwWallpaperSwitcherOpen={setwWallpaperSwitcherOpen} wallpaperSwitcherOpen={wallpaperSwitcherOpen}/>
          </div>
        
        {/* The context menu */}
        <ContextMenu screenHandle={screenHandle} setLayouts={setLayouts} setThemeSwitcherOpen={setThemeSwitcherOpen} setwWallpaperSwitcherOpen={setwWallpaperSwitcherOpen}/>
        {/* The wallpaper */}
        <div className={styles.wallpaper_wrapper}>
        {wallpapers[wallpaper?.theme as Themes].map((wpp, index) => {
          return index == wallpaper?.wppIndex && 
          (<div key={wpp} className={`backgroundImage ${styles.wallpaperImg}`}  style={{backgroundImage: `url("${wpp}")`}}></div>)
        })}
        {newWallpaper && (<div className={`backgroundImage ${styles.wallpaperImg} ${styles.circle}`}  style={{backgroundImage: `url("${newWallpaper}")`}}></div>)}
        {/* {Object.keys(wallpapers).map((key) => {
          return (key == wallpaperKey?.theme || key == fallbackKey?.theme)   && 
          (<div key={key} className={`backgroundImage ${fallbackKey?.theme == key && styles.circle} ${styles.wallpaperImg}`}  style={{backgroundImage: `url("${pcStatus === 'sleeping' ? wallpapers.lockscreen[0] : wallpapers[key as keyof Wallpapers][key == fallbackKey?.theme ? fallbackKey.wppIndex : wallpaperKey?.wppIndex as number]}")`}}></div>)
        })} */}
        </div>

        {/* wrapper for the actual high elements of the desktop, Windows array, Taskbar, Desktopicons */}
        <div style={{ display: pcStatus === "sleeping" || pcStatus == "lofi" ? "none" : "" }}>
          <WindowContextProvider>
            <div ref={searchRef}><Search searchVisible={searchVisible} setSearchVisible={setSearchVisible} /></div>
            <div ref={pcStatusMenuRef}><PcStatusMenu pcStatusMenuOpen={pcStatusMenuOpen} setPcStatusMenuOpen={setPcStatusMenuOpen} /></div>
            {/* Array of windows */}
            <Window wrapperClass={styles.desktopIconsWrapper}>
            </Window>
            {/* <DesktopIcons /> */}
            <div style={{[position == 'top' ? 'bottom' : 'top']: 0}} onContextMenu={handleContextMenu} className={styles.desktopIconsWrapper}>
            <DesktopIcons layouts={layouts} setLayouts={setLayouts}/>

            </div>
            <StartSetterContext.Provider
              value={[isStartMenuOpen, setisStartMenuOpen, startButtonRef]}
            >
              <div ref={startMenuRef}>{<StartMenu setSearchVisible={setSearchVisible} />}</div>
              {/* <Taskbar /> */}
              <TaskbarHypr setPcStatusMenuOpen={setPcStatusMenuOpen} pcStatusButtonRef={pcStatusButtonRef} setwWallpaperSwitcherOpen={setwWallpaperSwitcherOpen}  setThemeSwitcherOpen={setThemeSwitcherOpen} wallpaperButtonRef={wallpaperButtonRef} themeButtonRef={themeButtonRef}/>
            </StartSetterContext.Provider>
          </WindowContextProvider>
        </div>
        {pcStatus === "sleeping" && <Lockscreen />}
        {pcStatus === 'lofi' && <div ><Lofi screenHandle={screenHandle}/></div>}
      </div>
    </FullScreen>
  );
}

export default Desktop;

import { CSSProperties, useEffect, useRef, useState } from "react";
import { isMobile } from 'react-device-detect';
import { StartSetterContext } from "../App";
import DesktopIcons from "../DesktopIcons/DesktopIcons";
import StartMenu from "../StartMenu/StartMenu";
import Search from "../StartMenu/components/Search/Search";
import TaskbarHypr from "../Taskbar/TaskbarHypr";
import { PcStatusMenu } from "../Taskbar/components/PcStatusMenu/PcStatusMenu";
import Window from "../Window/Window";
import { themes, transitionMs } from "../constants/themes";
import { wallpapers } from "../constants/wallpapers";
import { useDesktopPosition } from "../contexts/DesktopPositonContext";
import { usePcStatus } from "../contexts/PcStatusContext";
import { Themes, useTheme } from "../contexts/ThemeContext";
import { useWallpaper } from "../contexts/WallpaperContext";
import WindowContextProvider from "../contexts/WindowContext";
import useComponentVisible from "../hooks/useComponentVisible";
import { getWppIndex } from "../utils/utils";
import styles from "./Desktop.module.scss";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import Lockscreen from "./components/Lockscreen/Lockscreen";
import Lofi from "./components/Lofi/Lofi";
const initialContextMenu = {
  x: 0,
  y: 0,
};

function Desktop() {

  const [pcStatus, setPcStatus] = usePcStatus();
  const startButtonRef = useRef<HTMLButtonElement | null>(null);
  const pcStatusButtonRef = useRef<HTMLButtonElement | null>(null);
  const [startMenuRef, isStartMenuOpen, setisStartMenuOpen] = useComponentVisible(false, startButtonRef);
  const [pcStatusMenuRef, pcStatusMenuOpen, setPcStatusMenuOpen] = useComponentVisible(false, pcStatusButtonRef);
  const [contextMenuRef, isContextMenu, setContextVisible] = useComponentVisible(false);
  const [searchRef, searchVisible, setSearchVisible] = useComponentVisible(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [theme] = useTheme();
  const liveValue = localStorage.getItem('live');
  const [isLiveWallpaper, setisLiveWallpaper] = useState(liveValue ? liveValue == 'true' : !isMobile);
  const isInitialMount = useRef(true);
  const [contextMenu, setContextMenu] = useState(initialContextMenu);
  const [wallpaper, setWallpaper] = useState<{theme: Themes, wppIndex: number} | null | undefined>({theme: theme, wppIndex: getWppIndex(theme)});
  const [newWallpaper, setNewWallpaper] = useState<string | undefined>();
  const [wallpaperIndex] = useWallpaper();
  const [position] = useDesktopPosition();

  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const changeWallpaper = async () => {
    const newWppIndex = getWppIndex(theme);
    setNewWallpaper(wallpapers[theme][newWppIndex]);
    await timeout(1200);
    setNewWallpaper(undefined)
    setWallpaper({theme: theme, wppIndex: getWppIndex(theme)});
    // handleSetWallpaper();
  };

  useEffect(() => {
    localStorage.setItem('live', isLiveWallpaper.toString());
  }, [isLiveWallpaper]);

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

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { pageX, pageY } = e;
    setContextVisible(true);
    setContextMenu({ x: pageX, y: pageY });
  };
  
  useEffect(() => {
    // const sourceElement = videoRef?.current?.childNodes[0] as HTMLElement;
    // const sourceSrc = sourceElement?.getAttribute('src');
    if(pcStatus != "shutdown"){
      videoRef.current?.load();
    }
  }, [pcStatus]);


  const hideContextMenu = () => {
    setContextVisible(false)
  }

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

  return (
    <div
      className={
        (pcStatus == "on" ? styles.desktop : styles[pcStatus]) +
        " " +
        styles[theme]
      }
      style={{'--theme-color': themes[theme].color, '--accent-color': themes[theme].accent, '--theme-transition-ms': transitionMs} as CSSProperties}
    >
      
      {/* The context menu */}
      {isContextMenu && <div ref={contextMenuRef} ><ContextMenu  isLiveWallpaper={isLiveWallpaper} hideContextMenu={hideContextMenu} setIsLiveWallpaper={setisLiveWallpaper} x={contextMenu.x} y={contextMenu.y}/></div>}
      {/* The wallpaper */}
      <div onContextMenu={handleContextMenu} className={styles.wallpaper_wrapper}>
      {wallpapers[wallpaper?.theme as Themes].map((wpp, index) => {
        return index == wallpaper?.wppIndex && 
        (<div key={wpp} className={`backgroundImage ${styles.wallpaperImg}`}  style={{backgroundImage: `url("${pcStatus === 'sleeping' ? wallpapers.lockscreen[0] : wpp}")`}}></div>)
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

          <Window wrapperClass={styles.desktopIconsWrapper}>
          </Window>
          <div style={{[position == 'top' ? 'bottom' : 'top']: 0}}  className={styles.desktopIconsWrapper}>
          <DesktopIcons/>

            {/* <DesktopIcons /> */}
          </div>
          <StartSetterContext.Provider
            value={[isStartMenuOpen, setisStartMenuOpen, startButtonRef]}
          >
            <div ref={startMenuRef}>{<StartMenu setSearchVisible={setSearchVisible} />}</div>
            {/* <Taskbar /> */}
            <TaskbarHypr setPcStatusMenuOpen={setPcStatusMenuOpen} pcStatusButtonRef={pcStatusButtonRef}/>
          </StartSetterContext.Provider>
        </WindowContextProvider>
      {/* {windowSize.width <= 1200 && 
        <div className={styles.skills_actions}>
                    <Actions />
                    <div className={styles.skills2}>
                      <Skills />
                    </div>
        </div>} */}
      </div>
      {pcStatus === "sleeping" && <Lockscreen />}
      {pcStatus === 'lofi' && <div onContextMenu={handleContextMenu}><Lofi/></div>}
    </div>
  );
}

export default Desktop;

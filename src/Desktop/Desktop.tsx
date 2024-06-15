import { useEffect, useRef, useState } from "react";
import { StartSetterContext } from "../App";
import DesktopIcons from "../DesktopIcons/DesktopIcons";
import StartMenu from "../StartMenu/StartMenu";
import Taskbar from "../Taskbar/Taskbar";
import Window from "../Window/Window";
import { Wallpapers, wallpapers } from "../constants/wallpapers";
import { usePcStatus } from "../contexts/PcStatusContext";
import { useTheme } from "../contexts/ThemeContext";
import WindowContextProvider from "../contexts/WindowContext";
import useComponentVisible from "../hooks/useComponentVisible";
import styles from "./Desktop.module.scss";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import Lockscreen from "./components/Lockscreen/Lockscreen";
const initialContextMenu = {
  x: 0,
  y: 0,
};
import {isMobile} from 'react-device-detect';
import Search from "../StartMenu/components/Search/Search";
import Actions from "../Taskbar/components/Actions/Actions";
import Skills from "../Taskbar/components/Skills/Skills";
import Lofi from "./components/Lofi/Lofi";

function Desktop() {

  const [pcStatus, setPcStatus] = usePcStatus();
  const startButtonRef = useRef<HTMLButtonElement | null>(null);
  const [startMenuRef, isStartMenuOpen, setisStartMenuOpen] = useComponentVisible(false, startButtonRef);
  const [contextMenuRef, isContextMenu, setContextVisible] = useComponentVisible(false);
  const [searchRef, searchVisible, setSearchVisible] = useComponentVisible(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [theme] = useTheme();
  const liveValue = localStorage.getItem('live');
  const [isLiveWallpaper, setisLiveWallpaper] = useState(liveValue ? liveValue == 'true' : !isMobile);
  const isInitialMount = useRef(true);
  const [contextMenu, setContextMenu] = useState(initialContextMenu);
  const [wallpaperKey, setWallpaperKey] = useState('light');
  const [fallbackKey, setFallbackKey] = useState<string | null>(null);
  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const changeWallpaper = async () => {
    setFallbackKey(theme);
    await timeout(1200);
    setFallbackKey((prevFall) => {
      if(prevFall == theme){
        setWallpaperKey(theme);
        return null;
      }
      return prevFall;
    })
    // handleSetWallpaper();
  };

  useEffect(() => {
    localStorage.setItem('live', isLiveWallpaper.toString());
  }, [isLiveWallpaper]);

  useEffect(() => {
    // setWallpaper(theme === 'light' ? topography : code);
    const preloadVideo = (src: string) => {
      const video = document.createElement("video");
      video.preload = "auto"; // Optimize for preloading
      const source = document.createElement("source");
      source.src = src;
      source.type = "video/mp4";
      video.appendChild(source);
      video.load();
    };
    if (isInitialMount.current) {
      isInitialMount.current = false;
      Object.values(wallpapers).forEach((wallpaper) => {
          if(!isMobile){
            preloadVideo(wallpaper.video)
          }
          new Image().src = wallpaper.img;
      });
      setWallpaperKey(theme)
    } else {
      localStorage.setItem("theme", theme);
      changeWallpaper();
    }
  }, [theme]);




  // const [a, setA] = useState(false);
  useEffect(() => {
    // joke of the year
    const shutup = (event: MouseEvent) => {
      console.log(pcStatus)
      console.log( pcStatus != 'lofi')
      if (!startMenuRef?.current?.contains(event.target as Node) && pcStatus != 'lofi') {
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

    const [windowSize, setWindowSize] = useState({
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
    >
      {/* The context menu */}
      {isContextMenu && <div ref={contextMenuRef} ><ContextMenu  isLiveWallpaper={isLiveWallpaper} hideContextMenu={hideContextMenu} setIsLiveWallpaper={setisLiveWallpaper} x={contextMenu.x} y={contextMenu.y}/></div>}
      {/* The wallpaper */}
      <div onContextMenu={handleContextMenu} className={styles.wallpaper_wrapper}>
      {Object.keys(wallpapers).map((key) => {
        return (key == wallpaperKey || key == fallbackKey)   && 
        (isLiveWallpaper ? <video key={key} ref={(ref) => {if(pcStatus === 'sleeping' || key == wallpaperKey) {videoRef.current = ref}}}  preload='auto' autoPlay muted loop className={`${styles.background_video} ${fallbackKey == key && styles.circle}`}  disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback">
            <source src={ pcStatus === 'sleeping' ? wallpapers.lockscreen.video : wallpapers[key as keyof Wallpapers].video} type="video/mp4" />
            Your browser does not support the video tag.
          </video> : <div key={key} className={`backgroundImage ${fallbackKey == key && styles.circle} ${styles.wallpaperImg}`}  style={{backgroundImage: `url("${pcStatus === 'sleeping' ? wallpapers.lockscreen.img : wallpapers[key as keyof Wallpapers].img}")`}}></div>)
      })}
      </div>

      {/* wrapper for the actual high elements of the desktop, Windows array, Taskbar, Desktopicons */}
      <div style={{ display: pcStatus === "sleeping" || pcStatus == "lofi" ? "none" : "" }}>
        <WindowContextProvider>
          <div ref={searchRef}><Search searchVisible={searchVisible} setSearchVisible={setSearchVisible} /></div>
          <Window wrapperClass={styles.desktopIconsWrapper}>
          </Window>
          <div  className={styles.desktopIconsWrapper}>
            <DesktopIcons />
          </div>
          <StartSetterContext.Provider
            value={[isStartMenuOpen, setisStartMenuOpen, startButtonRef]}
          >
            <div ref={startMenuRef}>{<StartMenu setSearchVisible={setSearchVisible} />}</div>
            <Taskbar />
          </StartSetterContext.Provider>
        </WindowContextProvider>
      {windowSize.width <= 1200 && 
        <div className={styles.skills_actions}>
                    <Actions />
                    <div className={styles.skills2}>
                      <Skills />
                    </div>
        </div>}
      </div>
      {pcStatus === "sleeping" && <Lockscreen />}
      {pcStatus === 'lofi' && <div onContextMenu={handleContextMenu}><Lofi/></div>}
    </div>
  );
}

export default Desktop;

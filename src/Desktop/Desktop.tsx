import { useContext, useEffect, useRef, useState } from 'react';
import { StartSetterContext } from '../App';
import DesktopIcons from '../DesktopIcons/DesktopIcons';
import StartMenu from '../StartMenu/StartMenu';
import Taskbar from '../Taskbar/Taskbar';
import Window from "../Window/Window";
import { PcStatusContext } from '../contexts/PcStatusContext';
import { useTheme } from '../contexts/ThemeContext';
import WindowContextProvider from '../contexts/WindowContext';
import useComponentVisible from '../hooks/useComponentVisible';
import styles from './Desktop.module.scss';
import Lockscreen from './components/Lockscreen/Lockscreen';
import { wallpapers } from '../constants/wallpapers';


function Desktop(){
  const [pcStatus,setPcStatus] = useContext(PcStatusContext);
  const startButtonRef = useRef<HTMLButtonElement | null>(null);
  const [startMenuRef, isStartMenuOpen, setisStartMenuOpen] = useComponentVisible(false, startButtonRef);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [theme] = useTheme();
  const [wallpaper, setWallpaper] = useState(wallpapers.light)
  const [toggleAnimation, setToggleAnimation] = useState(false);
  const isInitialMount = useRef(true); 
  const [, setPreloadedVideos] = useState({});


  function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const changeWallpaper = async () => {
    await timeout(500);
    handleSetWallpaper();
    setToggleAnimation(false);
  }
  useEffect(() => {
    // setWallpaper(theme === 'light' ? topography : code);
    const preloadVideo = (src: string) => {
      const video = document.createElement('video');
      video.preload = 'auto'; // Optimize for preloading
      const source = document.createElement('source');
      source.src = src;
      source.type = 'video/mp4';
      video.appendChild(source);
      video.load();
      
      setPreloadedVideos(prevState => ({
        ...prevState,
        [src]: video,
      }));
    };
    if (isInitialMount.current) {
      isInitialMount.current = false;
      Object.values(wallpapers).forEach((wallpaper: string) => {
        if(theme != wallpaper) 
          preloadVideo(wallpaper)
        }
      );
      handleSetWallpaper();
    } else {
      localStorage.setItem("theme", theme);
      setToggleAnimation(true);
      changeWallpaper();
    }
  }, [theme]);

  const handleSetWallpaper = () => {
    setWallpaper(wallpapers[theme as keyof typeof wallpapers]);
  }


  // const [a, setA] = useState(false);
  useEffect(() => {
    // joke of the year
    const shutup = (event: MouseEvent) => {
      
      
      
      if(!startMenuRef?.current?.contains(event.target as Node)){
        
        setPcStatus("on")
      }
    }
    window.addEventListener("click", (event: MouseEvent) => {
      shutup(event);
    })
    return () => window.removeEventListener("click", shutup)
  },[])


useEffect(() => {
  videoRef.current?.load();
}, [pcStatus, theme, wallpaper]);
    return (
      <div className={(pcStatus == 'on' ? styles.desktop : styles[pcStatus]) + " " + styles[theme]}>
                {/* <div className={styles.circle + " " + (a ? styles.active : 'disable')}></div> */}
        <video ref={videoRef} preload='auto' autoPlay muted loop className={styles.background_video}  disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback">
        <source src={pcStatus === 'sleeping' ? wallpapers.lockscreen : wallpaper} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
        <div data-active={toggleAnimation ? true : false} className={styles.circle}></div>
        <div style={{display: pcStatus === 'sleeping' ? 'none' : ''}}>
   <WindowContextProvider>
            <DesktopIcons />
            <Window />
            <StartSetterContext.Provider
              value={[isStartMenuOpen, setisStartMenuOpen, startButtonRef]}
            >
              <div ref={startMenuRef}>{isStartMenuOpen && <StartMenu />}</div>
              <Taskbar />
            </StartSetterContext.Provider>
          </WindowContextProvider>
        </div>
        {pcStatus === 'sleeping' && <Lockscreen/>}
      </div>
    )
}

export default Desktop;
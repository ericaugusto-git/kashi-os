import { useContext, useEffect, useRef, useState } from 'react';
import { StartSetterContext } from '../App';
import DesktopIcons from '../DesktopIcons/DesktopIcons';
import StartMenu from '../StartMenu/StartMenu';
import Taskbar from '../Taskbar/Taskbar';
import Window from "../Window/Window";
import code from '../assets/code.mp4';
import lockscreen from '../assets/lockscreen.mp4';
import topography from '../assets/topography.mp4';
import lofi_girl from '../assets/lofi_girl.mp4';
import { PcStatusContext } from '../contexts/PcStatusContext';
import { useTheme } from '../contexts/ThemeContext';
import WindowContextProvider from '../contexts/WindowContext';
import useComponentVisible from '../hooks/useComponentVisible';
import styles from './Desktop.module.scss';
import Lockscreen from './components/Lockscreen/Lockscreen';


function Desktop(){
  const [pcStatus,setPcStatus] = useContext(PcStatusContext);
  const startButtonRef = useRef<HTMLButtonElement | null>(null);
  const [startMenuRef, isStartMenuOpen, setisStartMenuOpen] = useComponentVisible(false, startButtonRef);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [theme, setTheme] = useTheme();
  const [wallpaper, setWallpaper] = useState(topography)
  const [toggleAnimation, setToggleAnimation] = useState(false);
  const isInitialMount = useRef(true); 

  function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const changeWallpaper = async () => {
    await timeout(500);
    setToggleAnimation(false);
    setWallpaper(theme === 'dark' ? code : theme == 'coffe' ? lofi_girl : topography);
  }
  useEffect(() => {
    // setWallpaper(theme === 'light' ? topography : code);
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      console.log("true");
      setToggleAnimation(true);
      changeWallpaper();
    }
  }, [theme]);


  // const [a, setA] = useState(false);
  useEffect(() => {
    // joke of the year
    const shutup = (event: MouseEvent) => {
      console.log(startMenuRef.current)
      console.log(event.target as Node)
      console.log(startMenuRef?.current?.contains(event.target as Node))
      if(!startMenuRef?.current?.contains(event.target as Node)){
        console.log("what")
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
        <video ref={videoRef} autoPlay muted loop className={styles.background_video}  disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback">
        <source src={pcStatus === 'sleeping' ? lockscreen : wallpaper} type="video/mp4" />
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
import { useContext, useEffect, useRef } from 'react';
import { StartSetterContext } from '../App';
import DesktopIcons from '../DesktopIcons/DesktopIcons';
import StartMenu from '../StartMenu/StartMenu';
import Taskbar from '../Taskbar/Taskbar';
import Window from "../Window/Window";
import { PcStatusContext } from '../contexts/PcStatusContext';
import WindowContextProvider from '../contexts/WindowContext';
import useComponentVisible from '../hooks/useComponentVisible';
import lockscreen from '../assets/lockscreen.mp4';
import wallpaer from '../assets/wallpaper.mp4';
import Lockscreen from './components/Lockscreen/Lockscreen';
import styles from './Desktop.module.scss'

type DesktopProps = {
  children: React.ReactNode;
}

function Desktop(){
  const [pcStatus,setPcStatus] = useContext(PcStatusContext);
  const startButtonRef = useRef<HTMLButtonElement | null>(null);
  const [startMenuRef, isStartMenuOpen, setisStartMenuOpen] = useComponentVisible(false, startButtonRef);
  const videoRef = useRef<HTMLVideoElement | null>(null);
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
}, [pcStatus]);
    return (
      <div className={pcStatus == 'on' ? styles.desktop : styles[pcStatus]}>
        <video ref={videoRef} autoPlay muted loop className={styles.background_video}  disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback">
        <source src={pcStatus === 'sleeping' ? lockscreen : wallpaer} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
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
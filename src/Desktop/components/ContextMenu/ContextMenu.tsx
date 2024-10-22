import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { FullScreenHandle } from "react-full-screen";
import { useTranslation } from "react-i18next";
import layer from '../../../assets/contextMenu/layer.svg';
import lofi from '../../../assets/contextMenu/lofi.svg';
import mail from '../../../assets/contextMenu/mail.svg';
import maximize from '../../../assets/contextMenu/maximize.svg';
import minimmize from '../../../assets/contextMenu/minimize.svg';
import new_file from '../../../assets/contextMenu/new_file.svg';
import phone from '../../../assets/contextMenu/phone.svg';
import reset from '../../../assets/contextMenu/reset.svg';
import powerOff from "../../../assets/startMenu/power_off.svg";
import sleep from "../../../assets/startMenu/sleep.svg";
import taskbar_switcher from '../../../assets/taskbar/taskbar_switcher.svg';
import theme_change from '../../../assets/taskbar/theme_change.svg';
import wallpaper_change from '../../../assets/taskbar/wallpaper_change.svg';
import { useContextMenu } from "../../../contexts/ContextMenuContext";
import { useDesktopPositionHandler } from "../../../contexts/DesktopPositonContext";
import { usePcStatus } from "../../../contexts/PcStatusContext";
import { useWindowContext } from "../../../contexts/WindowContext";
import styles from './ContextMenu.module.scss';
import { Layouts } from "react-grid-layout";
import { generateLayouts } from "../../../utils/utils";
import mail2 from '../../../assets/taskbar/contact/mail.svg'

type MenuProps = {    setwWallpaperSwitcherOpen: Dispatch<SetStateAction<boolean>>, 
  setThemeSwitcherOpen: Dispatch<SetStateAction<boolean>>,
  screenHandle: FullScreenHandle,
  setLayouts: Dispatch<SetStateAction<Layouts | null>>
}

export default function ContextMenu({setwWallpaperSwitcherOpen, setThemeSwitcherOpen, screenHandle, setLayouts}: MenuProps){
    const contextRef = useRef<HTMLUListElement>(null);
    const [menuProps, setMenuProps] = useContextMenu();

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setMenuProps(null);
    }


    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (contextRef.current && !contextRef.current.contains(event.target as Node)) {
          setMenuProps(null);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    },[])
    
    return <>
    {menuProps?.x &&  <ul ref={contextRef} className={styles.contextMenu} style={{top: `${menuProps?.y}px`, left: `${menuProps?.x}px`}} onClick={handleClick}>
      {menuProps.source == 'desktop' ? <DesktopOptions setLayouts={setLayouts} screenHandle={screenHandle} setThemeSwitcherOpen={setThemeSwitcherOpen} setwWallpaperSwitcherOpen={setwWallpaperSwitcherOpen}/> : <AppOptions />}
      </ul>}
    </>
}

function AppOptions () {
  return <>
    <li>
      Open App
    </li>
    <li>
      Open in files
    </li>
    <li>
      About this project
    </li>
  </>
}

function DesktopOptions ({setwWallpaperSwitcherOpen, setThemeSwitcherOpen,screenHandle, setLayouts}: MenuProps){
  const {t} = useTranslation();
  const [pcStatus, setPcStatus] = usePcStatus();
  const changePosition = useDesktopPositionHandler();
  const [, setWindows] = useWindowContext();
  const handlePowerOff = () => {
    setWindows([]);
    setPcStatus("shutdown");
  };
  const handleSleep = () => {      
    setPcStatus("sleeping");
  };

  const handleContact = (link: string) => {
    window.open(link)
  }

  const resetDesktop = () => {
    localStorage.removeItem('app-layouts');
    setLayouts(generateLayouts());
  }
  return <>        
      <li onClick={() => setPcStatus('lofi')}>
        <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("${new_file}")`}}></div>
          {t('new_file')}
        </li>

        <li onClick={() => setwWallpaperSwitcherOpen(previous => !previous)} >
        <div className={`svgMask ${styles.ghost}`}   style={{maskImage: `url("${wallpaper_change}")`}}></div>
          {t('change_wpp')}
        </li>
        <li onClick={() => setThemeSwitcherOpen(previous => !previous)}>
        <div className={`svgMask ${styles.pallete}`}   style={{maskImage: `url("${theme_change}")`}}></div>
          {t('change_theme')}
        </li>
        <li onClick={changePosition}>
        <div className={`svgMask ${styles.boxes}`}   style={{maskImage: `url("${taskbar_switcher}")`}}></div>
          {t('change_position')}
        </li>
        <li onClick={screenHandle.active ? screenHandle.exit : screenHandle.enter}>
        <div className={`svgMask ${styles.boxes}`}   style={{maskImage: `url("${screenHandle.active ? minimmize : maximize}")`}}></div>
          {t(screenHandle.active ? 'exit_fullscreen' : 'fullscreen')}
        </li>
        <li onClick={resetDesktop}>
        <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("${reset}")`}}></div>
          {t('reset_desktop')}
        </li>
        <li onClick={() => setPcStatus('lofi')}>
        <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("${layer}")`}}></div>
          {t('hide_desktop')}
        </li>
        <div className={styles.separator}></div>
        <li onClick={() => handleContact('mailto:eric72001@hotmail.com')}>
          <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("${mail2}")`}}></div>
            eric72001@hotmail.com
        </li>
        <li onClick={() => handleContact('tel:+55 (71) 98188-6126')}>
          <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("${phone}")`}}></div>
          (71) 98188-6126
        </li>
        <div className={styles.separator}></div>
        <li onClick={() => setPcStatus('lofi')}>
          <div className={"svgMask " + styles.icon} style={{maskImage: `url("${lofi}")`}}></div>
          Lofi
        </li>
        {pcStatus != 'sleeping' && <li onClick={handleSleep}>
          <div className={"svgMask " + styles.svgMask} style={{maskImage: `url("${sleep}")`}}></div>
          <span>{t('sleep')}</span>
        </li>}
        <li onClick={handlePowerOff}>
          <img src={powerOff}></img>
          <span>{t('shut')}</span>
        </li>
  </>
}
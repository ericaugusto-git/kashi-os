import { SetStateAction, useRef } from "react";
import { useTranslation } from "react-i18next";
import check from '../../../assets/contextMenu/check.svg';
import powerOff from "../../../assets/startMenu/power_off.svg";
import sleep from "../../../assets/startMenu/sleep.svg";
import { usePcStatus } from "../../../contexts/PcStatusContext";
import { useWindowContext } from "../../../contexts/WindowContext";
import styles from './ContextMenu.module.scss';

type ContextMenu = {
    x: number,
    y: number, 
    hideContextMenu: () => void,
    setIsLiveWallpaper: React.Dispatch<SetStateAction<boolean>>,
    isLiveWallpaper: boolean
}
export default function ContextMenu({x, y, hideContextMenu, setIsLiveWallpaper, isLiveWallpaper}: ContextMenu){
    const contextRef = useRef<HTMLUListElement>(null);
    const {t} = useTranslation();
    const [pcStatus, setPcStatus] = usePcStatus();
    const [, setWindows] = useWindowContext();
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      hideContextMenu();
    }
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
    
    return <ul ref={contextRef} className={styles.contextMenu} style={{top: `${y}px`, left: `${x}px`}} onClick={handleClick}>
        <li onClick={() => setIsLiveWallpaper(true)}>
          Live wallpaper
          {isLiveWallpaper && <img src={check}></img>}
        </li>
        <li onClick={() => setIsLiveWallpaper(false)}>
          Static wallpaper
          {!isLiveWallpaper && <img src={check}></img>}
        </li>
        {/* <li onClick={() => setPcStatus('lofi')}>
          Lofi
        </li> */}
        <div className={styles.separator}></div>
        <li onClick={() => handleContact('mailto:eric72001@hotmail.com')}>
            eric72001@hotmail.com
        </li>
        <li onClick={() => handleContact('tel:+55 (71) 98188-6126')}>
          (71) 98188-6126
        </li>
        <div className={styles.separator}></div>
        {pcStatus != 'sleeping' && <li onClick={handleSleep}>
          <div className={"svgMask " + styles.svgMask} style={{maskImage: `url("${sleep}")`}}></div>
          <span>{t('sleep')}</span>
        </li>}
        <li onClick={handlePowerOff}>
          <img src={powerOff}></img>
          <span>{t('shut')}</span>
        </li>
    </ul>
}
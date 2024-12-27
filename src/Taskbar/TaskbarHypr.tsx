import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import powerOff from "../assets/startMenu/power_off.svg";
import taskbar_switcher from '../assets/taskbar/taskbar_switcher.svg';
import theme_change from '../assets/taskbar/theme_change.svg';
import wallpaper_change from '../assets/taskbar/wallpaper_change.svg';
import { useDesktopPosition, useDesktopPositionHandler } from "../contexts/DesktopPositonContext";
import { useWindowContext } from "../contexts/WindowContext";
import useComponentVisible from "../hooks/useComponentVisible";
import LocaleSwitcher from "./LocaleSwitcher/LocaleSwitcher";
import style from './TaskbarHypr.module.scss';
import Battery from "./components/Battery/Battery";
import Calendar from "./components/Calendar/Calendar";
import ClockHypr from "./components/ClockHypr/ClockHypr";
import Performance from "./components/Performance/Performance";
import Start from "./components/Start/Start";
import WindowsHypr from "./components/WindowsHypr/WindowsHypr";

type TaskbarProps = {
    setPcStatusMenuOpen: Dispatch<SetStateAction<boolean>>, 
    pcStatusButtonRef: MutableRefObject<HTMLButtonElement | null>
    setwWallpaperSwitcherOpen: Dispatch<SetStateAction<boolean>>, 
    setThemeSwitcherOpen: Dispatch<SetStateAction<boolean>>, 
    wallpaperButtonRef: MutableRefObject<HTMLButtonElement | null>
    themeButtonRef: MutableRefObject<HTMLButtonElement | null>
}

export default function TaskbarHypr({setPcStatusMenuOpen, pcStatusButtonRef, setwWallpaperSwitcherOpen, wallpaperButtonRef, setThemeSwitcherOpen, themeButtonRef}: TaskbarProps){

    const clockButtonRef = useRef(null);
    const windowsRef = useRef<HTMLDivElement>(null);

    const {t} = useTranslation();
    const [position] = useDesktopPosition();
    const changePosition = useDesktopPositionHandler();
    const  [ calendarRef, isCalendarOpen, setIsCalendarOpen ] = useComponentVisible(false, clockButtonRef);
    const [windows, setWindows] = useWindowContext();
    const [windowsDivTotalLength, setWindowsDivTotalLength] = useState(0);

    useEffect(() => {
        const handleResize = () => {
          if (windowsRef.current) {
            const element = windowsRef.current;
            
            // Get the element's width
            const rect = element.getBoundingClientRect();
            const width = rect.width;
            
            // Get the element's computed style
            const style = window.getComputedStyle(element);
            const marginLeft = parseFloat(style.marginLeft);
            const marginRight = parseFloat(style.marginRight);
            
            // Calculate the total width
            const totalWidth = width + marginLeft + marginRight;

            setWindowsDivTotalLength(totalWidth);
          }
        };
    
        window.addEventListener('resize', handleResize);
        // Call handleResize once to set the initial width
        handleResize();
    
        return () => window.removeEventListener('resize', handleResize);
      }, [windows]);

    const openCalendar = () => { 
        setIsCalendarOpen(previous => !previous)
    }
    return <>
    <div className={style.taskbar} style={{[position]: 0}}>
        <div className={style.start} style={{marginRight: windows.length == 0 ? 'auto' : ''}}>
            <Start/>
        </div>
        <div  style={{marginRight: windows.length == 0 ? 'auto' : ''}} className={`${style.taskbar_section_wrapper} ${style.intro}`}>
            <div>
                <span>カシ・OS</span>
            </div>
            <a href="https://www.linkedin.com/in/eric-augusto-775245a9/" target="_blank" className={style.welcome}>{t('made')} Eric Augusto・<span className={style.front}>{t('front')}</span> </a>
        </div>
        <AnimatePresence>
            { windows?.length > 0 && <motion.div ref={windowsRef} initial={{scale: 0.9, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{duration: 0.1}} className={`${style.taskbar_section_wrapper} ${style.windows}`}>
                <WindowsHypr windowsDivTotalLength={windowsDivTotalLength} windows={windows} setWindows={setWindows}/>
            </motion.div>}
        </AnimatePresence>
        <div className={style.date_time_wrapper}>
            <div  ref={calendarRef} style={{zIndex: 9}}>
                <AnimatePresence>
                { isCalendarOpen && <motion.div           initial={{ opacity: 0 }}
            animate={{opacity: 1 }}
            exit={{ overflow: "hidden", opacity: 0 }}
            transition={{ duration: 0.2 }}><Calendar/></motion.div>}
                </AnimatePresence>
            </div>

            <a className={`${style.taskbar_section_wrapper} ${style.date_time}`} onClick={openCalendar} ref={clockButtonRef}>
                <ClockHypr/>
            </a>
        </div>
     {performance?.memory &&   <div className={`${style.taskbar_section_wrapper} ${style.performance}`} data-tooltip={t('memory')}>
            <Performance/>
        </div>}
        <div className={`${style.taskbar_section_wrapper} ${style.locale_battery}`}>
            <LocaleSwitcher/>
            <Battery/>
        </div>
        <div className={style.taskbar_section_wrapper}>
            <button aria-label={t("change_wpp")}  data-tooltip={t("change_wpp")} ref={wallpaperButtonRef} onClick={() => setwWallpaperSwitcherOpen(previous => !previous)}>
                <div className="svgMask taskbar_icon" style={{maskImage: `url("${wallpaper_change}")`}}></div>
            </button>
            <button aria-label={t("change_theme")}  data-tooltip={t("change_theme")} ref={themeButtonRef} onClick={() => setThemeSwitcherOpen(previous => !previous)}>
            <div className="svgMask taskbar_icon" style={{maskImage: `url("${theme_change}")`}}></div>

            </button>
            <button role="button"  onClick={changePosition} aria-label={t("change_position")} data-tooltip={t("change_position")}>
                <div className="svgMask taskbar_icon" style={{maskImage: `url("${taskbar_switcher}")`}}></div>
            </button>
            <button role="button" ref={pcStatusButtonRef} aria-label={t("shut")}  data-tooltip={t("shut")} onClick={() => setPcStatusMenuOpen((prev) => !prev)}>
                <div className="svgMask taskbar_icon" style={{maskImage: `url("${powerOff}")`}}></div>
            </button>
        </div>
    </div>
    </> 
}


import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, MutableRefObject, SetStateAction, useRef } from "react";
import { useTranslation } from "react-i18next";
import powerOff from "../assets/startMenu/power_off.svg";
import taskbar_switcher from '../assets/taskbar/taskbar_switcher.svg';
import theme_change from '../assets/taskbar/theme_change.svg';
import wallpaper_change from '../assets/taskbar/wallpaper_change.svg';
import { useDesktopPosition } from "../contexts/DesktopPositonContext";
import { useWindowContext } from "../contexts/WindowContext";
import useComponentVisible from "../hooks/useComponentVisible";
import LocaleSwitcher from "./LocaleSwitcher/LocaleSwitcher";
import style from './TaskbarHypr.module.scss';
import Battery from "./components/Battery/Battery";
import Calendar from "./components/Calendar/Calendar";
import ClockHypr from "./components/ClockHypr/ClockHypr";
import Performance from "./components/Performance/Performance";
import Start from "./components/Start/Start";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import WallpaperSwitcher from "./components/WallpaperSwitcher/WallpaperSwitcher";
import WindowsHypr from "./components/WindowsHypr/WindowsHypr";


export default function TaskbarHypr({setPcStatusMenuOpen, pcStatusButtonRef}: {setPcStatusMenuOpen: Dispatch<SetStateAction<boolean>>, pcStatusButtonRef: MutableRefObject<HTMLButtonElement | null>}){

    const clockButtonRef = useRef(null);
    const themeButtonRef = useRef(null);
    const wallpaperButtonRef = useRef(null);

    const {t} = useTranslation();
    const [position, setPosition] = useDesktopPosition()

    const  [ calendarRef, isCalendarOpen, setIsCalendarOpen ] = useComponentVisible(false, clockButtonRef);
    const  [ themeSwitcherRef, themeSwitcherOpen, setThemeSwitcherOpen ] = useComponentVisible(false,themeButtonRef);
    const  [ wallpaperSwitcherRef, wallpaperSwitcherOpen, setwWllpaperSwitcherOpen ] = useComponentVisible(false,wallpaperButtonRef);
    const [windows, setWindows] = useWindowContext();

    const changePosition = () => {
        setPosition((prev) => {
           const position = prev == 'top' ? 'bottom' : 'top';
           localStorage.setItem('position', position)
            return position;
        });
    }

    const openCalendar = () => { 
        setIsCalendarOpen(previous => !previous)
    }
    return <>
        <div  ref={calendarRef} >
             { isCalendarOpen && <Calendar/>}
        </div>
        <div ref={themeSwitcherRef}>
            <ThemeSwitcher themeSwitcherOpen={themeSwitcherOpen}/>
        </div>
        <div ref={wallpaperSwitcherRef}>
            <WallpaperSwitcher wallpaperSwitcherOpen={wallpaperSwitcherOpen}/>
        </div>
    <div className={style.taskbar} style={{[position]: 0}}>
        <Start/>
        <div className={`${style.taskbar_section_wrapper} ${style.intro}`}>
            <div>
                <span>eric augusto • </span>
                <span className={style.front}>{t('front')}</span> 
            </div>
            <span className={style.welcome}>welcome to my portfolio :D</span>
        </div>
        <AnimatePresence>
            { windows?.length > 0 && <motion.div initial={{scale: 0.9, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{duration: 0.1}} exit={{scale: 0, opacity: 0}} className={`${style.taskbar_section_wrapper} ${style.windows}`}>
                <WindowsHypr windows={windows} setWindows={setWindows}/>
            </motion.div>}
        </AnimatePresence>
        <a className={`${style.taskbar_section_wrapper} ${style.date_time}`} onClick={openCalendar} ref={clockButtonRef} style={{cursor: 'pointer'}}>
            <ClockHypr/>
        </a>
        <div className={`${style.taskbar_section_wrapper}`}>
            <Performance/>
        </div>
        <div className={style.taskbar_section_wrapper}>
            <LocaleSwitcher/>
            <Battery/>
        </div>
        <div className={style.taskbar_section_wrapper}>
            <button className="svgMask taskbar_icon" ref={wallpaperButtonRef} onClick={() => setwWllpaperSwitcherOpen(previous => !previous)}  style={{maskImage: `url("${wallpaper_change}")`}}></button>
            <button className="svgMask taskbar_icon" ref={themeButtonRef} onClick={() => setThemeSwitcherOpen(previous => !previous)} style={{maskImage: `url("${theme_change}")`}}></button>
            <button className="svgMask taskbar_icon" onClick={changePosition} style={{maskImage: `url("${taskbar_switcher}")`}}></button>
            <button className="svgMask taskbar_icon" ref={pcStatusButtonRef} onClick={() => setPcStatusMenuOpen((prev) => !prev)} style={{maskImage: `url("${powerOff}")`}}></button>
        </div>
    </div>
    </> 
}


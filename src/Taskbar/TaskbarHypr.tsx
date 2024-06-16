import Start from "./components/Start/Start";
import style from './TaskbarHypr.module.scss';
import wallpaper_change from '../assets/taskbar/wallpaper_change.svg'
import theme_change from '../assets/taskbar/theme_change.svg'
import taskbar_switcher from '../assets/taskbar/taskbar_switcher.svg';
import powerOff from "../assets/startMenu/power_off.svg";
import WindowsHypr from "./components/WindowsHypr/WindowsHypr";
import Performance from "./components/Performance/Performance";
import ClockHypr from "./components/ClockHypr/ClockHypr";
import Calendar from "./components/Calendar/Calendar";
import useComponentVisible from "../hooks/useComponentVisible";
import { useRef } from "react";
import Battery from "./components/Battery/Battery";
import Network from "./components/Network/Network";
import { useTranslation } from "react-i18next";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";


export default function TaskbarHypr(){

    const clockButtonRef = useRef(null);
    const {t} = useTranslation();
    const  [ calendarRef, isCalendarOpen, setIsCalendarOpen ] = useComponentVisible(false, clockButtonRef);
    const openCalendar = () => { 
        setIsCalendarOpen(previous => !previous)
    }
    return <>
        <div style={{position: 'absolute'}} ref={calendarRef} >
             { isCalendarOpen && <Calendar/>}
        </div>
        <ThemeSwitcher/>
    <div className={style.taskbar}>
        <Start/>
        <div className={`${style.taskbar_section_wrapper} ${style.intro}`}>
            eric augusto • {t('front')}
        </div>
        <div className={`${style.taskbar_section_wrapper} ${style.windows}`}>
            <WindowsHypr/>
        </div>
        <a className={`${style.taskbar_section_wrapper} ${style.date_time}`} onClick={openCalendar} ref={clockButtonRef} style={{cursor: 'pointer'}}>
            <ClockHypr/>
        </a>
        <div className={`${style.taskbar_section_wrapper}`}>
            <Performance/>
        </div>
        <div className={style.taskbar_section_wrapper}>
            {/* <Network/> */}
            <Battery/>
        </div>
        <div className={style.taskbar_section_wrapper}>
            <button className="svgMask taskbar_icon" style={{maskImage: `url("${wallpaper_change}")`}}></button>
            <button className="svgMask taskbar_icon" style={{maskImage: `url("${theme_change}")`}}></button>
            <button className="svgMask taskbar_icon" style={{maskImage: `url("${taskbar_switcher}")`}}></button>
            <button className="svgMask taskbar_icon" style={{maskImage: `url("${powerOff}")`}}></button>
        </div>
    </div>
    </> 
}


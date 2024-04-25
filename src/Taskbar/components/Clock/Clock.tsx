import { useEffect, useRef, useState } from 'react';
import clockIcon from '../../../assets/taskbar/clock/clock.svg';
import Button from '../Button/Button';
import styles from './Clock.module.scss';
import Calendar from '../Calendar/Calendar';
import useComponentVisible from '../../../hooks/useComponentVisible';
import { useTheme } from '../../../contexts/ThemeContext';

function Clock(){
    const now = new Date();
    const [time, setTime] = useState(new Date());
    const clockButtonRef = useRef(null) 
    const [theme] = useTheme();
    const  [ calendarRef, isCalendarOpen, setIsCalendarOpen ] = useComponentVisible(false, clockButtonRef);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        
        return () => {
            clearInterval(intervalId);
        }
    }, []);
    const openCalendar = () => {
        setIsCalendarOpen(previous => !previous)
    }
    // const hourWithZero = String(time.getHours()).padStart(2, '0');
    // const minutesWithZero = String(time.getMinutes()).padStart(2, '0');
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;

    const formattedTime = now.toLocaleTimeString();
    const meridiem = formattedTime.split(' ')[1];
    const [hourWithZero, minutesWithZero] = formattedTime.split(':').map(part => part.padStart(2, '0')) ?? [];
    const date = new Intl.DateTimeFormat(locale).format(new Date(time));
    const buttonStyles = {color: 'unset', background: theme == 'light' ? "rgb(40 40 40 / 13%)" : "rgb(129 129 129 / 13%)" ,backdropFilter: "blur(3px)"} 
    const buttonHoverStyles = {background: theme == 'light' ? "rgb(40 40 40 / 20%)" : "rgb(129 129 129 / 20%)" }
    return (
        <>
        <div style={{position: 'absolute'}} ref={calendarRef} >
             { isCalendarOpen && <Calendar/>}
        </div>
        <Button ref={clockButtonRef} handleClick={openCalendar} styles={buttonStyles} hoverStyles={buttonHoverStyles}>
            <div className={styles.clock_container + " " + styles[theme]}>
            <div className={styles.clock} style={{ maskImage: `url(${clockIcon})`}}></div>
            <div className={styles.date_container}>
                <div className={styles.hour_complete}>
                    <div className={styles.hour_container}>
                        <span className={styles.hour}>{hourWithZero}</span>
                        <span className={styles.minutes}>{minutesWithZero}</span>
                    </div>
                    <span className={styles.meridem}>{meridiem}</span>
                </div>
                <span className={styles.date}>{date}</span>
            </div>
            </div>
        </Button>
        </>
    )
}

export default Clock;
import Button from '../Button/Button';
import styles from './Clock.module.scss'
import clockIcon from '../../../assets/taskbar/clock/clock.svg'
import React, { useState, useEffect } from 'react';

function Clock(){
    const now = new Date();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);
    // const hourWithZero = String(time.getHours()).padStart(2, '0');
    // const minutesWithZero = String(time.getMinutes()).padStart(2, '0');
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;

    const formattedTime = now.toLocaleTimeString();
    const meridiem = formattedTime.split(' ')[1];
    const [hourWithZero, minutesWithZero] = formattedTime.split(':').map(part => part.padStart(2, '0')) ?? [];
    const date = new Intl.DateTimeFormat(locale).format(new Date(time));
    return (
        <Button>
            <div className={styles.clock_container}>
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
    )
}

export default Clock;
import moment from 'moment';
import styles from './Lockscreen.module.scss';
import { useEffect, useState } from 'react';

function Lockscreen() {
    const [dateTime, setDateTime] = useState({
        date: moment().format('LL'),
        hour: moment().format('LT')
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = moment();
            setDateTime({
                date: now.format('LL'),
                hour: now.format('LT')
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return ( 
        <div className={styles.date_hour}>
            <span className={styles.hour}>{dateTime.hour}</span>
            <span className={styles.date}>{dateTime.date}</span>
        </div>
    );
}

export default Lockscreen;

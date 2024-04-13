import moment from 'moment';
import styles from './Lockscreen.module.scss';
import { useEffect, useState } from 'react';
import useDateTime from '../../../hooks/useDateTime';

function Lockscreen() {
    const [dateTime] = useDateTime();
    return ( 
        <div className={styles.date_hour}>
            <span className={styles.hour}>{dateTime.hour}</span>
            <span className={styles.date}>{dateTime.date}</span>
        </div>
    );
}

export default Lockscreen;

import useDateTime from '../../../hooks/useDateTime';
import styles from './Lockscreen.module.scss';

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

import { useTheme } from "../../../../contexts/ThemeContext";
import useDateTime from "../../../../hooks/useDateTime";
import styles from './DateTime.module.scss';

function DateTime() {
    const [dateTime] = useDateTime('LLLL','LTS');
    const hour = dateTime.hour.split(' ');
    dateTime.date.split(' ').pop();
    const dateA = dateTime.date.split(' ');
    const date = dateA.slice(0,-2).join(' ')
    const [theme] = useTheme();
    return ( 
        <div className={styles.date_hour + " " + styles[theme]}>
            <div className={styles.hour_container}>
                <span className={styles.hour}>{hour[0]}</span>
                <span>{hour[1]}</span>
            </div>
            <span className={styles.date}>{date}</span>
        </div>
    );
}

export default DateTime;
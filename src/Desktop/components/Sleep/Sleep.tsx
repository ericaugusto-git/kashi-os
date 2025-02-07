import useWeather from '@/hooks/useWeather';
import WeatherBody from '@/Taskbar/components/Calendar/Weather/components/WeatherBody/WeatherBody';
import useDateTime from '../../../hooks/useDateTime';
import styles from './Sleep.module.scss';

function Sleep({wallpaperUrl}: {wallpaperUrl: string | undefined}) {
    const [dateTime] = useDateTime();
    const { weather } = useWeather();
    return ( 
        <div>
            <div className={styles.date_hour}>
                <span className={styles.date}>{dateTime.date}</span>
                <span className={styles.hour}>{dateTime.hour}</span>
            <div className={`backgroundImage ${styles.img}`} style={{backgroundImage: `url("${wallpaperUrl}")`}}>

            </div>
            {weather && <WeatherBody weather={weather.weather}/>}
            </div>
        </div>
    );
}

export default Sleep;

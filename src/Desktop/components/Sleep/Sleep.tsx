import { useWallpaper } from '@/contexts/WallpaperContext';
import useDateTime from '../../../hooks/useDateTime';
import styles from './Sleep.module.scss';
import { wallpapers } from '@/constants/wallpapers';
import { useTheme } from '@/contexts/ThemeContext';
import { useWeatherContext } from '@/contexts/WheaterContext';
import WeatherBody from '@/Taskbar/components/Calendar/Weather/components/WeatherBody/WeatherBody';

function Sleep() {
    const [dateTime] = useDateTime();
    const [wallpaperIndex] = useWallpaper();
    const [theme] = useTheme();
    const currentWppr = wallpapers[theme][wallpaperIndex];
    const { weatherContext } = useWeatherContext();
    const weather = weatherContext?.weather
    return ( 
        <div>
            <div className={styles.date_hour}>
                <span className={styles.date}>{dateTime.date}</span>
                <span className={styles.hour}>{dateTime.hour}</span>
            <div className={`backgroundImage ${styles.img}`} style={{backgroundImage: `url("${currentWppr}")`}}>

            </div>
            {weather && <WeatherBody weather={weather}/>}
            </div>
        </div>
    );
}

export default Sleep;

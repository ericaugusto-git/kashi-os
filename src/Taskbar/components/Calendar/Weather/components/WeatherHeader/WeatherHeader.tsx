import styles from './WeatherHeader.module.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function WeatherHeader({weather}: {weather: any}) {
    return (  
        <div className={styles.header}>
            <div className={styles.icon + " backgroundImage" } style={{backgroundImage: `url(https://openweathermap.org/img/wn/${weather.icon + '@4x.png'})`}}></div>
            <div className={styles.desc_container}>
            <span className={styles.location}>{weather.name + " " + weather.sys.country}</span>
            <span className={styles.desc}>{weather.description} <span className={styles.temp}>{Math.round(weather.main.temp)}</span>&deg;C</span>
            </div>
        </div>
    );
}

export default WeatherHeader;
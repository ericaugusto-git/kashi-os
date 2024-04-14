/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './WeatherBody.module.scss';
import sunrise from '../../../../../../assets/weather/sunrise.svg';
import sunset from '../../../../../../assets/weather/sunset.svg';
import humidity from '../../../../../../assets/weather/humidity.svg';
import wind from '../../../../../../assets/weather/wind.svg';
import { useTheme } from '../../../../../../contexts/ThemeContext';
import { WeatherType } from '../../../../../../hooks/useWeather';
import moment from 'moment';
import { useEffect, useState } from 'react';

function WeatherBody({weather, forecast}: WeatherType) {
    const [theme] = useTheme();
    const [forecastList, setForecastList] = useState([]);
    useEffect(() => {
        setForecastList(forecast.list.reduce((acc: any[], current: any) => { acc.push({date: moment(current.dt * 1000).format('LT'), temp: Math.round(current.main.temp)}); return acc}, []));
        console.log(forecastList)
        // Calculate maximum temperature value
    },[])
    return (  
        <div className={styles.body}>
        <div className={styles.details + " " + styles[theme]}>
            <div className={styles.info}>
                <div className={"svgMask " + styles.icon} style={{maskImage: `url(${sunrise})`}}></div>
                <span>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</span>
            </div>
            <div className={styles.info}>
                <div className={"svgMask " + styles.icon + " " + styles.humidity} style={{maskImage: `url(${humidity})`}}></div>
                <span>{weather.main.humidity} %</span>
            </div>
            <div className={styles.info}>
                <div className={"svgMask " + styles.icon} style={{maskImage: `url(${sunset})`}}></div>
                <span>{new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-IN')}</span>
            </div>
            <div className={styles.info}>
                <div className={"svgMask " + styles.icon} style={{maskImage: `url(${wind})`}}></div>
                <span>{weather.wind.speed + " m/s"}</span>
            </div>
        </div>
            <div className={styles.graph}>
                <div className={styles.y_axis}>
                    <span>50</span>
                    <span>25</span>
                    <span>0</span>
                </div>
                {forecastList.map((v: any,i) => (
                <div key={i} className={styles.line} style={{height: v.temp + 'px'}} data-tooltip={v.temp + '°C'}>
                    <span>{v.date}</span>
                </div>))}
            </div>
        </div>
    );
}

export default WeatherBody;
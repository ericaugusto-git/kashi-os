import useWeather from "@/hooks/useWeather";
import styles from "./Weather.module.scss";
import WeatherBody from "./components/WeatherBody/WeatherBody";
import WeatherError from "./components/WeatherError/WeatherError";
import WeatherHeader from "./components/WeatherHeader/WeatherHeader";
import {motion, Variants} from 'framer-motion';
import { useTranslation } from "react-i18next";

function Weather() {
  const { weather, error, waitingGpsConsent } = useWeather();
  console.log(weather);
  const {t} = useTranslation();
  // const weather = weatherContext?.weather
  // const forecast = weatherContext?.forecast
  const mainWeather = weather?.weather?.weather?.[0];
  const goofyAnimation: Variants = {
    animate: {
      scale: [0.75, 1.3, 1.3, 1, 1, 1, 1, 1],
      scaleX: [1, 1, 1, 1, 1, 1.25, 0.75, 1],
      scaleY: [1, 1, 1, 1, 1, 0.75, 1.25, 1],
      rotate: [0, 0, 270, 270, 0, 0, 0, 0],
      transition: { duration: 8, repeat: Infinity, repeatType: "mirror" },
    },
  };
  return (
    <div className={styles.weather_container}>
      {error || waitingGpsConsent ? (
        <WeatherError geoError={error} waitingGpsConsent={waitingGpsConsent!}/>
      ) : !weather?.weather ?  <div className={styles.loading}>    <motion.div {...goofyAnimation} className={`svgMask ${styles.cloud}`} style={{maskImage: `url("cloud.svg")`}}></motion.div>
      {t('loading')}
      </div>     
 : (
        <div>
            <WeatherHeader weather={{...mainWeather, ...weather.weather}}/>
            <WeatherBody weather={weather.weather} forecast={weather.forecast}/>
        </div>
      )}
    </div>
  );
}

export default Weather;

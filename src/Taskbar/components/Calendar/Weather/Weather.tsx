import { useWeatherContext } from "../../../../contexts/WheaterContext";
import styles from "./Weather.module.scss";
import WeatherBody from "./components/WeatherBody/WeatherBody";
import WeatherError from "./components/WeatherError/WeatherError";
import WeatherHeader from "./components/WeatherHeader/WeatherHeader";

function Weather() {
  const { weatherContext, error } = useWeatherContext();
  const weather = weatherContext?.weather
  const forecast = weatherContext?.forecast
  const mainWeather = weather?.weather?.[0];
  return (
    <div className={styles.weather_container}>
      {error || (!weather || !forecast) ? (
        <WeatherError geoError={error}/>
      ) : (
        <div>
            <WeatherHeader weather={{...mainWeather, ...weather}}/>
            <WeatherBody weather={weather} forecast={forecast}/>
        </div>
      )}
    </div>
  );
}

export default Weather;

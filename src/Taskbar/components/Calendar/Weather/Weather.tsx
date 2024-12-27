import useWeather from "@/hooks/useWeather";
import styles from "./Weather.module.scss";
import WeatherBody from "./components/WeatherBody/WeatherBody";
import WeatherError from "./components/WeatherError/WeatherError";
import WeatherHeader from "./components/WeatherHeader/WeatherHeader";

function Weather() {
  const { weather, error } = useWeather();
  // const weather = weatherContext?.weather
  // const forecast = weatherContext?.forecast
  const mainWeather = weather?.weather?.weather?.[0];
  return (
    <div className={styles.weather_container}>
      {error || (!weather?.weather || !weather.forecast) ? (
        <WeatherError geoError={error}/>
      ) : (
        <div>
            <WeatherHeader weather={{...mainWeather, ...weather.weather}}/>
            <WeatherBody weather={weather.weather} forecast={weather.forecast}/>
        </div>
      )}
    </div>
  );
}

export default Weather;

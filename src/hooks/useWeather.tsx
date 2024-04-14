import moment from "moment";
import { useState, useEffect } from "react";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WeatherType = {forecast: any, weather: any}

function useWeather() {
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);
  const localWeather: string | null = localStorage.getItem("weather") ?? null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let parsedLocalWeather: any = {};
  if (localWeather) {
      parsedLocalWeather = JSON.parse(localWeather);
  }
  
  const [weather, setWeather] = useState<WeatherType>();
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      }, error => {
        setError(error);
      });
    };
    if (lat === null && long === null) {
      fetchData();
    }
  }, [lat, long]);
 
  useEffect(() => {
      const fetchWeather = async () => {
              const weatherReq = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${import.meta.env.VITE_REACT_APP_API_KEY}`);
              const weather = await weatherReq.json();
              const forecastReq = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${import.meta.env.VITE_REACT_APP_API_KEY}&cnt=8`);
              const forecast = await forecastReq.json();
              weather.coord.lat = lat;
              weather.coord.lon = long;
              const weatherObj = {forecast, weather};
              localStorage.setItem("weather", JSON.stringify(weatherObj));
              setWeather(weatherObj)
      };
      const latLon = parsedLocalWeather?.weather?.coord;
      const isOld = moment.unix(parsedLocalWeather?.forecast?.dt).isBefore(moment());
      if(!weather && (lat !== null && long !== null)){
        if(!latLon || isOld || (latLon.lat != lat || latLon.lon != long)){
          fetchWeather();
        }else{
          console.log(parsedLocalWeather)
          setWeather(parsedLocalWeather);
        }
      }
  }, [lat, long]);


  return {
    weather,
    error,
  };
}

export default useWeather;
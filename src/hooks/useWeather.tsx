import moment from "moment";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {isMobile} from 'react-device-detect';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WeatherType = {forecast?: any, weather: any}

function useWeather() {
  const wttrApiUrl = 'https://api.openweathermap.org/data/2.5';
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
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const fetchLocation = async () => {
      if(!isMobile){
        navigator.geolocation.getCurrentPosition(position => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        }, error => {
          setError(error);
        });
      }
    };
    if (lat === null || long === null) {
      fetchLocation();
    }
  }, [lat, long]);
 
  const lang = i18n.resolvedLanguage?.toLocaleLowerCase()?.replace('-', '_') ?? 'en'

  const fetchWeather = async (langChange?: boolean) => {
          const weatherReq = await fetch(`${wttrApiUrl}/weather/?lat=${lat}&lon=${long}&units=metric&lang=${lang}&APPID=${import.meta.env.VITE_REACT_APP_API_KEY}`);
          const weather = await weatherReq.json();
          let forecast;
          // TODO this a really ugly if
          if(!(parsedLocalWeather.lang && langChange)){
            const forecastReq = await fetch(`${wttrApiUrl}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${import.meta.env.VITE_REACT_APP_API_KEY}&cnt=8`);
            forecast = await forecastReq.json();
          }
          weather.coord.lat = lat;
          weather.coord.lon = long;
          const weatherObj = {forecast: forecast ?? parsedLocalWeather.forecast, weather, lang};
          localStorage.setItem("weather", JSON.stringify(weatherObj));
          setWeather(weatherObj)
  };
  useEffect(() => {
    const langChanged = parsedLocalWeather.lang != lang;
    if(langChanged && weather){
      fetchWeather(langChanged);
    }
  }, [t])
  useEffect(() => {
      const latLon = parsedLocalWeather?.weather?.coord;
      const locationChange = latLon?.lat != lat || latLon?.lon != long;
      const isOld =  moment.unix(parsedLocalWeather?.forecast?.list?.[0]?.dt).isBefore(moment());
      
      
      // TODO this is a really ugly if else, this is terrible
      if(!weather && lat && long){
        if(!parsedLocalWeather || isOld || locationChange){
          fetchWeather();
        }else{ 
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
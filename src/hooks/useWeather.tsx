import moment from "moment";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const fetchLocation = async () => {
      navigator.geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      }, error => {
        setError(error);
      });
    };
    if (lat === null || long === null) {
      fetchLocation();
    }
  }, [lat, long]);
 
  const lang = i18n.resolvedLanguage?.toLocaleLowerCase()?.replace('-', '_') ?? 'en'

  const fetchWeather = async (langChange: boolean) => {
          const weatherReq = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&lang=${lang}&APPID=${import.meta.env.VITE_REACT_APP_API_KEY}`);
          const weather = await weatherReq.json();
          let forecast;
          // TODO this a really ugly if
          if(!(parsedLocalWeather.lang && langChange)){
            const forecastReq = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${import.meta.env.VITE_REACT_APP_API_KEY}&cnt=8`);
            forecast = await forecastReq.json();
          }
          weather.coord.lat = lat;
          weather.coord.lon = long;
          const weatherObj = {forecast: parsedLocalWeather?.forecast ?? forecast, weather, lang};
          localStorage.setItem("weather", JSON.stringify(weatherObj));
          setWeather(weatherObj)
  };
  useEffect(() => {
    console.log("real shit?")
  }, [t])
  useEffect(() => {
      const latLon = parsedLocalWeather?.weather?.coord;
      const isOld = moment.unix(parsedLocalWeather?.forecast?.list?.[0]?.dt).isBefore(moment());
      const changeLanguage = parsedLocalWeather.lang != lang;
      console.log(changeLanguage)
      console.log(weather)
      // TODO this a really ugly if else
      if((changeLanguage || !parsedLocalWeather || isOld) && (lat !== null && long !== null)){
        if(changeLanguage || !latLon || isOld || (latLon.lat != lat || latLon.lon != long)){
          fetchWeather(changeLanguage);
        }else{
          setWeather(parsedLocalWeather);
        }
      }
  }, [lat, long, t]);



  return {
    weather,
    error,
  };
}

export default useWeather;
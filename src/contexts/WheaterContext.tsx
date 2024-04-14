import React, { createContext, useContext } from 'react';
import useWeather from '../hooks/useWeather';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WeaterProvider = {weather: any, error: GeolocationPositionError | null}

const WeatherContext =  createContext<WeaterProvider>({
    weather: undefined,
    error: null,
});

export const WeatherProvider = ({ children }: {children: React.ReactNode}) => {
    const { weather, error } = useWeather();

    return (
        <WeatherContext.Provider value={{ weather, error }}>
            {children}
        </WeatherContext.Provider>
    );
};

// Step 3: Create a custom hook to consume the context
export function useWeatherContext() {
    const context = useContext(WeatherContext)
    
    if (context === undefined) {
      throw new Error('useWeatherContext must be used within a WeatherProvider')
    }

    return {weatherContext: context.weather, error: context.error};
  }
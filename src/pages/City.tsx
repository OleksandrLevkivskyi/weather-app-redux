import React, {FC, useState, useEffect} from 'react';
import { Weather, WeatherLocation } from '../model/Weather';
import {readForecast} from "../services/WeatherService";
import { CityCard } from "../components/CityCard"


interface CityProps {
    current: WeatherLocation | null;
  }

const City: FC<CityProps> = ({current}) => {
    const [forecast, setForecast] = useState<Weather[] | null>(null);

    useEffect(() => {
        (async function () {
            if (current) {
              const [forecast] = await Promise.all([
                readForecast(current.id),
              ]);
              setForecast(forecast);
              console.log(forecast)
            }
          })()
    }, [current]);

    useEffect(() => {
        window.localStorage.setItem("currentLocation", JSON.stringify(current));
      }, [current]);

      console.log(current);
      console.log(forecast)
      localStorage.removeItem("forecast");

      if (!current || !forecast) return null; 
      
    const style = {
      display: 'flex', 
      justifyContent:'сenter',
      
    }

    const container = {
      display: 'flex', 
      alignItems: 'center',
      flexDirection: 'column' as 'column'
    }

  return (
    <div style={container}>
      <h1>{current?.name}</h1>
      <div style={style}>
        {forecast.map(timePoint =>
            <CityCard key={timePoint.dt} weather={timePoint} />
        )}
      </div>
    </div>

  );
}

export default City;
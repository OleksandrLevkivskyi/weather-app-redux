import {FC, useState, useEffect} from 'react';
import { WeatherLocation } from '../model/Weather';
import {readForecast} from "../services/WeatherService";
import { CityCard } from "../components/CityCard"
import { useAppSelector } from '../hooks/redux';


const City: FC = () => {
    const [forecast, setForecast] = useState<WeatherLocation[] | null>(null);
    const current = useAppSelector(state => state.locations.location)

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
    if(!current) {
      return;
    }
        window.localStorage.setItem("current", JSON.stringify(current));
      }, [current]);

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
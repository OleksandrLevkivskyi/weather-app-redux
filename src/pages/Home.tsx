import React, {FC, useEffect} from 'react';
import { LocationSearch } from "../components/LocationSearch"
import { LocationCard } from '../components/LocationCard'
import {WeatherLocation} from "../model/Weather";
import {Alert} from "../components/Alerts";
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getLocationData } from '../redux/reducers/locationsSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface HomeProps {
    setCurrentLocation: (location: WeatherLocation | null) => void
  }

const Home: FC<HomeProps> = ({
  setCurrentLocation
}) => {
  const dispatch = useAppDispatch()
  const {error, warning} = useAppSelector(state => state.locations)
  const locations: WeatherLocation[] = useSelector((state: RootState) => state.locations.locations);

  useEffect(() => {
    if(!locations.length) {
      return;
    }
    window.localStorage.setItem("locations", JSON.stringify(locations));
  }, [locations]);

  let addCity = (term: string) => {
    dispatch(getLocationData(term))
  }

  return (
    <div className="App">
      <LocationSearch onSearch={addCity}/>
      <Alert message={error}/>
      <Alert message={warning}/>
      <h1>Locations</h1>
      <LocationCard 
                     onSelect={location => setCurrentLocation(location)}
      />
    </div>

  );
}

export default Home;
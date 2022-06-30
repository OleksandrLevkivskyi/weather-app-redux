import {FC, useEffect} from 'react';
import { LocationSearch } from "../components/LocationSearch"
import { LocationCard } from '../components/LocationCard'
import {WeatherLocation} from "../model/Weather";
import {Alert} from "../components/Alerts";
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getLocationData, setLocation } from '../redux/reducers/locationsSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


const Home: FC = () => {
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
    <div>
      <LocationSearch onSearch={addCity}/>
      <Alert message={error}/>
      <Alert message={warning}/>
      <h1>Locations</h1>
      <LocationCard 
        onSelect={location => dispatch(setLocation(location))}
      />
    </div>

  );
}

export default Home;
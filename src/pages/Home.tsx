import React, {FC, useEffect} from 'react';
import { LocationSearch } from "../components/LocationSearch"
import { LocationCard } from '../components/LocationCard'
import {WeatherLocation} from "../model/Weather";
import {searchLocation} from "../services/WeatherService";
import {Alert} from "../components/Alerts";
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setEror, setLocations, setWarning } from '../redux/reducers/locationsSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface HomeProps {
    // locations: WeatherLocation[];
    // setLocations: (locations: WeatherLocation[]) => void;
    setCurrentLocation: (location: WeatherLocation | null) => void
  }

const Home: FC<HomeProps> = ({
  // locations, 
  // setLocations, 
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


  const resetAlerts = () => {
    dispatch(setEror(''));
    dispatch(setWarning(''));
  }

  let addLocation = async (term: string) => {
    resetAlerts();
    const location = await searchLocation(term);

    if (!location) {
      dispatch(setEror(`No location found called '${term}'`));
    } else if (locations?.find(item => item.id === location.id)) {
      dispatch(setWarning(`Location '${term}' is already in the list.`));
    } else {
      dispatch(setLocations({locations: [...locations, location]}));
    }
  };

  let addCity =(term: string) => {
    console.log(locations);
    
    addLocation(term)
  }

  // const cardSelect= (location) => {
  //   setCurrentLocation(location)
  // }

  //console.log(locations)

  return (
    <div className="App">
      <LocationSearch onSearch={addCity}/>
      <Alert message={error}/>
      <Alert message={warning}/>
      <h1>Locations</h1>
      <LocationCard 
                    //locations={locations}
                     onSelect={location => setCurrentLocation(location)}
                    //  setLocations={setLocations}
      />
      {/* <WeatherSummary location={currentLocation}/> */}
    </div>

  );
}

export default Home;
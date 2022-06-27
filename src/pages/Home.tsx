import React, {FC, useState, useEffect} from 'react';
import { LocationSearch } from "../components/LocationSearch"
import { LocationCard } from '../components/LocationCard'
import {WeatherConditions, WeatherLocation} from "../model/Weather";
import {searchLocation} from "../services/WeatherService";
import {Alert} from "../components/Alerts";
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addLocation } from '../redux/reducers/ActionCreators';

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
  const {error, warning, locations} = useAppSelector(state => state.locationsReducer)
  // const [error, setError] = useState('');
  // const [warning, setWarning] = useState(''); 

  // useEffect(() => {
  //   window.localStorage.setItem("locations", JSON.stringify(locations));
  // }, [locations]);


  // const resetAlerts = () => {
  //   setError('');
  //   setWarning('');
  // }

  // let addLocation = async (term: string) => {
  //   resetAlerts();
  //   const location = await searchLocation(term);

  //   if (!location) {
  //     setError(`No location found called '${term}'`);
  //   } else if (locations.find(item => item.id === location.id)) {
  //     setWarning(`Location '${term}' is already in the list.`);
  //   } else {
  //     setLocations([location, ...locations]);
  //   }
  // };

//   useEffect(() => {
// }, [locations]);

  let addCity =(term: string)=>{
    dispatch(addLocation(term))
    
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
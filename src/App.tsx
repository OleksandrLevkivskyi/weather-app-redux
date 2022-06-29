import React, {FC, useState, useEffect} from 'react';
import './App.css';
import {WeatherLocation} from "./model/Weather";
import { Routes, Route, } from 'react-router-dom';
import City from './pages/City';
import Home from './pages/Home';
import { useAppDispatch } from './hooks/redux';
import { setLocations } from './redux/reducers/locationsSlice';

const App: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    getLocationsFromLocalStorage();
  }, []);

  const getLocationsFromLocalStorage = () => {
    const saved = localStorage.getItem("locations");
    const initialValue = saved ? JSON.parse(saved) : [];
    dispatch(setLocations({locations: initialValue}))
  }

  const [currentLocation, setCurrentLocation] = useState<WeatherLocation | null>(
    () => {
      const saved = localStorage.getItem("currentLocation");
      const initialValue = saved ? JSON.parse(saved) : [];
      return initialValue || null;
    });  
  return (
    <div className="App">
      <Routes>
        <Route path="/:name" element={
          <City current={currentLocation}/>} />
        <Route path="/" element={
          <Home 
                setCurrentLocation={setCurrentLocation}
                />} />
      </Routes>
    </div>

  );
}

export default App;

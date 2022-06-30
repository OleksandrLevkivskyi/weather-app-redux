import {FC, useEffect} from 'react';
import './App.css';
import { Routes, Route, } from 'react-router-dom';
import City from './pages/City';
import Home from './pages/Home';
import { useAppDispatch } from './hooks/redux';
import { setLocations, setLocation } from './redux/reducers/locationsSlice';

const App: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    getDataFromLocalStorage("locations", [], setLocations);
    getDataFromLocalStorage("current", null, setLocation);
  }, []);

  const getDataFromLocalStorage = (key: string, atr: any, func: any) => {
    const saved = localStorage.getItem(key);
    const initialValue = saved ? JSON.parse(saved) : atr;
    dispatch(func(initialValue))
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/:name" element={<City />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>

  );
}

export default App;

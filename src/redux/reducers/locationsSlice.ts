import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { WeatherLocation } from "../../model/Weather"
import { searchLocation } from "../../services/WeatherService";
import { RootState } from "../store";


interface LocationsState {
    locations: WeatherLocation[];
    error: string;
    warning: string;
    location: WeatherLocation | null;
}

export const initialState: LocationsState = {
    locations: [],
    error: '',
    warning: '',
    location: null
}

export const locationsSlice = createSlice({
    name: 'locations', 
    initialState,
    reducers: {
        setLocations(state, action: PayloadAction< WeatherLocation[]>){
            state.locations = action.payload;
            state.error = '';
            state.warning = '';
            current(state)
        },
        setEror(state, action: PayloadAction<string>) {
            state.error = action.payload
        },
        setWarning(state, action: PayloadAction<string>) {
            state.warning = action.payload
        },
        updateLocation(state, action: PayloadAction<WeatherLocation>) {
            state.locations = state.locations.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
        },

        deleteLocation(state, action: PayloadAction<number>) {
            state.locations = state.locations.filter(item => item.id !== action.payload);
            window.localStorage.setItem("locations", JSON.stringify(state.locations));
        },
        setLocation(state, action: PayloadAction< WeatherLocation>){
            state.location = action.payload;
        },
    }
    
})

export const getLocationData = createAsyncThunk(
    'locations/getLocationData',
    async (term: string, { dispatch, getState }) => {
        dispatch(setEror(''));
        dispatch(setWarning(''));
        const location = await searchLocation(term);
        const state = getState() as RootState;
        const locations = state.locations.locations;
        
        if (!location) {
          dispatch(setEror(`No location found called '${term}'`));
        } else if (locations?.find(item => item.id === location.id)) {
          dispatch(setWarning(`Location '${term}' is already in the list.`));
        } else {
          dispatch(setLocations([...locations, location]));
        }
    }
  );

  export const updateLocationData = createAsyncThunk(
    'locations/getLocationData',
    async (weather: WeatherLocation, { dispatch, getState }) => {
        const location = await searchLocation(weather.name);
        if (location !== undefined) {
            dispatch(updateLocation(location));
        }
    }
  );

export const { setLocations, setEror, setWarning, updateLocation, deleteLocation, setLocation } = locationsSlice.actions
export default locationsSlice.reducer;
import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { Weather, WeatherLocation } from "../../model/Weather"
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
        setLocations(state, action: PayloadAction<{locations: WeatherLocation[]}>){
            state.locations = action.payload.locations;
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
        updateLocationData(state, action: PayloadAction<WeatherLocation>) {
            state.locations = state.locations.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
        },
        
    }
    
})

export const getLocationData = createAsyncThunk(
    'locationData/getLocationData',
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
          dispatch(setLocations({locations: [...locations, location]}));
        }
    }
  );

  export const updateLocationData = createAsyncThunk(
    'locationData/getLocationData',
    async (weather: WeatherLocation, { dispatch, getState }) => {
        const location = await searchLocation(weather.name);
        if (location !== undefined) {
            dispatch(updateLocationData(location));
        }
    }
  );

export const { setLocations, setEror, setWarning } = locationsSlice.actions
export default locationsSlice.reducer;
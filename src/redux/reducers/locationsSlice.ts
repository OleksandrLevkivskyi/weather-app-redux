import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { WeatherLocation } from "../../model/Weather"


interface LocationsState{
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
            console.log(current(state));
            
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
        
    }
    
})

export const { setLocations, setEror, setWarning } = locationsSlice.actions
export default locationsSlice.reducer;
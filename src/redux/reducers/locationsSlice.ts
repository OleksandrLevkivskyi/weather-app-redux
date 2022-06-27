import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { WritableDraft } from "immer/dist/internal";
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
        setLocations(state, action: PayloadAction<WeatherLocation>){
            state.locations = [...state.locations, action.payload]
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

// export const liveState = (state: LocationsState)=>state.locations;
// console.log(liveState)
export default locationsSlice.reducer;
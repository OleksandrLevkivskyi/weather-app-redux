import { current } from "@reduxjs/toolkit";
import { useAppSelector } from "../../hooks/redux";
import { searchLocation } from "../../services/WeatherService";
import { AppDispatch } from "../store";
import { initialState, locationsSlice } from "./locationsSlice"

// const {locations} = useAppSelector(state => state.locationsReducer)

export const addLocation = ( term: string) => async (dispatch: AppDispatch) => {
        const location = await searchLocation(term);
        if (!location) {
            dispatch(locationsSlice.actions.setEror(`No location found called '${term}'`))
           } 
        //    else if (AppStore state.locations.find(item => item.id === location.id) ) {
        //     dispatch(locationsSlice.actions.setWarning(`Location '${term}' is already in the list.`))
        //   } 
          else {
            dispatch(locationsSlice.actions.setLocations(location))
            
          }   
          
}

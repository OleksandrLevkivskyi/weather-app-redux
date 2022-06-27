import React, {FC, useEffect} from "react";
import Grid from '@mui/material/Grid';
import { WeatherLocation} from "../model/Weather";
import { WeatherCard } from "./WeatherCard";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addLocation } from "../redux/reducers/ActionCreators";



interface LocationCardProps {
  //locations: WeatherLocation[];
  
  onSelect: (location: WeatherLocation) => void;
  // setLocations: (locations: WeatherLocation[]) => void
}

export const LocationCard: FC<LocationCardProps> = ({
  //locations, 
  onSelect, 
  //setLocations
}) =>{

  const {locations, location} = useAppSelector(state => state.locationsReducer)
  // const {location} = useAppSelector(state => state.locationsReducer)

  // const dispatch = useAppDispatch()


  //   function identicalСities () {
  //     if ( locations.find(item => item.id === location?.id)) {
  //       // dispatch(addLocation(show: true))
  //     }
  //   }

  //   identicalСities ()
  
  // console.log(locations)
  // console.log(location)
 return(
    <div>  
    
    <React.Fragment>
        <Grid container spacing={{ xs: 4, md: 3 }} >
            {locations?.map((location) =>
            <Grid item xs={2} sm={2} md={2} key={location.id} 
                  onClick={() => onSelect(location)}
                  //                                                           console.log(location.id)}
            >          
                    <WeatherCard  key={location.id}
                                  // cityId = {location.id} 
                                  //name = {location.name} 
                                  locations ={locations} 
                                  location ={location}
                                  //setLocations={setLocations}
                                  /> 
            </Grid>
        )}
        </Grid>
    </React.Fragment>
  </div>
 );
};

  
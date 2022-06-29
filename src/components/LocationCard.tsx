import React, {FC} from "react";
import Grid from '@mui/material/Grid';
import { WeatherLocation} from "../model/Weather";
import { WeatherCard } from "./WeatherCard";
import { useAppSelector } from "../hooks/redux";

interface LocationCardProps {
 
  
  onSelect: (location: WeatherLocation) => void;
}

export const LocationCard: FC<LocationCardProps> = ({
  onSelect, 
}) =>{

  const {locations, location} = useAppSelector(state => state.locations)
 
 return(
    <div>  
    
    <React.Fragment>
        <Grid container spacing={{ xs: 4, md: 3 }} >
            {locations?.map((location) =>
            <Grid item xs={2} sm={2} md={2} key={location.id} 
                  onClick={() => onSelect(location)}
            >          
                    <WeatherCard  key={location.id}
                                  locations ={locations} 
                                  location ={location}
                                  /> 
            </Grid>
        )}
        </Grid>
    </React.Fragment>
  </div>
 );
};

  
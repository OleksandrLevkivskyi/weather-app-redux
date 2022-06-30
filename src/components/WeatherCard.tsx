import React, {FC, useEffect, useState} from "react";
import { WeatherLocation} from "../model/Weather";
import {readWeather} from "../services/WeatherService";
import {getIconUrl} from "../services/WeatherService";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NavLink  } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { deleteLocation, updateLocationData } from "../redux/reducers/locationsSlice";

const linkStyle = {
    textDecoration: "none",
    color: 'black'
  };

interface WeatherCardProps {
    location: WeatherLocation;
}

export const WeatherCard: FC<WeatherCardProps> = ({location}) => {
    const [weather, setWeather] = useState<WeatherLocation | null>(null);
    
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async function () {
            if (location) {
              const [weather] = await Promise.all([
                readWeather(location.id),
              ]);
              setWeather(weather);
            }
          })()        
    }, [location]);   

    if (!location || !weather) return null;


    function convertUnixTimeToDate(unixUtc: number): Date {
        return new Date(unixUtc * 1000);
      }

    const updateItem = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, weather: WeatherLocation) => {
        event.stopPropagation()
        dispatch(updateLocationData(weather));
   
    }

    const handleDelete = () => {
        dispatch(deleteLocation(location.id))
    }

    return (
        <div>            
            <Card >
                <NavLink   to={`/${location.name}`}  style={linkStyle}>
                    {weather.weather.map(condition =>
                    <Box  key={condition.id}>
                        <CardMedia
                            component="img"
                            alt={condition.main}                    
                            src={getIconUrl(condition.icon)}
                            height='100px'
                            sx={{ maxWidth: 100,  margin: '0 auto'}}
                        />
                        <Typography gutterBottom variant="h6" component="div" >
                            {condition.description}
                        </Typography>
                    </Box>           
                    )}                 
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            {location.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {convertUnixTimeToDate(weather.dt).toLocaleTimeString()}
                        </Typography>
                        <Typography variant="h3" color="text.secondary">
                            {weather.main.temp}°C
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Feels like: {weather.main.feels_like}°C
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Humidity: {weather.main.humidity}%
                        </Typography>
                    </CardContent>
                </NavLink >
                    <CardActions>
                        <Button size="small"  
                                onClick={(event)=> updateItem(event, weather)} 
                                >Update</Button>
                        <Button size="small" 
                                onClick={()=> 
                                handleDelete()
                                }>Delete</Button>
                    </CardActions>
            </Card>          
           
        </div>
    );
};
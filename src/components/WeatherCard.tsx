import React, {FC, useEffect, useState} from "react";
import {Weather, WeatherLocation} from "../model/Weather";
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
import { useAppSelector } from "../hooks/redux";

const linkStyle = {
    textDecoration: "none",
    color: 'black'
  };

interface WeatherCardProps {
    locations: WeatherLocation[];
    location: WeatherLocation;
    // setLocations: (locations: WeatherLocation[]) => void
}

export const WeatherCard: FC<WeatherCardProps> = ({ 
    locations, 
    location, 
    //setLocations
}) => {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [update, setUpdate] = useState(false);
    //const {location} = useAppSelector(state => state.locationsReducer)

    useEffect(() => {
        (async function () {
            if (location) {
              const [weather] = await Promise.all([
                readWeather(location.id),
              ]);
              setWeather(weather);
              setUpdate(true)
            }
          })()
    }, [location, update]);

    if (!location || !weather) return null;

    function convertUnixTimeToDate(unixUtc: number): Date {
        return new Date(unixUtc * 1000);
      }

    const deleteItem = () =>{
        return locations.splice(locations.indexOf(location), 1) 
    }

    const updateItem = (event: any) =>{
        setWeather(null)
        setUpdate(false)
        console.log(update)
        event.stopPropagation()
    }

    const handleDelete = (event: any) => {
        //localStorage.removeItem("locations");
        deleteItem();
        //setLocations(locations);
        window.localStorage.setItem("locations", JSON.stringify(locations));
        console.log(update);
        //event.stopPropagation()
    }
    // console.log(weather)
    // console.log(locations)
    // console.log(location)

    return (
        <div>            
            <Card >
                <NavLink   to={`/${location.name}`}  style={linkStyle}>
                    {weather.weather.map(condition =>
                    <Box>
                        <CardMedia
                            key={condition.id}
                            component="img"
                            alt={condition.main}                    
                            src={getIconUrl(condition.icon)}
                            height='100px'
                            sx={{ maxWidth: 100,  margin: '0 auto'}}
                        />
                        <Typography gutterBottom variant="h6" component="div">
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
                                onClick={(event)=> updateItem(event)} 
                                >Update</Button>
                        <Button size="small" 
                                onClick={(event)=> 
                                //locations.splice(locations.indexOf(location), 1) 
                                handleDelete(event)
                                }>Delete</Button>
                    </CardActions>
            </Card>          
           
        </div>
    );
};
import { relative } from "node:path/win32";
import React, {FC, useState} from "react";
import {Weather} from "../model/Weather";
import {getIconUrl} from "../services/WeatherService";
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface CityCardProps {
  weather: Weather;
}

export const CityCard: FC<CityCardProps> = ({weather}) =>{
    const [temperatureValue]= useState(weather.main.temp)
    const changeTemperature =() =>{
        if (temperatureValue >= 35){
            return '#F08080'
        }
        if (temperatureValue >= 30 && temperatureValue < 35){
            return '#FFB6C1'
        }
        if (temperatureValue >= 25 && temperatureValue < 30){
            return '#FFA07A'
        }
        if (temperatureValue >= 20 && temperatureValue < 25){
            return '#FFE4B5'
        }
        if (temperatureValue >= 15 && temperatureValue < 20){
            return '#FFFFE0'
        }
        if (temperatureValue >= 10 && temperatureValue < 15){
            return '#7FFFD4'
        }
        if (temperatureValue >= 5 && temperatureValue < 10){
            return '#B0E0E6'
        }
        if (temperatureValue >= 0 && temperatureValue < 5){
            return '#87CEEB'
        }
        if (temperatureValue >= -5 && temperatureValue < 0){
            return '#1E90FF'
        }
        if (temperatureValue >= -10 && temperatureValue < -5){
            return '#0000FF'
        }
        if (temperatureValue >= -15 && temperatureValue < -10){
            return '#000080'
        }
    }

    function convertUnixTimeToDate(unixUtc: number): Date {
        return new Date(unixUtc * 1000);
    }

    const style = {
        marginBottom: weather.main.temp / 2 + 'vh',
        position: 'absolute' as 'absolute',
        bottom: '25vh', 
        //left: '38%',
        width: '100%',
        height: '40px',
        backgroundColor: changeTemperature()
        // marginRight: '-50%'
    }

    const parent = {
        position: 'relative' as 'relative',
        height: '50vh'
    }

    return(
        <div style={{width: '10vw'}}>
            <Typography variant="body1" color="text.secondary">
                {convertUnixTimeToDate(weather.dt).toLocaleTimeString()}
            </Typography>
            <Box>
                <Box style={parent}>
                    <Box style={style}>
                        <b>{weather.main.temp}°C</b>
                    </Box>
                </Box>
                <Typography variant="subtitle1" color="text.secondary">
                    Min: {weather.main.temp_min}°C 
                </Typography>
                {/* <Typography variant="subtitle1" color="text.secondary">
                    
                </Typography> */}
                <Typography variant="subtitle1" color="text.secondary">
                    Max. {weather.main.temp_max}°C
                </Typography>
                {/* <Typography variant="subtitle1" color="text.secondary">
                    
                </Typography> */}
                <Typography variant="subtitle1" color="text.secondary">
                    Feels like: {weather.main.feels_like}°C
                </Typography>
                {/* <Typography variant="subtitle1" color="text.secondary">
                     
                </Typography> */}
                <Typography variant="body1" color="text.secondary">
                    Humidity: {weather.main.humidity}%
                </Typography>
                {/* <Typography variant="body1" color="text.secondary">
                    
                </Typography> */}
            </Box>
                {weather.weather.map(condition =>
                    <Box key={condition.id} >
                        <CardMedia
                            key={condition.id}
                            component="img"
                            alt={condition.main}                    
                            src={getIconUrl(condition.icon)}
                            height='100px'
                            sx={{ maxWidth: 100,  margin: '0 auto'}}
                        />
                        <Typography gutterBottom variant="body2" component="div">
                            {condition.main}
                        </Typography>
                                
                    </Box>)
                }
        </div>
    )
}
  
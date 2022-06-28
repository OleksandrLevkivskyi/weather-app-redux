export interface Coordinates {
    lon: number;
    lat: number;
}

export interface WeatherLocation {
    base: string;
    clouds: {all: number};
    cod: number;
    coord: {lon: number, lat: number};
    dt: number;
    id: number;
    main: {
      temp: number,
      feels_like: number,
      temp_min: number,
      temp_max: number,
      pressure: number,
      humidity: number
    };
    name: string;
    sys: {type: number, id: number, country: string, sunrise: number, sunset: number}
    timezone: number
    visibility: number
    weather: {
      description: string,
      icon: string,
      id: number,
      main: string
    }[];
    wind: {speed: number, deg: number, gust: number}
}

export interface WeatherConditions {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface Weather {
    weather: WeatherConditions[];
    main: MainWeatherData;
    dt: number;
}

export interface WeatherCurrent {
    temperature: string;
    weatherCode: number;
}

export interface WeatherDaily {
    date: string;
    weatherCode: number;
    tempMax: string;
    tempMin: string;
}

export interface WeatherHourly {
    hour: number;
    temperature: string;
    weatherCode: number;
}

export interface WeatherData {
    current: WeatherCurrent;
    daily: WeatherDaily[];
    hourlyToday: WeatherHourly[];
    timezone: string;
}

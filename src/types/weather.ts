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

export interface WeatherData {
    current: WeatherCurrent;
    daily: WeatherDaily[];
}
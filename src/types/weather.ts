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
    /** Open-Meteo timezone=auto — 요청 좌표 기준 IANA 타임존 */
    timezone: string;
}
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'   

export async function getFetchWeatherData(lat: string, long: string, forecastDays: number = 7) {
 const url = new URL(FORECAST_URL)
 url.searchParams.set('latitude', lat)
 url.searchParams.set('longitude', long)
 url.searchParams.set('current', 'temperature_2m,weather_code,is_day')
 url.searchParams.set('daily', 'weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset')
 url.searchParams.set('timezone', 'auto')
 url.searchParams.set('forecast_days', forecastDays.toString())
 const res = await fetch(url.toString())

 if(!res.ok) {
    throw new Error(`날씨 조회 실패: ${res.status} ${res.statusText}`)
 }

 const json = await res.json()

 const current = {
    temperature: `${json.current.temperature_2m}°`,
    weatherCode: json.current.weather_code,
 }
 const daily = json.daily.time.map((date: string, i: number) => ({
    date,
    weatherCode: json.daily.weathercode[i],
    tempMax: `${json.daily.temperature_2m_max[i]}°`,
    tempMin: `${json.daily.temperature_2m_min[i]}°`,
 }))

 return { current, daily, timezone: json.timezone ?? "Asia/Seoul" }
}
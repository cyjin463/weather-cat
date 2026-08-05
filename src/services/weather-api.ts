import type { WeatherData, WeatherHourly } from "@/types/weather";

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

type OpenMeteoHourly = {
  time?: string[];
  temperature_2m?: number[];
  weather_code?: number[];
};

function getLocalDateAndHour(timeZone: string): { date: string; hour: number } {
  const now = new Date();
  const date = now.toLocaleDateString("en-CA", { timeZone });
  const hourStr = now.toLocaleTimeString("en-GB", {
    timeZone,
    hour: "2-digit",
    hour12: false,
  });
  // "15" or "15:30:00" depending on runtime
  const hour = parseInt(hourStr.split(":")[0], 10);
  return { date, hour };
}

/** API timezone 기준 오늘 현재 시~23시만 남김 */
function buildHourlyToday(
  hourly: OpenMeteoHourly | undefined,
  timeZone: string,
): WeatherHourly[] {
  const times = hourly?.time ?? [];
  const temps = hourly?.temperature_2m ?? [];
  const codes = hourly?.weather_code ?? [];
  const { date: today, hour: currentHour } = getLocalDateAndHour(timeZone);

  const result: WeatherHourly[] = [];

  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    if (!time) continue;

    const [datePart, timePart] = time.split("T");
    if (datePart !== today) continue;

    const hour = parseInt((timePart ?? "0").split(":")[0], 10);
    if (Number.isNaN(hour) || hour < currentHour || hour > 23) continue;

    result.push({
      hour,
      temperature: `${temps[i]}°`,
      weatherCode: codes[i] ?? 0,
    });
  }

  return result;
}

export async function getFetchWeatherData(
  lat: string,
  long: string,
  forecastDays: number = 7,
): Promise<WeatherData> {
  const url = new URL(FORECAST_URL);
  url.searchParams.set("latitude", lat);
  url.searchParams.set("longitude", long);
  url.searchParams.set("current", "temperature_2m,weather_code,is_day");
  url.searchParams.set(
    "daily",
    "weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset",
  );
  url.searchParams.set("hourly", "temperature_2m,weather_code");
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", forecastDays.toString());

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`날씨 조회 실패: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const timezone: string = json.timezone ?? "Asia/Seoul";

  const current = {
    temperature: `${json.current.temperature_2m}°`,
    weatherCode: json.current.weather_code,
  };
  const daily = json.daily.time.map((date: string, i: number) => ({
    date,
    weatherCode: json.daily.weathercode[i],
    tempMax: `${json.daily.temperature_2m_max[i]}°`,
    tempMin: `${json.daily.temperature_2m_min[i]}°`,
  }));
  const hourlyToday = buildHourlyToday(json.hourly, timezone);

  return { current, daily, hourlyToday, timezone };
}

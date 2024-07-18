"use client";
import React, { useRef, useState } from "react";
import { ModeToggle } from "./ui/ThemeToggle";
import { PlaceholdersAndVanishInput } from "./ui/PlaceholdersAndVanishInput";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { TbTemperatureCelsius } from "react-icons/tb";
import { data, placeholders } from "@/data";
import axios from "axios";
import dayjs from "dayjs";
import Temp from "./Content/Temp";
import Weather from "./Content/Weather";
import WeatherStats from "./Content/WeatherStats";
import { getWeatherIcon } from "@/data/getWeatherIcons";
import {
  WiStrongWind,
  WiBarometer,
  WiHumidity,
  WiSunrise,
  WiSunset,
  WiCloudy,
} from "react-icons/wi";
import SunriseSunset from "./Content/SunriseSunset";
import LocationButton from "./ui/LocationButton";

const Main = () => {
  const [data, setData] = useState<data | null>({});
  const [forecastData, setForecastData] = useState<any>(null);
  const [hourlyForecastData, setHourlyForecastData] = useState<any>(null);
  const [location, setLocation] = useState("");
  const [showData, setShowData] = useState(false);
  const apiKey = "1ed9d3d917a3b45b1e199558921413e1";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

  const searchLocation = async (event) => {
    event.preventDefault();
  
    try {
      const [forecastResponse, currentResponse] = await Promise.all([
        axios.get(forecastUrl),
        axios.get(url)
      ]);
  
      const dailyForecasts = getDailyForecasts(forecastResponse.data.list);
      const hourlyForecast = getHourlyForecasts(forecastResponse.data.list);
      
      setForecastData(dailyForecasts);
      setHourlyForecastData(hourlyForecast);
      setData(currentResponse.data);
  
      console.log(`FORECAST : `, dailyForecasts);
      console.log(`HOURLY FORECAST : `, hourlyForecast);
      console.log(`CURRENT : `, currentResponse.data, data.dt * 1000);
      console.log(forecastUrl);
  
      setShowData(true);
    } catch (error) {
      window.alert("Nie ma takiego miasta");
      console.log(error);
      setShowData(false);
    }
  };

  const getDailyForecasts = (list) => {
    const daily = [];
    const map = new Map();
    const today = new Date().toLocaleDateString('en-US', {weekday: 'long'})

    list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {weekday: 'long'});
      if (date !== today) {
        if (!map.has(date)) {
            map.set(date, item);
        } else {
            const existing = map.get(date);
            const existingHour = new Date(existing.dt * 1000).getHours()-2;
            const currentHour = new Date(item.dt * 1000).getHours()-2;

            if (Math.abs(currentHour - 12) < Math.abs(existingHour - 12)) {
                map.set(date, item);
            }
        }
    }
});
    map.forEach((value, key) => {
      if(daily.length >= 5) return;
      daily.push(value)
    })
    return daily;
  };

  const getHourlyForecasts = (list) => {
    const hourly = [];
    const map = new Map();
    list.forEach((item) => {
        const itemDate = new Date(item.dt * 1000);
        const hour = itemDate.getHours()-2;
        
        if (hour >= 6 && hour <= 21) { // Check if the hour is between 6 and 21
          const timeKey = itemDate.toLocaleTimeString('en-US');
          console.log(hour)

            if (!map.has(timeKey)) {
                map.set(timeKey, item);
            } else {
                const existing = map.get(timeKey);
                const existingHour = new Date(existing.dt * 1000).getHours()-2;
                const currentHour = new Date(item.dt * 1000).getHours()-2;

                if (Math.abs(currentHour - 3) < Math.abs(existingHour - 3)) {
                    map.set(timeKey, item);
                }
            }
        }
    });

    map.forEach((value, key) => {
      if (hourly.length >= 5) return;
      hourly.push(value);
  });

    return hourly;
};




  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const getLocation = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          window.alert("Nie można uzyskać lokalizacji");
        }
      );
    } else {
      window.alert(
        "Geolokalizacja nie jest obsługiwana przez tę przeglądarkę."
      );
    }
  };

  const getWeatherByCoordinates = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios
      .get(forecastUrl)
      .then((forecastResponse) => {
        const dailyForecasts = getDailyForecasts(forecastResponse.data.list);
        const hourlyForecast = getHourlyForecasts(forecastResponse.data.list)
        setForecastData(dailyForecasts);
        setHourlyForecastData(hourlyForecast)

        console.log(`FORECAST : `, dailyForecasts);
        console.log(`HOURLY FORECAST : `, hourlyForecast);
        setShowData(true);
      })
      .catch((error) => {
        window.alert("Nie ma takiego miasta");
        console.log(error)
        setShowData(false);
      });
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        // console.log(response.data, response.data.name);
        setShowData(true);
      })
      .catch((error) => {
        window.alert("Nie można uzyskać danych pogodowych");
        setShowData(false);
      });
  };

  if (!data) {
    return <div>Loading...</div>;
  }
  const formattedDay = dayjs().format("DD-MM-YY");
  const timezone = data.timezone ? data.timezone - 7199 : null;
  const currentTime = timezone ? dayjs().add(timezone, "seconds") : null;
  const formattedTime = currentTime ? currentTime.format("HH:mm") : "";
  console.log(formattedDay, timezone, currentTime, formattedTime)

  const convertUnixTimeToHours = (unixTime, timezoneOffset) => {
    const date = new Date((unixTime + timezoneOffset) * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const sunriseTime = convertUnixTimeToHours(
    data.sys ? data.sys.sunrise : null,
    data.timezone - 7199
  );
  const sunsetTime = convertUnixTimeToHours(
    data.sys ? data.sys.sunset : null,
    data.timezone - 7199
  );


  return (
    <section className={`w-max-8xl w-[80%] h-full m-[3%]`}>
      <section id="Top" className={`flex justify-between w-full`}>
        <div className="w-full flex justify-center items-center">
          <ModeToggle />
        </div>
        <div className="w-full flex justify-center items-center">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={searchLocation}
            value={location}
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <LocationButton
            title={`Current Location`}
            icon={<FaLocationCrosshairs />}
            position={"left"}
            handleClick={getLocation}
          />
        </div>
      </section>
      {showData === true && (
        <section
          className={`${
            showData === true && "transition-all"
          } grid grid-cols-3 grid-rows-2 gap-7 justify-items-center place-self-center w-full h-full p-5 mx-auto my-10 delay-300`}
        >
          <div className="flex flex-col justify-evenly items-center col-span-1 h-full w-full shadow-3xl backdrop-filter backdrop-blur-sm backdrop-saturate-100 rounded-3xl">
            <p className="text-5xl font-medium">{data.name}</p>
            <p className="text-8xl font-medium">{formattedTime}</p>
            <p className="text-3xl">{formattedDay}</p>
          </div>
          <div className="grid grid-cols-6 grid-rows-2 col-span-2 h-full w-full shadow-3xl backdrop-blur-sm rounded-3xl">
            <Temp
              temp={ data.main?.temp?.toFixed(0) ?? ""}
              feelsTemp={data.main?.feels_like?.toFixed(0) ?? ""}
              icon={<TbTemperatureCelsius />}
              position={"right"}
            />

            <Weather
              weather={data.weather?.[0]?.main ?? ""}
              icon={data.weather?.[0] ? getWeatherIcon(data.weather[0].main) : ""}
              location={"left"}
            />

            <WeatherStats
              statName={"Clouds"}
              stat={`${data.wind ? data.clouds.all : null}%`}
              icon={<WiCloudy className="6xl" />}
              position={"left"}
            />
            <WeatherStats
              statName={"Wind Speed"}
              stat={`${data.wind ? data.wind.speed : null} m/s`}
              icon={<WiStrongWind />}
              position={"left"}
            />
            <div className="col-span-2 p- flex flex-col">
              <SunriseSunset
                content={"Sunrise "}
                time={sunriseTime} //data.sys.sunrise
                icon={<WiSunrise />}
                position={"left"}
              />
              <SunriseSunset
                content={"Sunset "}
                time={sunsetTime} //data.sys.sunset
                icon={<WiSunset />}
                position={"left"}
              />
            </div>
            <WeatherStats
              statName={"Pressure"}
              stat={`${data.main ? data.main.pressure : null}hPa`}
              icon={<WiBarometer />}
              position={"left"}
            />
            <WeatherStats
              statName={"Humidity"}
              stat={`${data.main ? data.main.humidity : null}%`}
              icon={<WiHumidity />}
              position={"left"}
            />
          </div>
          <div className="flex col-span-2 h-[90%] w-full shadow-3xl backdrop-blur-sm rounded-3xl gap-2">
          {hourlyForecastData && 
            hourlyForecastData.map((forecast, index) => {
              const forecastDate = new Date(forecast.dt * 1000);
              forecastDate.setHours(forecastDate.getHours() - 2);
          
              return (
                <div key={index} className="hover:scale-105 cursor-pointer transition flex flex-col justify-evenly items-center h-auto w-[20%] bg-white/40 dark:bg-white/10 backdrop-blur-sm rounded-3xl m-2">
                  <span className="text-9xl">{getWeatherIcon(forecast.weather[0].main)}</span>
                  <h3 className="text-2xl">
                    {forecastDate.toLocaleDateString("en-US", { weekday: 'long' })}
                  </h3>
                  <span>{forecastDate.toLocaleTimeString("pl-PL", { hourCycle: 'h24', hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="">{(forecast.main.temp).toFixed(0)}°C</span>
                </div>
              );
            })
          }
          </div>
          <div className="flex flex-col justify-evenly p-5 col-span-1 h-[90%] w-full shadow-3xl backdrop-blur-sm rounded-3xl">
            {forecastData &&
              forecastData.map((forecast, index) => (
                <div key={index} className="hover:scale-105 cursor-pointer transition flex justify-between items-center h-auto w-full bg-white/40 dark:bg-white/10  backdrop-blur-sm rounded-3xl p-3">
                  <span className="text-3xl">{getWeatherIcon(forecast.weather[0].main)}</span>
                  <h3>
                    {new Date(forecast.dt * 1000).toLocaleDateString("en-US", { weekday: 'long' })}
                  </h3>
                  <span>{(forecast.main.temp).toFixed(0)}°C</span>
                </div>
              ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default Main;

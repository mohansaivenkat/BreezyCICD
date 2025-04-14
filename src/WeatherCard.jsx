import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  WiDaySunny, WiCloud, WiRain, WiThunderstorm,
  WiSnow, WiFog, WiStrongWind, WiSunrise, WiSunset
} from "react-icons/wi";

const WeatherCard = ({ city, country }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
        );
        setWeather(response.data);
      } catch (err) {
        setError("Hmm, the city which you are trying to find is not found. Check if you have entered the correct city name and country code.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, country]);


  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case "Clear":
        return <WiDaySunny className="text-6xl md:text-7xl xl:text-8xl text-yellow-500 transition-transform hover:scale-110 duration-200 ease-in-out" />;
      case "Clouds":
        return <WiCloud className="text-6xl md:text-7xl xl:text-8xl text-gray-400 transition-transform hover:scale-110 duration-200 ease-in-out" />;
      case "Rain":
        return <WiRain className="text-6xl md:text-7xl xl:text-8xl text-blue-500 transition-transform hover:scale-110 duration-200 ease-in-out" />;
      case "Thunderstorm":
        return <WiThunderstorm className="text-6xl md:text-7xl xl:text-8xl text-purple-700 transition-transform hover:scale-110 duration-200 ease-in-out" />;
      case "Snow":
        return <WiSnow className="text-6xl md:text-7xl xl:text-8xl text-white transition-transform hover:scale-110 duration-200 ease-in-out" />;
      case "Fog":
      case "Mist":
        return <WiFog className="text-6xl md:text-7xl xl:text-8xl text-gray-300 transition-transform hover:scale-110 duration-200 ease-in-out" />;
      default:
        return <WiDaySunny className="text-6xl md:text-7xl xl:text-8xl text-yellow-500 transition-transform hover:scale-110 duration-200 ease-in-out" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 
      w-full max-w-[95vw] md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto my-10 
      transition-all duration-200 hover:shadow-xl animate-fade-in">

      {loading ? (

        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-center text-lg text-red-500">{error}</p>
      ) : (
        <>
          {/* location */}
          <div className="mb-8 text-center">
            <h1 className="title text-5xl md:text-6xl font-semibold text-red-600 dark:text-orange-400">
              {weather.name}, {weather.sys.country}
            </h1>
            <p className="italic text-lg md:text-xl  text-gray-600 dark:text-gray-300">
              {weather.weather[0].main} - {weather.weather[0].description}
            </p>
          </div>

          {/* current weather */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-10">
            {getWeatherIcon(weather.weather[0].main)}
            <div className="text-center sm:text-right">
              <p className="text-4xl md:text-5xl xl:text-6xl font-bold text-purple-500 dark:text-purple-400">
                {weather.main.temp}°C
              </p>
              <p className="text-base md:text-lg xl:text-xl text-gray-600 dark:text-gray-400">
                Feels like {weather.main.feels_like}°C
              </p>
            </div>
          </div>

          {/* details section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 xl:gap-8 text-gray-700 dark:text-gray-300">

            {/* wind */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg w-full
              transition-all duration-300 ease-in-out hover:bg-blue-100 dark:hover:bg-blue-900 hover:scale-105">
              <WiStrongWind className="text-3xl md:text-4xl xl:text-5xl text-blue-500" />
              <div>
                <p className="text-sm md:text-base xl:text-lg">Wind</p>
                <p className="font-medium text-lg md:text-xl xl:text-2xl">
                  {weather.wind.speed} km/h
                </p>
              </div>
            </div>

            {/* humidity */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg w-full
              transition-all duration-300 ease-in-out hover:bg-blue-100 dark:hover:bg-blue-900 hover:scale-105">
              <WiRain className="text-3xl md:text-4xl xl:text-5xl text-blue-400" />
              <div>
                <p className="text-sm md:text-base xl:text-lg">Humidity</p>
                <p className="font-medium text-lg md:text-xl xl:text-2xl">
                  {weather.main.humidity}%
                </p>
              </div>
            </div>

            {/* sunrise */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg w-full
              transition-all duration-300 ease-in-out hover:bg-orange-100 dark:hover:bg-orange-900 hover:scale-105">
              <WiSunrise className="text-3xl md:text-4xl xl:text-5xl text-orange-400" />
              <div>
                <p className="text-sm md:text-base xl:text-lg">Sunrise</p>
                <p className="font-medium text-lg md:text-xl xl:text-2xl">
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
                </p>
              </div>
            </div>

            {/* sunset */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg w-full
              transition-all duration-300 ease-in-out hover:bg-purple-100 dark:hover:bg-purple-900 hover:scale-105">
              <WiSunset className="text-3xl md:text-4xl xl:text-5xl text-purple-400" />
              <div>
                <p className="text-sm md:text-base xl:text-lg">Sunset</p>
                <p className="font-medium text-lg md:text-xl xl:text-2xl">
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherCard;
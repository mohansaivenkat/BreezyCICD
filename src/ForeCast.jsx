import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
    WiDaySunny,
    WiCloud,
    WiRain,
    WiThunderstorm,
    WiSnow,
    WiFog,
} from "react-icons/wi";

const ForecastCard = ({ city, country }) => {
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`
                );
                setForecast(response.data.list);
            } catch (err) {
                setError("Unable to fetch the forecast. Check the city and country code.");
            } finally {
                setLoading(false);
            }
        };

        fetchForecast();
    }, [city, country]);

    
    const getWeatherIcon = (weatherMain) => {
        switch (weatherMain) {
            case "Clear":
                return <WiDaySunny className="text-5xl text-yellow-500" />;
            case "Clouds":
                return <WiCloud className="text-5xl text-gray-400" />;
            case "Rain":
                return <WiRain className="text-5xl text-blue-500" />;
            case "Thunderstorm":
                return <WiThunderstorm className="text-5xl text-purple-500" />;
            case "Snow":
                return <WiSnow className="text-5xl text-blue-300" />;
            case "Fog":
            case "Mist":
                return <WiFog className="text-5xl text-gray-500" />;
            default:
                return <WiDaySunny className="text-5xl text-yellow-500" />;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 
      w-full max-w-[95vw] md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto my-10 
      transition-all duration-200 hover:shadow-xl">

            {loading ? (
                <div className="flex justify-center items-center">
                <div className="w-16 h-16 border-4 border-purple-400 border-dashed rounded-full animate-spin"></div>
            </div>
            ) : error ? (
                <p className="text-center text-lg text-red-500">{error}</p>
            ) : (
                <>
                    <h2 className="title text-4xl md:text-6xl xl:text-4xl font-semibold text-red-600 dark:text-orange-400 text-left mb-6">
                        5-Day Forecast
                    </h2>

                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={15}
                        slidesPerView={3} //mobile
                        breakpoints={{
                            640: { slidesPerView: 3 }, // tablet
                            1024: { slidesPerView: 4 }, // laptop
                            1280: { slidesPerView: 5 }, // desktop
                        }}
                        navigation
                        
                        className="pb-10"
                    >
                        {forecast.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="p-4 bg-purple-100 dark:bg-purple-800 rounded-lg text-center 
                  transition-transform transform duration-300 hover:scale-105 hover:bg-purple-200 dark:hover:bg-purple-900  shadow-md">
                                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                        {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                                            weekday: "short",
                                        })}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {new Date(item.dt * 1000).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>

                                    {/* weather icon */}
                                    <div className="flex justify-center my-2">
                                        {getWeatherIcon(item.weather[0].main)}
                                    </div>

                                    <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
                                        {item.main.temp}°C
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {item.weather[0].description}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            )}
        </div>
    );
};

export default ForecastCard;
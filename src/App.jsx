import { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { getNames, getCode } from "country-list";
import ForecastCard from "./ForeCast.jsx";

const countryList = getNames().map((name) => ({
  name,
  code: getCode(name),
}));

export default function App() {

  //dark mode ke liye
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);


  // city and country input ke liye
  const [cityInput, setCityInput] = useState("");
  const [countryInput, setCountryInput] = useState("");

  const [city, setCity] = useState(""); // only change when search button is clicked
  const [country, setCountry] = useState("");

  const [submitted, setSubmitted] = useState(false);


  const handleSearch = () => {
    if (cityInput.trim() !== "" && countryInput.trim() !== "") {
      setCity(cityInput);
      setCountry(countryInput);
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all">
      {/* header - title and switch */}
      <header className="flex flex-row justify-between items-center p-5 shadow-md bg-white dark:bg-gray-800 transition duration-300">
        <h1 className="title text-5xl sm:text-6xl font-bold text-purple-500 dark:text-purple-400 transition-transform duration-300 hover:scale-105">
          Breezy 2.0
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-purple-500 text-white text-sm sm:text-2xl px-4 py-2 rounded-full hover:bg-purple-600 transition duration-300 transform active:scale-95"
        >
          {darkMode ? <MdDarkMode /> : <MdOutlineLightMode />}
        </button>
      </header>

      {/* about */}
      <section className="max-w-3xl mx-auto mt-6 px-4 text-center">
        <p className="italic text-sm md:text-2xl sm:text-xl leading-relaxed text-gray-700 dark:text-gray-300 transition-opacity duration-700">
          Get real-time weather updates for any city across the world. Just enter the city name and country code below!
        </p>
      </section>

      {/* input fields */}
      <section className="flex flex-col items-center mt-8 px-4">
        <div className="w-full max-w-lg space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter city name"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-400 transition-transform duration-300 focus:scale-105"
            />
            <select
              value={countryInput}
              onChange={(e) => setCountryInput(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-400 transition-transform duration-300 focus:scale-105"
            >
              <option value="">Select Country</option>
              {countryList.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name} ({country.code})
                </option>
              ))}
            </select>
          </div>

          {/* search button */}
          <button
            onClick={handleSearch}
            className="w-full bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition duration-300 transform active:scale-95"
          >
            Search
          </button>
        </div>
      </section>

      {/* weather card and forcast card*/}
      <section className="flex flex-col justify-center pb-40 px-4">
        {submitted ? (
          <>
            <div>
              <WeatherCard city={city} country={country} />
            </div>
            <div>
              <ForecastCard city={city} country={country} />
            </div>
          </>
        ) : (
          <p className="title text-sm md:text-2xl sm:text-xl text-center text-gray-500 dark:text-gray-400">
            Please enter a city and select a country to view the weather.
          </p>
        )}
      </section>
      {/* footer */}
      <section>


        <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow-sm 
  md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">

          {/* Website Title */}
          <span className="pr-10 title text-4xl text-orange-600 sm:text-center dark:text-orange-500 font-semibold">
            Breezy
          </span>

          {/* Developer Info & Tech Stack */}
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-600 dark:text-gray-400 sm:mt-0">

            {/* Developer Info */}
            <li className="me-4 md:me-6">
              <span className="text-purple-500 dark:text-purple-400">Developed by Mohan</span>
            </li>
            <li className="me-4 md:me-6">
              <span className="text-purple-500 dark:text-purple-400">Email: <span className="text-gray-700 dark:text-gray-200">mohansaivenkat2004@gmail.com</span></span>
            </li>

            {/* Tech Stack */}
            <li className="me-4 md:me-6">
              React | Tailwind CSS | OpenWeather API
            </li>

          </ul>
        </footer>

      </section>


    </div>


  );
}
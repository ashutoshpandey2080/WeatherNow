import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";
import Input from "./components/Input";
import TempDetails from "./components/TempDetails";
import TimeAndLocation from "./components/TempAndLocation";
import {
    getCurrentGeolocation,
    getWeatherByCoordinates,
} from "./services/getWewather.js";
import { getCityName } from "./services/getCityName";

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [cityName, setCityName] = useState("");
    const [searchCity, setSearchCity] = useState(""); // city from Input.jsx
    const [coordinates, setCoordinates] = useState(null); // Added state for coordinates

    // Function to fetch weather using geolocation
    const getWeatherUsingGeolocation = async () => {
        try {
            const { latitude, longitude } = await getCurrentGeolocation();
            setCoordinates({ latitude, longitude }); // Update coordinates
            const data = await getWeatherByCoordinates(latitude, longitude);
            setWeatherData(data); // Set weather data

            // Get city name from reverse geocoding
            const detectedCity = await getCityName(latitude, longitude);
            setCityName(detectedCity); // Update city name
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    // Fetch weather data when city is entered manually
    const getWeatherUsingCity = async (city) => {
        try {
            const data = await getWeatherByCoordinates(null, null, city); // Assuming your getWeatherByCoordinates function handles city input
            setWeatherData(data); // Set weather data
            setCityName(city); // Use the city name from input
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    // useEffect to get geolocation weather on initial load
    useEffect(() => {
        if (searchCity) {
            getWeatherUsingCity(searchCity); // Fetch weather by city
        } else {
            getWeatherUsingGeolocation(); // Fetch weather using geolocation
        }
    }, [searchCity]);

    // Fetch weather when coordinates change
    useEffect(() => {
        if (coordinates) {
            const { latitude, longitude } = coordinates;
            getWeatherByCoordinates(latitude, longitude)
                .then((data) => setWeatherData(data)) // Update weather data
                .catch((error) =>
                    console.error("Error fetching weather data:", error)
                );
        }
    }, [coordinates]); // Trigger when coordinates change

    if (!weatherData) return <p>Loading...</p>; // Display loading if no data

    return (
        <div className='mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 from-cyan-600 to-blue-700'>
            <Input
                setSearchCity={setSearchCity}
                setCoordinates={setCoordinates}
            />
            <TimeAndLocation weatherData={weatherData} cityName={cityName} />{" "}
            {/* Pass updated props */}
            <TempDetails weatherData={weatherData} />
            <Forecast weatherData={weatherData} />
        </div>
    );
}

export default App;

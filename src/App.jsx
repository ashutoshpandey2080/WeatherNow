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
    const [searchCity, setSearchCity] = useState(""); 
    const [coordinates, setCoordinates] = useState(null); 

    const getWeatherUsingGeolocation = async () => {
        try {
            const { latitude, longitude } = await getCurrentGeolocation();
            setCoordinates({ latitude, longitude }); 
            const data = await getWeatherByCoordinates(latitude, longitude);
            setWeatherData(data); 

            const detectedCity = await getCityName(latitude, longitude);
            setCityName(detectedCity); 
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const getWeatherUsingCity = async (city) => {
        try {
            const data = await getWeatherByCoordinates(null, null, city); 
            setWeatherData(data); 
            setCityName(city); 
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        if (searchCity) {
            getWeatherUsingCity(searchCity); 
        } else {
            getWeatherUsingGeolocation(); 
        }
    }, [searchCity]);

    useEffect(() => {
        if (coordinates) {
            const { latitude, longitude } = coordinates;
            getWeatherByCoordinates(latitude, longitude)
                .then((data) => setWeatherData(data)) 
                .catch((error) =>
                    console.error("Error fetching weather data:", error)
                );
        }
    }, [coordinates]); 

    if (!weatherData) return <p>Loading...</p>; 

    return (
        <div className='mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 from-cyan-600 to-blue-700'>
            <Input
                setSearchCity={setSearchCity}
                setCoordinates={setCoordinates}
            />
            <TimeAndLocation weatherData={weatherData} cityName={cityName} />{" "}
            <TempDetails weatherData={weatherData} />
            <Forecast weatherData={weatherData} />
        </div>
    );
}

export default App;

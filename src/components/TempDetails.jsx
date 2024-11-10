import { BiSolidDropletHalf } from "react-icons/bi";
import { FaThermometerEmpty } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const TempDetails = ({ weatherData }) => {
    const { current, daily } = weatherData;
    const { temperature_2m_max, temperature_2m_min, sunrise, sunset } = daily;

    const verticalDetails = [
        {
            id: 1,
            Icon: FaThermometerEmpty,
            title: "Feels Like",
            value: `${current.apparent_temperature}⁰C`,
        },
        {
            id: 2,
            Icon: BiSolidDropletHalf,
            title: "Humidity",
            value: `${current.relative_humidity_2m}%`,
        },
        {
            id: 3,
            Icon: FiWind,
            title: "Wind Speed",
            value: `${current.wind_speed_10m} km/h`,
        },
    ];

    const horizontalDetails = [
        {
            id: 1,
            Icon: GiSunrise,
            title: "Sunrise",
            value: formatTime(sunrise[0]),
        },
        {
            id: 2,
            Icon: GiSunset,
            title: "Sunset",
            value: formatTime(sunset[0]),
        },
        {
            id: 3,
            Icon: MdKeyboardArrowUp,
            title: "High",
            value: `${temperature_2m_max[0]}⁰C`,
        },
        {
            id: 4,
            Icon: MdKeyboardArrowDown,
            title: "Low",
            value: `${temperature_2m_min[0]}⁰C`,
        },
    ];

    const weatherIcons = {
        0: "☀️", // Clear sky
        1: "🌤️", // Mainly clear
        2: "⛅️", // Partly cloudy
        3: "☁️", // Overcast
        45: "🌫️", // Fog
        48: "🌫️❄️", // Depositing rime fog
        51: "🌦️", // Light drizzle
        53: "🌧️", // Moderate drizzle
        55: "🌧️", // Dense drizzle
        56: "🧊🌧️", // Light freezing drizzle
        57: "🧊🌧️", // Dense freezing drizzle
        61: "🌦️", // Slight rain
        63: "🌧️", // Moderate rain
        65: "🌧️🌧️", // Heavy rain
        66: "🧊🌧️", // Light freezing rain
        67: "🧊🌧️🌧️", // Heavy freezing rain
        71: "🌨️", // Slight snow fall
        73: "❄️🌨️", // Moderate snow fall
        75: "❄️❄️🌨️", // Heavy snow fall
        77: "❄️🌨️", // Snow grains
        80: "🌦️", // Slight rain showers
        81: "🌧️🌦️", // Moderate rain showers
        82: "🌧️🌧️⚡", // Violent rain showers
        85: "🌨️", // Slight snow showers
        86: "❄️❄️🌨️", // Heavy snow showers
        95: "⛈️", // Thunderstorm
        96: "⛈️🧊", // Thunderstorm with slight hail
        99: "⛈️🧊🧊", // Thunderstorm with heavy hail
    };

    const getWeatherIcon = (code) => {
        return weatherIcons[code] || "❓"; 
    };

    return (
        <div>
            <div className='flex flex-row items-center justify-between py-3'>
                <p className='text-5xl'>
                    {getWeatherIcon(current.weather_code)}{" "}
                    {current.temperature_2m}⁰C
                </p>

                <div className='flex flex-col items-start space-y-3'>
                    {verticalDetails.map(({ id, value, title, Icon }) => (
                        <div
                            key={id}
                            className='flex font-light items-center justify-center text-sm'
                        >
                            <Icon size={18} className='mr-1' />
                            {title}:{" "}
                            <span className='font-medium ml-1'>{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex flex-row items-center justify-center space-x-10 text-sm py-3'>
                {horizontalDetails.map(({ id, value, title, Icon }) => (
                    <div
                        key={id}
                        className='flex flex-row font-light items-center justify-center text-sm'
                    >
                        <Icon size={18} className='mr-1' />
                        {title}:{" "}
                        <span className='font-medium ml-1'>{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TempDetails;

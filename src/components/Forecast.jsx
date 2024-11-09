/* eslint-disable react/prop-types */
const formatTime = (isoString) => {
  const date = new Date(isoString); // Parse the ISO 8601 string directly into a Date object
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  return date.toLocaleString("en-US", options); // Format to 12-hour time with AM/PM
};

const Forecast = ({ weatherData }) => {
  // Check if hourly data exists in the weatherData
  console.log(weatherData);
  if (!weatherData || !weatherData.hourly) {
      return <p>Loading forecast...</p>; // Display loading if no hourly data
  }

  // Get hourly temperature, time, and weather code data (next 12 hours)
  const hourlyTemperatures = weatherData.hourly.temperature_2m || [];
  const hourlyTimes = weatherData.hourly.time || []; // The time is an array of ISO strings
  const hourlyWeatherCodes = weatherData.hourly.weather_code || [];

  const forecastData = hourlyTemperatures.slice(0, 12); // Limit to next 12 hours
  const forecastTimes = hourlyTimes.slice(0, 12); // Corresponding times for the next 12 hours
  const forecastWeatherCodes = hourlyWeatherCodes.slice(0, 12); // Corresponding weather codes

  // Weather icons mapping based on the weather code
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

  // Function to get weather icon based on code
  const getWeatherIcon = (code) => {
      return weatherIcons[code] || "❓"; // Fallback to a question mark if code is unknown
  };

  return (
      <div>
          <div className='flex justify-start items-center mt-6'>
              <p className='font-medium uppercase'>Hourly Weather</p>
          </div>
          <hr className='my-1' />

          {/* Container with horizontal scrolling */}
          <div className='flex items-center justify-start overflow-x-auto space-x-4 py-4 scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent'>
              {/* Loop over the forecast data for the next 12 hours */}
              {forecastData.length > 0 ? (
                  forecastData.map((temp, index) => (
                      <div
                          key={index}
                          className='flex flex-col items-center justify-center min-w-[100px]'
                      >
                          <p className='font-light text-sm'>
                              {formatTime(forecastTimes[index])}
                          </p>
                          {/* Display weather icon based on code */}
                          <p className='text-2xl'>
                              {getWeatherIcon(forecastWeatherCodes[index])}
                          </p>
                          <p className='font-medium'>{`${temp}⁰C`}</p>
                      </div>
                  ))
              ) : (
                  <p>No hourly data available.</p> // Display a message if no hourly data is found
              )}
          </div>
      </div>
  );
};

export default Forecast;

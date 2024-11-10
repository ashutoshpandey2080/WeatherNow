
 export const getWeatherByCoordinates = async (latitude, longitude) => {
  if (!latitude || !longitude) {
      console.error("Invalid coordinates provided:", latitude, longitude);
      return null; 
  }

  const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&past_hours=12&forecast_hours=12`;

  try {
      const response = await fetch(API_URL);

      if (!response.ok) {
          throw new Error(
              `Error: ${response.status} - ${response.statusText}`
          );
      }

      const data = await response.json();
      console.log(data);
      return data;
  } catch (error) {
      console.error("Failed to fetch weather data:", error.message);
      return null;
  }
};


export const getCoordinatesByCityName = async (cityName) => {
  if (!cityName) {
      console.error("City name is required");
      return null;
  }

  const GEOCODING_API_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      cityName
  )}`;

  try {
      const response = await fetch(GEOCODING_API_URL);

      if (!response.ok) {
          throw new Error(
              `Error: ${response.status} - ${response.statusText}`
          );
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
          const { latitude, longitude } = data.results[0];
          return { latitude, longitude };
      } else {
          console.error("No results found for the city");
          throw new Error("No results found for the city");
      }
  } catch (error) {
      console.error("Failed to fetch coordinates:", error.message);
      return null;
  }
};

export const getCurrentGeolocation = () => {
  return new Promise((resolve, reject) => {
      if (navigator && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  resolve({
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                  });
              },
              (error) => {
                  reject(`Geolocation error: ${error.message}`);
              }
          );
      } else {
          reject("Geolocation is not supported by this browser.");
      }
  });
};

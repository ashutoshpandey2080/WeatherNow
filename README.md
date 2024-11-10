# Weather Now - Weather Application

**Weather Now** is a modern, responsive weather application that allows users to search for weather information based on the city. It provides real-time weather data such as temperature, humidity, wind speed, and sunrise/sunset timings, as well as a detailed hourly forecast for the next 12 hours.

### Features:
- **Search for cities** to view current weather information.
- **Real-time weather data** such as temperature, humidity, wind speed, and feels-like temperature.
- **Hourly forecast** showing temperature and weather conditions for the next 12 hours.
- **Weather icons** to display weather conditions like clear sky, rain, snow, etc.
- **Sunrise and Sunset times** based on the selected city's time zone.

### Tech Stack:
- **Frontend**: ReactJS (Vite), Tailwind CSS, FontAwesome, React Icons
- **Weather API**: Open Meteo (for weather data)
- **Styling**: Tailwind CSS, Google Font "Roboto"

### Prerequisites:
Before getting started, make sure you have the following installed on your machine:
- Node.js (version 16 or above)
- npm or yarn package manager

## Project Structure

├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── components/
│   │   ├── Header.jsx      # Header component
│   │   ├── Input.jsx       # Input search component
│   │   ├── TimeAndLocation.jsx  # Time and Location display
│   │   ├── TempDetails.jsx  # Temperature and weather details
│   │   └── Forecast.jsx     # Hourly forecast component
│   ├── services/
│   │   └── getWeather.js    # Service for fetching weather data
│   └── App.jsx              # Main app component
├── tailwind.config.js       # Tailwind configuration file
├── postcss.config.js        # PostCSS configuration file
├── package.json             # npm/yarn dependencies
└── README.md                # This file


## Notes

### Weather Data
- The weather data is fetched from the [Open Meteo API](https://open-meteo.com/), which provides real-time weather information and forecasts.

### City Search
- Users can search for a city using the input field in the header. The app fetches the latitude and longitude of the city, which are then used to display weather data.

### Hourly Forecast
- The hourly forecast component displays the weather conditions and temperatures for the next 12 hours, giving users detailed forecasts.

### Icons
- Weather icons are mapped from weather codes based on the Open Meteo API response, visually representing the current and forecasted weather conditions.

### Responsive Design
- The app uses [Tailwind CSS](https://tailwindcss.com/) for responsive design, ensuring it looks great on both mobile and desktop screens.


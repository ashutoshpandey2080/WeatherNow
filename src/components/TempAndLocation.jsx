const TimeAndLocation = ({ weatherData, cityName }) => {
  const { timezone, current } = weatherData;

  const localTime = new Date(current.time).toLocaleString("en-US", {
      timeZone: timezone,
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
  });

  return (
      <div>
          <div className="flex items-center justify-center my-6">
              <p className="text-xl font-light">{localTime}</p>
          </div>

          <div className="flex items-center justify-center my-3">
              <p className="text-3xl font-medium">{cityName || timezone}</p>
          </div>
      </div>
  );
};

export default TimeAndLocation;

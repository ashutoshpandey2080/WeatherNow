// services/getCityName.js
export const getCityName = async (latitude, longitude) => {
  try {
      const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();

      if (data && data.address && data.address.city) {
          return data.address.city;
      } else if (data && data.address && data.address.town) {
          return data.address.town;
      } else if (data && data.address && data.address.village) {
          return data.address.village;
      }
      return "Unknown Location";
  } catch (error) {
      console.error("Error fetching city name:", error);
      return "Unknown Location";
  }
};

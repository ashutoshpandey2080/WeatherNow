import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { getCoordinatesByCityName } from "../services/getWewather.js";

const Input = ({ setSearchCity, setCoordinates }) => {
    const [city, setCity] = useState("");

    const handleSearch = async () => {
        if (city.trim() !== "") {
            try {
                const { latitude, longitude } = await getCoordinatesByCityName(
                    city
                );
                if (latitude && longitude) {
                    setCoordinates({ latitude, longitude }); 
                    setSearchCity(city);
                } else {
                    alert("City not found. Please try again.");
                }
            } catch (error) {
                console.error("Error fetching coordinates:", error);
                alert("City not found. Please try again.");
            }
        }
    };


    return (
        <div className='flex flex-row justify-center my-6'>
            <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
                <input
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='Search by city...'
                    className='text-gray-500 text-lg font-light p-2 w-full shadow-lg capitalize focus:outline-none'
                />
                <BiSearch
                    size={30}
                    onClick={handleSearch}
                    className='cursor-pointer transition ease-out hover:scale-125'
                />
            </div>
        </div>
    );
};

export default Input;

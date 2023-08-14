import React, { useState, useEffect } from "react";
import FilterDropdown from "./FilterDropdown";

const DisplayArea = ({ countryData, setCountry, setOn, themetoggle }) => {
  const [countries, setCountries] = useState([]); // State for storing list of countries to display
  const [selectedRegion, setSelectedRegion] = useState(""); // State for storing selected region from dropdown

  // Function to shuffle an array
  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  // useEffect hook to update displayed countries list when countryData or selectedRegion changes
  useEffect(() => {
    const shuffledCountryData = shuffleArray([...countryData]);
    if (selectedRegion) {
      setCountries(shuffledCountryData.filter(country => country.region === selectedRegion).slice(0, 8));
    } else {
      setCountries(shuffledCountryData.slice(0, 8));
    }
  }, [countryData, selectedRegion]);

  return (
    <div className="px-8 py-4">
      {/* Filter Dropdown */}
      <div className="w-full sm:w-[25%] sm:right-8 sm:absolute top-16">
        <FilterDropdown
          setSelectedRegion={setSelectedRegion}
          themetoggle={themetoggle}
        />
      </div>

      {/* Country Cards Container */}
      <div className="flex flex-wrap items-center justify-center p-8 gap-4 sm:justify-start sm:items-start sm:gap-8">
        {/* Loop through countries to display each country card */}
        {countries.map((country) => (
          <div
            className="shadow-xl w-full sm:w-[22%] rounded-lg mb-8 cursor-pointer"
            key={country.name}
            onClick={() => {
              setCountry(country.name);
              setOn(true);
            }}
          >
            {/* Country Flag */}
            <img
              src={country.flags.svg}
              alt="country flag"
              className="w-full h-48 object-cover object-center rounded-t-lg"
            />
            {/* Country Details */}
            <div className="pl-8">
              <div className="font-bold my-4">{country.name}</div>
              <div>
                <b>Population</b>: {country.population.toLocaleString()}
              </div>
              <div>
                <b>Region</b>: {country.region}
              </div>
              <div className="pb-8">
                <b>Capital</b>: {country.capital}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayArea;

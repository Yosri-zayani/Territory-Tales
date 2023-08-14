import React, { useState, useEffect, useRef } from "react";

const SearchBar = ({ countryData, setCountry, active, setOn, themetoggle }) => {
  // State for the search term entered by the user
  const [searchTerm, setSearchTerm] = useState("");

  // State for the countries matching the search term
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Ref for the dropdown to detect outside clicks
  const ref = useRef(null);

  // Handle outside clicks to close the search dropdown
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSearchTerm("");
    }
  };

  // Add event listener for mousedown event to detect outside clicks
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter the country data based on the search term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCountries([]);
      return;
    }

    const filtered = countryData
      .map((country) => {
        const index = country.name
          .toLowerCase()
          .indexOf(searchTerm.toLowerCase());
        return { name: country.name, index };
      })
      .filter((country) => country.index !== -1)
      .sort((a, b) => a.index - b.index)
      .slice(0, 4)
      .map((country) => country.name);

    setFilteredCountries(filtered);
  }, [searchTerm, countryData]);

  // Check if the dropdown should be displayed
  const condition = filteredCountries.length > 0 && searchTerm;

  return (
    <div className="w-full p-8 sm:w-[40%] sm:py-8 sm:px-16">
      {/* Form for the search input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCountry(searchTerm);
          setOn(true);
        }}
      >
        {/* Input field container */}
        <div
          className={
            active
              ? "bg-DarkBlue text-VeryLightGray w-[80%] sm:w-auto sm:h-[10vh] rounded-md shadow-lg flex flex-row items-center p-4"
              : "bg-VeryLightGray text-DarkBlue w-[80%] sm:w-auto sm:h-[10vh] rounded-md shadow-lg flex flex-row items-center p-4"
          }
        >
          {/* Search icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>{" "}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
          {/* Search input */}
          <input
            className={
              active
                ? "bg-DarkBlue text-VeryLightGray w-full focus:outline-none"
                : "bg-white text-DarkBlue w-full focus:outline-none"
            }
            type="text"
            placeholder="Search for a country"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
      {/* Display dropdown if condition is met */}
      {condition && (
        <ul
          ref={ref}
          className={
            themetoggle
              ? "bg-DarkBlue mt-2 text-VeryLightGray w-[65%] sm:w-[30%] overflow-clip absolute z-20 p-4"
              : "bg-VeryLightGray text-DarkBlue mt-2 w-[65%] sm:w-[30%] overflow-clip shadow-2xl p-4 z-20 absolute"
          }
        >
          {/* Map over filtered countries and display them */}
          {filteredCountries.map((country) => (
            <li
              className={
                themetoggle
                  ? "hover:bg-VeryLightGray hover:text-DarkBlue cursor-pointer"
                  : "hover:bg-DarkBlue hover:text-VeryLightGray cursor-pointer"
              }
              onClick={() => {
                setCountry(country);
                setOn(true);
              }}
              key={country}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

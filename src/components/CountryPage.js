import React, { useEffect, useState } from "react";

const CountryPage = ({ countryData, on, setOn, searchTerm, setCountry, active }) => {
  const [selectedCountry, setSelectedCountry] = useState([]);

  useEffect(() => {
    // Filter and map the country data based on the search term
    const countryList = countryData
      .filter((country) => country.name === searchTerm)
      .map((country) => ({
        name: country.name,
        nativeName: country.nativeName,
        flag: country.flags.svg,
        population: country.population,
        region: country.region,
        subRegion: country.subregion,
        capital: country.capital,
        topLevelDomain: country.topLevelDomain,
        currencies: country.currencies,
        languages: country.languages,
        borderCountries: country.borders
      }));

    setSelectedCountry(countryList);
  }, [countryData, searchTerm]);

  const handleBorderClick = (border) => {
    const foundCountry = countryData.find((c) => c.alpha3Code === border)?.name;
    if (foundCountry) {
      setCountry(foundCountry);
    }
  };

  return (
    <div className="px-8 py-8 flex flex-col h-screen w-screen">

      {/* Back Button */}
      <div className={`hover:cursor-pointer flex h-[5vh] w-[40%] sm:w-[10vw] pl-4 items-center ${active ? "bg-DarkBlue text-VeryLightGray" : "text-DarkBlue bg-VeryLightGray"}`} onClick={() => setOn(!on)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-4 w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back
      </div>

      {/* Country Details */}
      {selectedCountry.map((country) => (
        <div className="flex flex-col sm:flex-row space-y-4 w-full mt-4 sm:pt-16" key={country.name}>

          {/* Flag */}
          <img src={country.flag} alt="country flag" className="w-full sm:w-[35vw] sm:min-w[35vw] sm:max-h-[60vh] h-auto " />
          <div className="inline"> {/*country Info and borders */}
          {/* Country Info */}
          <div className="flex flex-col sm:flex-row w-full sm:space-x-8">
            
            {/* Left Side Info */}
            <div className="flex flex-col space-y-2 w-full sm:w-1/2 pl-4 sm:pl-24 pt-4 sm:pt-16">
              <div className="text-2xl font-bold pb-8">{country.name}</div>
              <div><b>Native Name:</b> {country.nativeName}</div>
              <div><b>Population:</b> {country.population.toLocaleString()}</div>
              <div><b>Region:</b> {country.region}</div>
              <div><b>Sub Region:</b> {country.subRegion}</div>
              <div><b>Capital:</b> {country.capital}</div>
            </div>

            {/* Right Side Info */}
            <div className="flex flex-col space-y-2 w-full sm:w-1/2 pl-4 sm:pl-16 pt-4 sm:pt-36 ">
              <div><b>Top Level Domain:</b> {country.topLevelDomain}</div>
              <div><b>Currencies:</b> {country.currencies.map(currency => currency.name).join(", ")}</div>
              <div><b>Languages:</b> {country.languages.map(language => language.name).slice(0,3).join(", ")}</div>
            </div>
          </div>

          {/* Border Countries */}
          <div className="w-full pt-16 sm:pl-48 sm:flex">
            <b className=" pt-4 pr-4">Border countries:</b>
            <div className="flex  space-x-4 mt-4 sm:space-x-4 sm:mt-0">
              {country.borderCountries && country.borderCountries.length ? (
                country.borderCountries.map((border) => (
                  <div
                    key={border}
                    className={`hover:cursor-pointer p-4 shadow-2xl rounded ${active ? "bg-DarkBlue text-VeryLightGray" : "text-DarkBlue bg-VeryLightGray"}`}
                    onClick={() => handleBorderClick(border)}
                  >
                    {countryData.find((c) => c.alpha3Code === border)?.name}
                  </div>
                )).slice(0,3)
              ) : (
                <p className=" pt-4 pr-4">This country has no bordering countries.</p>
              )}
            </div>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryPage;

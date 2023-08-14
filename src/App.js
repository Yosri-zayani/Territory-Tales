import React, { useState } from "react";
import Navbar from "./components/navbar";
import SearchBar from "./components/SearchBar";
import countryData from "./data.json";
import DisplayArea from "./components/DisplayArea";
import CountryPage from "./components/CountryPage";

const App = () => {
  // State for toggling detailed country view
  const [on, setOn] = useState(false);
  
  // State for toggling theme (dark/light)
  const [active, setActive] = useState(false);
  
  // State to hold selected country's name
  const [country, setCountry] = useState('');

  // Function to toggle theme state
  const handleClick = () => {
    setActive(!active);
  };

  // Determine the base styling based on the active state
  const baseStyling = active 
    ? "bg-VeryDarkBlue text-VeryLightGray" 
    : "bg-VeryLightGray text-VeryDarkBlue";

  return (
    <div>  {/** Main container for the whole app */}
      
      <div className={`${baseStyling} hidden sm:grid`}> {/** Container for desktop design */}
        <Navbar active={active} handleClick={handleClick} />
        
        {on ? (
          <CountryPage countryData={countryData} setOn={setOn} on={on} searchTerm={country} setCountry={setCountry} active={active} />
        ) : (
          <div className="grid">
            <SearchBar
              active={active}
              countryData={countryData}
              setCountry={setCountry}
              setOn={setOn}
              themetoggle={active}
            />
            <DisplayArea themetoggle={active} countryData={countryData} setCountry={setCountry} setOn={setOn} />
          </div>
        )}
      </div>

      <div className={`${baseStyling} sm:hidden`}> {/** Container for mobile design */}
        <Navbar active={active} handleClick={handleClick} />
        
        {on ? (
          <CountryPage countryData={countryData} setOn={setOn} on={on} searchTerm={country} setCountry={setCountry} active={active} />
        ) : (
          <div>
            <SearchBar
              active={active}
              countryData={countryData}
              setCountry={setCountry}
              setOn={setOn}
              themetoggle={active}
            />
            <DisplayArea themetoggle={active} countryData={countryData} setCountry={setCountry} setOn={setOn} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

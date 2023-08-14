import React, { useState, useEffect, useRef } from "react";

const FilterDropdown = ({ themetoggle, setSelectedRegion }) => {
    // State to manage the dropdown visibility
    const [active, setActive] = useState(false);

    // Ref for the dropdown to detect outside clicks
    const ref = useRef(null);

    // Handle outside clicks to close the dropdown
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setActive(false);
        }
    };

    // Add event listener for mousedown event to detect outside clicks
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle the selection of a region
    const handleClick = (region) => {
        setSelectedRegion(region);
        setActive(false); // Close the dropdown after selecting
    }

    // Determine the base styling based on the themetoggle state
    const baseStyling = themetoggle 
        ? "bg-DarkBlue text-VeryLightGray" 
        : "bg-VeryLightGray text-DarkBlue";

    return (
        <div ref={ref} className="p-8 relative w-[65%]">
            <button 
                className={`${baseStyling} pl-4 text-left rounded-xl shadow-2xl w-full h-[5vh] absolute`} 
                onClick={() => { setActive(!active); }}
            >
                Filter by Region
            </button>
            {active && (
                <div className={`${baseStyling} absolute text-left w-[70%] top-20 shadow-2xl z-10 p-4 rounded-lg`}>
                    <div onClick={() => handleClick("Africa")} className="cursor-pointer">Africa</div>
                    <div onClick={() => handleClick("Americas")} className="cursor-pointer">America</div>
                    <div onClick={() => handleClick("Asia")} className="cursor-pointer">Asia</div>
                    <div onClick={() => handleClick("Europe")} className="cursor-pointer">Europe</div>
                    <div onClick={() => handleClick("Oceania")} className="cursor-pointer">Oceania</div>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;

import React from "react";
import ThemeColor from "./ThemeColor";

const Navbar = ({ active, handleClick }) => {
  // Common classes to determine the theme of the navbar
  const themeClass = active ? "bg-DarkBlue text-VeryLightGray" : "text-DarkBlue bg-VeryLightGray";

  return (
    <div>
      {/* Navbar for desktop display */}
      <div className="hidden sm:flex">
        <div className={`${themeClass} flex justify-between items-center w-screen shadow h-[10vh] py-8 px-16`}>
          {/* Brand name */}
          <div className="text-xl font-bold">Territory Tales</div>
          {/* Theme toggle button */}
          <div className="items-end ml-4 pt-2">
            <ThemeColor active={active} handleClick={handleClick} />
          </div>
        </div>
      </div>

      {/* Navbar for mobile display */}
      <div className={`${themeClass} flex justify-between w-screen shadow h-[10vh] p-4 sm:hidden`}>
        {/* Brand name */}
        <div className="text-xl font-bold mr-8 w-[60%]">Territory Tales</div>
        {/* Theme toggle button */}
        <div className="ml-4 pt-2">
          <ThemeColor active={active} handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

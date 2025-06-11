import React from "react";
import "../CSS/Header.css";
import {
  FaBars, FaSearch, FaExpand, FaRegBell
} from "react-icons/fa";
import { PiBagBold } from "react-icons/pi";
import { BiCategory } from "react-icons/bi";
import { LuMoon } from "react-icons/lu";
import avatar1 from "../Images/avatar1.jpg";

const Header = ({ onToggleSidebar }) => {
  const handleClick = (name) => {
    if (name === "expand") {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    } else {
      console.log(`${name} clicked`);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <FaBars className="menu-icon" onClick={onToggleSidebar} />
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="header-right">
        <div className="clickable" onClick={() => handleClick("flag")}>
          <img src="https://flagcdn.com/us.svg" alt="USA Flag" className="flag-icon" />
        </div>

        <div className="clickable" onClick={() => handleClick("category")}>
          <BiCategory className="header-icon" />
        </div>

        <div className="clickable icon-badge" onClick={() => handleClick("bag")}>
          <PiBagBold className="header-icon" />
          <span className="badge blue">5</span>
        </div>

        <div className="clickable" onClick={() => handleClick("expand")}>
          <FaExpand className="header-icon" />
        </div>

        <div className="clickable" onClick={() => handleClick("theme")}>
          <LuMoon className="header-icon" />
        </div>

        <div className="clickable icon-badge" onClick={() => handleClick("bell")}>
          <FaRegBell className="header-icon" />
          <span className="badge red">3</span>
        </div>

        <div className="clickable user-profile" onClick={() => handleClick("profile")}>
          <img src={avatar1} alt="User" className="user-avatar" />
          <div className="user-info">
            <span className="user-name">Anna Adame</span>
            <span className="user-role">Founder</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

// Header.jsx
import React from "react";
import "../CSS/Header.css";
import {
  FaBars, FaSearch, FaMoon, FaBell, FaExpand
} from "react-icons/fa";
import { PiBagBold } from "react-icons/pi";
import { BiCategory } from "react-icons/bi";
import avatar1 from "../Images/avatar1.jpg";
import { LuMoon } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";



const Header = ({ onToggleSidebar }) => {
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
        <img src="https://flagcdn.com/us.svg" alt="USA Flag" className="flag-icon" />
        <BiCategory style={{ color: 'gray', fontSize: '20px' }} />
        <div className="icon-badge" style={{ color: 'gray', fontSize: '20px', height: '25px' }}>
          <PiBagBold />
          <span className="badge blue">5</span>
        </div>
        <FaExpand className="header-icon" />
        <LuMoon style={{ color: 'gray', fontSize: '20px'}}/>
        <div className="icon-badge">
<FaRegBell style={{ color: 'gray', fontSize: '20px'}}/>
          <span className="badge red">3</span>
        </div>

        <div className="user-profile">
          <img
            src={avatar1}
            alt="User"
            className="user-avatar"
          />
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

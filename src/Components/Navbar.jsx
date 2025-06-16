import '../CSS/Navbar.css'; 
import logolight from "../Images/logolight.png";
import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { GoTag } from "react-icons/go";
import { BiCategory } from "react-icons/bi";
import { LiaCartPlusSolid } from "react-icons/lia";
import favicon from "../Images/favicon.ico"

const Navbar = ({ collapsed }) => {
  return (
    <div className={`navbar ${collapsed ? 'collapsed' : ''}`}>
      <div className="logo">
        <span className="logo-text">
          <img
            src={collapsed ? favicon : logolight}
            alt="logo"
            className="logo1"
          />
        </span>
      </div>

      <div className="menu">
        {!collapsed && <div className="menu-title">Menu</div>}
        <ul className="menu-list">
          <li className="menu-item">
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <span className="icon"><AiOutlineHome /></span>
              {!collapsed && 'Home'}
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/users"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <span className="icon"><FaRegUserCircle /></span>
              {!collapsed && 'Users'}
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/brands"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <span className="icon"><GoTag /></span>
              {!collapsed && 'Brands'}
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/category"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <span className="icon"><BiCategory /></span>
              {!collapsed && 'Category'}
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/product"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <span className="icon"><LiaCartPlusSolid /></span>
              {!collapsed && 'Product'}
            </NavLink>
          </li>
          {/* <li className="menu-item">
            <NavLink
              to="/test"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {!collapsed && 'test'}
            </NavLink>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Components/Navbar';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import './layout.css';
import Breadcrums from './Components/Breadcrums';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const ignoreClickRef = useRef(false); // Track if the last click was on the hamburger

  const toggleSidebar = () => {
    ignoreClickRef.current = true; // Prevent immediate outside click closing
    setCollapsed(prev => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const sidebar = document.querySelector('.first-part');
      if (
        window.innerWidth <= 768 &&
        collapsed &&
        sidebar &&
        !sidebar.contains(event.target)
      ) {
        if (!ignoreClickRef.current) {
          setCollapsed(false);
        }
      }
      ignoreClickRef.current = false; // Reset after handling
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [collapsed]);

  return (
    <div className="layout-container">
      <div className={`first-part ${collapsed ? 'collapsed' : ''}`}>
        <Navbar collapsed={collapsed} />
      </div>
      <div className="right-container">
        <Header onToggleSidebar={toggleSidebar} />
        <Breadcrums />
        <div className="content-area">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

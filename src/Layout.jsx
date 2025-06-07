// Layout.jsx
import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import './layout.css';
import Breadcrums from './Components/Breadcrums';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

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

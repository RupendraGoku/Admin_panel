// Breadcrums.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../CSS/Breadcrums.css';

const Breadcrums = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // Function to generate breadcrumb items based on current path
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const searchParams = new URLSearchParams(location.search);
    
    const crumbs = [{ name: 'Home', path: '/' }];
    
    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Format segment name (capitalize and replace dashes/underscores with spaces)
      const formattedName = segment
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
      
      crumbs.push({
        name: formattedName,
        path: currentPath
      });
    });
    
    // Add search params as additional breadcrumb if present
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const product = searchParams.get('product');
    
    if (category) {
      crumbs.push({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        path: `${location.pathname}?category=${category}`
      });
    }
    
    if (subcategory) {
      crumbs.push({
        name: subcategory.charAt(0).toUpperCase() + subcategory.slice(1),
        path: `${location.pathname}?category=${category}&subcategory=${subcategory}`
      });
    }
    
    if (product) {
      crumbs.push({
        name: product.charAt(0).toUpperCase() + product.slice(1),
        path: `${location.pathname}?category=${category}&subcategory=${subcategory}&product=${product}`
      });
    }
    
    return crumbs;
  };

  useEffect(() => {
    setBreadcrumbs(generateBreadcrumbs());
  }, [location]);

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  return (
    <div className='crums-container'>
      <h4 className='brand-title'>E-COMMERCE</h4>
      <div className="breadcrums">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <span 
              className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? 'current' : 'clickable'}`}
              onClick={() => index !== breadcrumbs.length - 1 && handleBreadcrumbClick(crumb.path)}
            >
              {crumb.name}
            </span>
            {index < breadcrumbs.length - 1 && (
              <span className="breadcrumb-separator">›</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrums;
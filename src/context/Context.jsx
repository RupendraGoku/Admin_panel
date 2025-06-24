// ApiServiceContext.js
import React, { createContext ,useState} from 'react';
import axios from 'axios';

export const ApiServiceContext = createContext();

export const ApiServiceProvider = ({ children }) => {
  const apiEndpoints = {
    brand: {
      fetch: 'https://myworkstatus.in/ecom/api/product_brand_record.php',
      insert: 'https://myworkstatus.in/ecom/api/product_brand_insert.php',
      update: 'https://myworkstatus.in/ecom/api/product_brand_update.php',
      delete: 'https://myworkstatus.in/ecom/api/product_brand_delete.php',
    },
    user: {
      fetch: 'https://myworkstatus.in/ecom/api/user_record.php',
      insert: 'https://myworkstatus.in/ecom/api/user_insert.php',
      update: 'https://myworkstatus.in/ecom/api/user_update.php',
      delete: 'https://myworkstatus.in/ecom/api/user_delete.php',
    }
    
  };
  const[type,setType] = useState('');
  // Generic API Caller
  // const performApiRequest = async ({ url, method = 'POST', data = {} }) => {
  //   try {
  //     const response = await axios({
  //       method,
  //       url,
  //       data,
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error(`Error during ${method} request to ${url}:`, error);
  //     throw error;
  //   }
  // };
  const typeSetting = (value)=>{
    setType(value)
  }

  return (
    <ApiServiceContext.Provider value={{ apiEndpoints,typeSetting,type,setType }}>
      {children}
    </ApiServiceContext.Provider>
  );
};

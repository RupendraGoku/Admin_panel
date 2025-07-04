import './App.css'
import Brands from './Components/Brands';

import Users from './Components/Users';
import Category from './Components/Category';
import Product from './Components/Product';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Layout from './Layout';
import Customer from './Components/Customer';

function App() {

  return (
    <>
  
        <Router>
          <Routes>
            <Route path='/' element={<Layout/>}>
             <Route index element={<Home />} /> 
             
             <Route path='brands' element={<Brands/>}/>
            <Route path='category' element={<Category/>}/>
            <Route path='users' element={<Users/>}/>
            <Route path='customer' element={<Customer/>}/>
            <Route path='product' element={<Product/>}/>
            </Route>
          </Routes>
        </Router>
        </>
        
  )
}

export default App

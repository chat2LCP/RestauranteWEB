import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Services from './pages/services/Services'
import Products from './pages/Products/Products'
import SignUp from './pages/SignUp/SignUp'
import NewAccount from './pages/SignUp/NewAccount/NewAccount';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='services' element={<Services/>}/>
          <Route path='products' element={<Products/>}/>
          <Route path='products/allProducts' element={<h1>todos os prod </h1>}/>
          <Route path='products/sweets' element={<h1>doces</h1>}/>
          <Route path='signup' element={<SignUp/>}/>
          <Route path='new-account' element={<NewAccount/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;

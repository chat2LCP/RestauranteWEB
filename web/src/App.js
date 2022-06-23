import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.scss'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import NewAccount from './pages/NewAccount/NewAccount'
import NotFound from './pages/notFound/NotFound'
import Spinner from './components/Spinner/spinner';
import Product from './pages/Product/Product';
import SignIn from './pages/SignIn/SignIn';
import Cargos from './pages/Cargos/Cargos';

function App() {

  return (
    <>
      <BrowserRouter>      
        <Routes>
          <Route path='/' element={<Cargos />} />


          <Route path='products' element={<Products />} />
          <Route path='products/:productId' element={<Product />} />
          <Route path='signin' element={<SignIn /> } />  
          <Route path='products' element={<Products />} />        
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

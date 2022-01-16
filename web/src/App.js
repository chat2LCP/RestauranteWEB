import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.scss'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import NewAccount from './pages/NewAccount/NewAccount'
import NotFound from './pages/notFound/NotFound'
import Spinner from './components/Spinner/spinner';
import Product from './pages/Product/Product';

const SignUp = React.lazy(() => import('./pages/SignIn/SignIn'))

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='products' element={<Products />} />
          <Route path='products/:product' element={<Product />} />
          <Route 
            path='signin' 
            element={
              <Suspense fallback={<Spinner />}>
                <SignUp />
              </Suspense>
            }
          />          
          <Route path='new-account' element={<NewAccount />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.scss'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import CardsProduct from './pages/Products/CardsProduct';
import Products from './pages/Products/Products'
import NewAccount from './pages/NewAccount/NewAccount'
import NotFound from './pages/notFound/NotFound'
// import Services from './pages/services/Services'

const SignUp = React.lazy(() => import('./pages/SignUp/SignUp'))

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='services' element={<Services/>}/> */}
          <Route path='products' element={<Products />}>
            <Route path='produtcs/:product' element={<CardsProduct />} />
          </Route>
          <Route 
            path='signup' 
            element={
              <Suspense fallback={
                <div className="spinner-container">
                  <div className="spinner-grow text-primary" style={{width: 3+'rem', height: 3+'rem'}} role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
                }
              >
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

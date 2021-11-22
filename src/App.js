import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Services from './pages/services/Services'
import Products from './pages/Products/Products'
import SignUp from './pages/SignUp/SignUp'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/services' component={Services}/>
          <Route path='/products/:idProduct' component={Products}/>
          <Route path='/signup' component={SignUp}/>
        </Switch>
      </BrowserRouter>
      
    </>
  );
}

export default App;

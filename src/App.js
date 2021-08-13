import './App.css'
import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import {BrowserRouter, Route,Switch} from 'react-router-dom'
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
          <Route path='/products' component={Products}/>
          <Route path='/signup' component={SignUp}/>
        </Switch>
      </BrowserRouter>
      
    </>
  );
}

export default App;

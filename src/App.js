import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home'
import {BrowserRouter, Route,Switch} from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        
        <Switch>
          <Route path='/' exact component={Home}/>
        </Switch>
      </BrowserRouter>
      
    </>
  );
}

export default App;

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.scss'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home'
import NotFound from './pages/notFound/NotFound'
import SignIn from './pages/SignIn/SignIn';
import Cargos from './pages/Cargos/Cargos';
import Pedidos from './pages/Pedidos/Pedidos';
import Produtos from './pages/Produtos/Produtos';
import Funcionarios from './pages/Funcionarios/Funcionarios';
import Itens from './pages/Itens/Itens';

function App() {

  return (
    <>
      <BrowserRouter>      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cadastrar-cargo' element={<Cargos />} />
          <Route path='/cadastrar-produto' element={<Produtos />} />
          <Route path='/cadastrar-funcionario' element={<Funcionarios />} />
          <Route path='/realizar-pedido' element={<Pedidos />} />  
          <Route path='/incluir-item' element={<Itens />} />       
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

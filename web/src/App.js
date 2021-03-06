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
import Categorias from './pages/Categorais/Categorias';
import Setores from './pages/Setores/Setores';
import RelatorioIndex from './pages/Relatorios/RelatorioIndex';
import Vendas from './pages/Venda/Vendas';
import Impressoras from './pages/Impressoras/Impressoras';
import AssistenteVoz from './pages/AssistenteVoz/AssistenteVoz';

function App() {

  return (
    <>
      <BrowserRouter>      
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/home' element={<Home />} />
          <Route path='/cadastrar-cargo' element={<Cargos />} />
          <Route path='/cadastrar-produto' element={<Produtos />} />
          <Route path='/cadastrar-funcionario' element={<Funcionarios />} />
          <Route path='/cadastrar-categoria' element={<Categorias />} />
          <Route path='/cadastrar-setor' element={<Setores />} />
          <Route path='/cadastrar-impressora' element={<Impressoras />} />
          <Route path='/realizar-pedido' element={<Pedidos />} />  
          <Route path='/fechar-pedido' element={<Vendas />} />  
          <Route path='/incluir-item' element={<Itens />} />       
          <Route path='/relatorios' element={<RelatorioIndex />} />  
          <Route path='/assistente-voz' element={<AssistenteVoz/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

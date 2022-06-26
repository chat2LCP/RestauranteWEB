import React from 'react'
import { Link } from 'react-router-dom'

import './Home.scss'
import Button from '../../components/Button/Button'

function Home() {
    return(
        <div className='home-container'>
            <section className='header'>
                <div className='home-header'>
                    <Button component={Link} to={'/'} buttonSize='btn--invisible' buttonStyle='btn--transparent' className='icone-logout'>
                        <svg className='icone-svg' xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg> 
                    </Button>
                    <div className='logo-restaurante'>
                        <i class="fab fa-pagelines"></i>
                    </div>
                    <h1 className='home-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="home-body"> 
                <div className='home-gerencial'>
                    <div className='home-subtitulos'>
                        <h3>GERENCIAL</h3>
                    </div>
                    <div className='home-botoes'>
                        <div className='botoes-gerenciais-superiores'>
                            <Button component={Link} to='/cadastrar-produto' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRO DE PRODUTOS</Button>
                            <Button component={Link} to='cadastrar-cargo' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRO DE CARGOS</Button>
                            <Button component={Link} to='/cadastrar-funcionario' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRO DE FUNCIONÁRIOS</Button>
                        </div>
                        <div className='botoes-gerenciais-inferiores'>
                            <Button component={Link} to='/cadastrar-setor' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRO DE SETORES</Button>
                            <Button component={Link} to='/cadastrar-categoria' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRO DE CATEGORIAS</Button>
                            <Button component={Link} to='/relatorios' buttonSize='btn--medium' buttonStyle='btn--green'>RELATÓRIOS</Button>
                        </div>
                    </div>        
                </div>  
                <div className='home-operacional'>
                    <div className='home-subtitulos'>
                        <h3>OPERACIONAL</h3>
                    </div>
                    <div className='home-botoes'>
                        <div className='botoes-operacionais'>
                            <Button component={Link} to='/realizar-pedido' buttonSize='btn--medium' buttonStyle='btn--green'>REALIZAR PEDIDO</Button>
                            <Button component={Link} to='/incluir-item' buttonSize='btn--medium' buttonStyle='btn--green'>INCLUIR ITEM</Button>
                        </div>
                    </div>        
                </div>       
            </section>
        </div>
    )
}

export default Home;
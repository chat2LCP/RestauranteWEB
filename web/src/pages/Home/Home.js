import React from 'react'
import { Link } from 'react-router-dom'

import './Home.scss'
import Button from '../../components/Button/Button'

function Home() {
    return(
        <div className='home-container'>
            <section className='header'>
                <div className='home-header'>
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
                            <Button component={Link} to='/new-account' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRO DE SETORES</Button>
                            <Button component={Link} to='/new-account' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRO DE CATEGORIAS</Button>
                            <Button component={Link} to='/new-account' buttonSize='btn--medium' buttonStyle='btn--green'>RELATÓRIOS</Button>
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
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BoxArrowLeft, Mic } from 'react-bootstrap-icons';
import { Apple } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'

import './Home.scss'
import Button from '../../components/Button/Button'

function Home() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate('/') 
    }

    useEffect(() => {
        if(!localStorage.getItem("access_token")){
            navigate('/')
        }
    })

    return(
        <div className='home-container'>
            <section className='header'>
                <div className='home-header'>
                    <Button component={Button} onClick={handleLogout} buttonSize='btn--invisible' buttonStyle='btn--transparent' className='icone-logout'> 
                       <BoxArrowLeft size={50} color='#e5e4e2' />
                    </Button>
                    <Apple size={92} color='#fefefe'></Apple>
                    <h1 className='home-titulo'>DRestaurante</h1>
                    <Button component={Link} to='/assistente-voz' buttonSize='btn--invisible' buttonStyle='btn--transparent' className='icone-voz'>
                        <Mic size={50} color='#e5e4e2' />
                    </Button>
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
                            <Button component={Link} to='/cadastrar-cargo' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRO DE CARGOS</Button>
                            <Button component={Link} to='/cadastrar-funcionario' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRO DE FUNCIONÁRIOS</Button>
                        </div>
                        <div className='botoes-gerenciais-inferiores'>
                            <Button component={Link} to='/cadastrar-setor' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRO DE SETORES</Button>
                            <Button component={Link} to='/cadastrar-categoria' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRO DE CATEGORIAS</Button>
                            <Button component={Link} to='/cadastrar-impressora' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRO DE IMPRESSORAS</Button>
                        </div>
                        <div className='botoes-gerenciais-inferiores'>
                            <Button component={Link} to='/relatorios' buttonSize='btn--medium' buttonStyle='btn--blue'>RELATÓRIOS</Button>
                        </div>
                    </div>        
                </div>  
                <div className='home-operacional'>
                    <div className='home-subtitulos'>
                        <h3>OPERACIONAL</h3>
                    </div>
                    <div className='home-botoes'>
                        <div className='botoes-operacionais'>
                            <Button component={Link} to='/realizar-pedido' buttonSize='btn--medium' buttonStyle='btn--blue'>REALIZAR PEDIDO</Button>
                            <Button component={Link} to='/fechar-pedido' buttonSize='btn--medium' buttonStyle='btn--red'>FINALIZAR PEDIDO</Button>
                        </div>
                    </div>        
                </div>
            </section>
        </div>
    )
}

export default Home;
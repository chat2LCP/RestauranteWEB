import React from 'react'
import { Link } from 'react-router-dom'

import './Pedidos.scss'
import Button from '../../components/Button/Button'

function Pedidos() {

    const cadastrarPedido = () => {
        //logica p cadastrar
    }

    return(
        <div className='pedido-container'>
            <section className='header'>
                <div className='pedido-header'>
                    <div className='logo-restaurante'>
                        <i class="fab fa-pagelines"></i>
                    </div>
                    <h1 className='pedido-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="pedido-body">
                <div className='pedido-description'>
                    <h3>REALIZAR PEDIDO</h3>
                    <span className='divider'></span>
                </div>

                <div className='pedido-label-input'>
                    <label className='label-nome-cargo'>Nome do cliente</label>
                    <input className='input-pedido' />
                </div>

                <div className='pedido-label-input'>
                    <label className='label-nome-cargo'>Número da ficha</label>
                    <input className='input-pedido' />
                </div>

                <div className='pedido-botoes'>
                    <Button component={Link} to ='/incluir-item' buttonSize='btn--medium' buttonStyle='btn--green'>INCLUIR ITEM</Button>
                    <Button component={Link} to='/' buttonSize='btn--medium' buttonStyle='btn--red'>CANCELAR</Button>
                </div>
            </section>
        </div>
    )
}

export default Pedidos
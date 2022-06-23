import React from 'react'
import { Link } from 'react-router-dom'

import './Cargos.scss'
import Button from '../../components/Button/Button'

function Cargos() {
    return(
        <div>
            <section className='header'>
                <div className='cargos-header'>
                    <div className='logo-restaurante'>
                        <i class="fab fa-pagelines"></i>
                    </div>
                    <h1 className='cargos-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="cargos-container">
                <div className='cargos-description'>
                    <h3>CADASTRO DE CARGOS</h3>
                    <span className='divider'></span>
                </div>

                <div className='cargos-label-input'>
                    <label className='label-nome-cargo'>Nome do cargo</label>
                    <input className='input-cargos' />
                </div>

                <div className='cargos-botoes'>
                    <Button component={Link} to='/new-account' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRAR</Button>
                    <Button component={Link} to='/new-account' buttonSize='btn--medium' buttonStyle='btn--green'>CANCELAR</Button>
                </div>
            </section>
        </div>
    )
}

export default Cargos
import React from 'react'
import { Link } from 'react-router-dom'

import './Cargos.scss'
import Button from '../../components/Button/Button'

function Cargos() {

    const cadastrarCargo = () => {
        //logica p cadastrar
    }

    return(
        <div className='cargos-container'>
            <section className='header'>
                <div className='cargos-header'>
                    <div className='logo-restaurante'>
                        <i class="fab fa-pagelines"></i>
                    </div>
                    <h1 className='cargos-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="cargos-body">
                <div className='cargos-description'>
                    <h3>CADASTRO DE CARGOS</h3>
                    <span className='divider'></span>
                </div>

                <div className='cargos-label-input'>
                    <label className='label-nome-cargo'>Nome do cargo</label>
                    <input className='input-cargos' />
                </div>

                <div className='cargos-botoes'>
                    {/* <Button component={Button} onClick={cadastrarCargo} buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRAR</Button> */}
                    <Button component={Link} to='/' buttonSize='btn--medium' buttonStyle='btn--red'>CANCELAR</Button>
                </div>
            </section>
        </div>
    )
}

export default Cargos
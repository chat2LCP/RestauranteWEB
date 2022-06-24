import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Itens.scss'
import Button from '../../components/Button/Button'

function Itens() {

    useEffect(() => {

        console.log('entrou');
        // axios.get('http://localhost:XXXX/XXXX')
        // .then((data) => {
        //     console.log(data)
        // })
        // .catch((error) => {
        //     console.log(error.message)
        // })
    }, [])

    const incluirItem = () => {

    }

    return(
        <div className='item-container'>
            <section className='header'>
                <div className='item-header'>
                    <div className='logo-restaurante'>
                        <i class="fab fa-pagelines"></i>
                    </div>
                    <h1 className='item-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="item-body">
                <div className='item-description'>
                    <h3>INCLUIR ITEM</h3>
                    <span className='divider'></span>
                </div>

                <div className='label-inputs'>
                    <div className='label-input-esquerda'>
                        <div className='item-label-input'>
                            <label className='label-nome-cargo'>Número da ficha</label>
                            <input className='input-item' />
                        </div>

                        <div className='item-label-input'>
                            <div className='item-label-input'>
                                <label className='label-nome-cargo'>Produto</label>
                                <select class="mdb-select md-form" className='input-item'>
                                    <option value="" disabled selected>Selecione um produto</option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='label-input-direita'>
                        <div className='item-label-input'>
                            <label className='label-nome-cargo'>Quantidade</label>
                            <input className='input-item' />
                        </div>
                    </div>
                </div>
                
                <div className='item-botoes'>
                    <Button component={Button} onClick={incluirItem} buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRAR</Button>
                    <Button component={Link} to='/' buttonSize='btn--medium' buttonStyle='btn--red'>CANCELAR</Button>
                </div>
            </section>
        </div>
    )
}

export default Itens
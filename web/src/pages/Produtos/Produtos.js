import React from 'react'
import { Link } from 'react-router-dom'

import './Produtos.scss'
import Button from '../../components/Button/Button'

function Produtos() {

    const cadastrarProduto = () => {
        //logica p cadastrar
    }

    return(
        <div className='produto-container'>
            <section className='header'>
                <div className='produto-header'>
                    <div className='logo-restaurante'>
                        <i class="fab fa-pagelines"></i>
                    </div>
                    <h1 className='produto-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="produto-body">
                <div className='produto-description'>
                    <h3>CADASTRO DE PRODUTOS</h3>
                    <span className='divider'></span>
                </div>

                <div className='label-inputs'>
                    <div className='label-input-esquerda'>
                        <div className='produto-label-input'>
                            <label className='label-nome-cargo'>Descrição</label>
                            <input className='input-produto' />
                        </div>

                        <div className='produto-label-input'>
                            <label className='label-nome-cargo'>Preço</label>
                            <input className='input-produto' />
                        </div>
                        

                        <div className='produto-label-input'>
                            <label className='label-nome-cargo'>Tempo de preparo</label>
                            <input className='input-produto' />
                        </div>
                    </div>

                    <div className='label-input-direita'>
                        <div className='produto-label-input'>
                            <label className='label-nome-cargo'>Categoria</label>
                            <input className='input-produto' />
                        </div>

                        <div className='produto-label-input'>
                            <label className='label-nome-cargo'>Setor</label>
                            <input className='input-produto' />
                        </div>
                        

                        <div className='produto-label-input'>
                            <label className='label-nome-cargo'>Ativo</label>
                            <div className='produto-radiobutton'>
                                <input type="radio" value="S" name="ativo" /><span>Sim</span>
                                <input type="radio" value="N" name="ativo" /><span>Não</span>
                            </div>
                        </div>
                    </div>
                </div>
                

                <div className='produto-botoes'>
                    <Button component={Button} onClick={cadastrarProduto} buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRAR</Button>
                    <Button component={Link} to='/' buttonSize='btn--medium' buttonStyle='btn--red'>CANCELAR</Button>
                </div>
            </section>
        </div>
    )
}

export default Produtos
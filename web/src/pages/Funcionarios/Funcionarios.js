import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Funcionarios.scss'
import Button from '../../components/Button/Button'

function Funcionarios() {

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

    const cadastrarFuncionario = () => {

    }

    return(
        <div className='funcionario-container'>
            <section className='header'>
                <div className='funcionario-header'>
                    <div className='logo-restaurante'>
                        <i class="fab fa-pagelines"></i>
                    </div>
                    <h1 className='funcionario-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="funcionario-body">
                <div className='funcionario-description'>
                    <h3>CADASTRO DE FUNCIONÁRIOS</h3>
                    <span className='divider'></span>
                </div>

                <div className='label-inputs'>
                    <div className='label-input-esquerda'>
                        <div className='funcionario-label-input'>
                            <label className='label-nome-cargo'>Nome</label>
                            <input className='input-funcionario' />
                        </div>

                        <div className='funcionario-label-input'>
                            <label className='label-nome-cargo'>Login</label>
                            <input className='input-funcionario' />
                        </div>
                        
                        <div className='funcionario-label-input'>
                            <label className='label-nome-cargo'>Senha</label>
                            <input className='input-funcionario' />
                        </div>
                    </div>

                    <div className='label-input-direita'>
                        <div className='funcionario-label-input'>
                            <label className='label-nome-cargo'>Cargo</label>
                            <select class="mdb-select md-form" className='input-funcionario'>
                                <option value="" disabled selected>Selecione um cargo</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                            </select>
                        </div>
                        

                        <div className='funcionario-label-input'>
                            <label className='label-nome-cargo'>Ativo</label>
                            <div className='funcionario-radiobutton'>
                                <input type="radio" value="S" name="ativo" /><span>Sim</span>
                                <input type="radio" value="N" name="ativo" /><span>Não</span>
                            </div>
                        </div>
                    </div>
                </div>
                

                <div className='funcionario-botoes'>
                    <Button component={Button} onClick={cadastrarFuncionario} buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRAR</Button>
                    <Button component={Link} to='/' buttonSize='btn--medium' buttonStyle='btn--red'>CANCELAR</Button>
                </div>
            </section>
        </div>
    )
}

export default Funcionarios
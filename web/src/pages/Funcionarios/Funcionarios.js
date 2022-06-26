import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axios from 'axios'

import './Funcionarios.scss'
import Button from '../../components/Button/Button'

function Funcionarios() {
    const validationSchema = yup.object().shape({
        nome: yup
            .string()
            .required("campo obrigatório"),
        login: yup
            .string()
            .required("campo obrigatório"),
        senha: yup
            .string()
            .required("campo obrigatório"),
        cargo: yup
            .string()
            .required("campo obrigatório")
    })

    const { 
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            nome: '',
            login: '',
            senha: '',
            cargo: '',
        },
        resolver: yupResolver(validationSchema),  //aplica a validação do yup no formulário
    })

    const [cargos, setCargos] = useState([{id: '', nome: ''}])

    useEffect(() => {
        axios.get(`/setores`)
        .then(({id, nome}) => setCargos([{id: `${id}`, nome: `${nome}`}]))
        .catch(() => {
            // alert('erro ao carregar lista de categorias')      
        })
    }, [])
  
    const cadastrarFuncionario = (data) => {
        console.log(data)
    }

    const buscaCargos = async () => {
        const id = document.getElementById('idCargo').value;

        if (id !== null || id !== undefined){
            await axios.get(`/setores/${id}`)
            .then(({id, nome}) => setCargos([{id: `${id}`, nome: `${nome}`}]))
            .catch(() => {
                // alert('erro ao carregar lista de categorias')      
            })
        } else{
            await axios.get(`/setores`)
            .then(({id, nome}) => setCargos([{id: `${id}`, nome: `${nome}`}]))
            .catch(() => {
                // alert('erro ao carregar lista de categorias')      
            })
        }
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
                
                <form className="form" onSubmit={handleSubmit(cadastrarFuncionario)}>
                    <div className='label-inputs'>
                        <div className='label-input-esquerda'>
                            <div className='funcionario-label-input'>
                                <label className='label-nome-cargo'>Nome</label>
                                <input 
                                    id="nome"
                                    name="nome"
                                    className="form-control input-funcionario" 
                                    {...register("nome")} 
                                />
                                <p className='funcionario-error-message'>{errors.nome?.message}</p>
                            </div>

                            <div className='funcionario-label-input'>
                                <label className='label-nome-cargo'>Login</label>
                                <input 
                                    id="login"
                                    name="login"
                                    className="form-control input-funcionario" 
                                    {...register("login")} 
                                />
                                <p className='funcionario-error-message'>{errors.login?.message}</p>
                            </div>
                            
                            <div className='funcionario-label-input'>
                                <label className='label-nome-cargo'>Senha</label>
                                <input 
                                    id="senha"
                                    name="senha"
                                    className="form-control input-funcionario" 
                                    {...register("senha")} 
                                />
                                <p className='funcionario-error-message'>{errors.senha?.message}</p>
                            </div>
                        </div>

                        <div className='label-input-direita'>
                            <div className='funcionario-label-input'>
                                <label className='label-nome-cargo'>Cargo</label>
                                <div className='input-select-container'>
                                    <input id='idCargo' onBlur={buscaCargos} placeholder='id' className='input-id form-control' />
                                    <select
                                        id="cargo"
                                        name="cargo"
                                        className="form-control form-select input-funcionario"  //form-control e form-select são classes do bootstrap
                                        {...register("cargo")} 
                                    >
                                        {cargos.map(cargo => {
                                            return (
                                                <option key={cargo.id}>{cargo.nome}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <p className='funcionario-error-message'>{errors.cargo?.message}</p>
                            </div>
                            

                            <div className='funcionario-label-input'>
                                <label className='label-nome-cargo'>Ativo</label>
                                <div className='funcionario-radiobutton'>
                                    <input 
                                        type="radio" 
                                        value="S" 
                                        name="active" 
                                        defaultChecked={true} 
                                        {...register("ativo")}
                                    /><span>Sim</span>
                                    <input 
                                        type="radio" 
                                        value="N" 
                                        name="active"
                                        {...register("ativo")} 
                                    /><span>Não</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='funcionario-botoes'>
                        <Button component={Button} type='submit' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRAR</Button>
                        <Button component={Link} to='/' buttonSize='btn--medium' buttonStyle='btn--red'>CANCELAR</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Funcionarios
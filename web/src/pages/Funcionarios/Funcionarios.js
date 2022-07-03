import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axios from 'axios'

import './Funcionarios.scss'
import Button from '../../components/Button/Button'
import ModalScreen from '../../components/Modal/ModalScreen';

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
            .required("campo obrigatório")
    })

    const { 
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        resolver: yupResolver(validationSchema),  //aplica a validação do yup no formulário
    })

    const [modalShow, setModalShow] = useState({show: false, status: 'ok', message: ''})
    const [cargos, setCargos] = useState([{id: '', descricao: ''}])

    useEffect(() => {
        axios.get(`/cargos`)
        .then((res) => {
            setCargos(res.data.data)
        })  
    }, [])
   
    const buscaCargos = async (e) => {
        const id = e.target.value
        
        if (id !== null || id !== undefined){
            await axios.get(`/cargos/${id}`)
            .then((res) => 
                setCargos(res.data.data)
            )
            .catch(() => {
                setModalShow({
                    show: true, 
                    status: 'error', 
                    message: 'Cargo não encontrado'
                })
            })
        } else{
            await axios.get(`/cargos`)
            .then((res) => 
            setCargos(res.data.data)
            )
        }
    }

    const defineIdCargo = () => {
        const select = document.getElementById('select-cargo')
        const idCargoSelecionado = select.options[select.selectedIndex].value
        
        const inputIdCargo = document.getElementById('idCargo')
        inputIdCargo.value = idCargoSelecionado
    }
    
    const cadastrarFuncionario = async ({nome, login, senha, idCargo, ativo}) => {
        await axios.put('/funcionarios', {
            nome : nome.normalize("NFD").replace(/[^a-zA-Zs]/g, "").toUpperCase(),
            login,
            senha,
            idCargo : document.getElementById('idCargo').value,
            ativo
        })
        .then(() => {
            setModalShow({
                show: true, 
                status: 'ok', 
                message: 'Funcionário salvo com sucesso'
            })
            reset()
        })
        .catch(() => {
            setModalShow({
                show: true, 
                status: 'error', 
                message: 'Erro ao salvar funcionário'
            })
        })
    }

    return(
        <div className='funcionario-container'>
            <ModalScreen
                show={modalShow.show} 
                status={modalShow.status}
                message={modalShow.message}
                onHide={() => setModalShow({show: false, status: modalShow.status, message: modalShow.message})}
            />
            <section className='header'>
                <div className='funcionario-header'>
                    <div className='logo-restaurante'>

                        LOGo

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
                                    <input 
                                        className='input-id form-control' 
                                        id="idCargo"
                                        onBlur={buscaCargos} 
                                        defaultValue={cargos[0].id}
                                    />
                                    <select 
                                        id='select-cargo' 
                                        onChange={defineIdCargo} 
                                        className="form-control form-select input-funcionario"
                                    >
                                        {cargos.map(cargo => {
                                            return (
                                                <option value={cargo.id} key={cargo.id}>{cargo.descricao}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <p className='funcionario-error-message'>{errors.idCargo?.message}</p>
                            </div>
                            
                            <div className='funcionario-label-input'>
                                <label className='label-nome-cargo'>Ativo</label>
                                <div className='funcionario-radiobutton'>
                                    <input 
                                        type="radio" 
                                        value={true} 
                                        name="active" 
                                        defaultChecked={true} 
                                        {...register("ativo")}
                                    /><span>Sim</span>
                                    <input 
                                        type="radio" 
                                        value={false} 
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
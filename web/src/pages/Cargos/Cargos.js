import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axios from 'axios';
import { Apple } from 'react-bootstrap-icons';

import './Cargos.scss'
import Button from '../../components/Button/Button'
import ModalScreen from '../../components/Modal/ModalScreen';
import SpinnerScreen from '../../components/Spinner/SpinnerScreen';

function Cargos() {
    const validationSchema = yup.object().shape({
        descricao: yup
            .string()
            .required("campo obrigatório"),
    })

    const { 
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        defaultValues: {
            descricao: ''
        },
        resolver: yupResolver(validationSchema),
    }) 

    const [modalShow, setModalShow] = useState({show: false, status: 'ok', message: ''})
    const [listaCargos, setListaCargos] = useState([{id: 0, descricao: ''}])
    const [showSpinner, setShowSpinner] = useState(false)

    const atualizaListaDeCargos = () => {
        axios.get(`${process.env.REACT_APP_URL_BASE}/cargos`, {
            headers: {
                Authorization: 'Bearer '.concat(localStorage.getItem("access_token"))
            }
        })
        .then((res) => {
            setListaCargos(res.data.data)
        })
    }

    useEffect(() => {
        atualizaListaDeCargos()  
    }, [])

    const cadastrarCargo = async ({descricao}) => {
        try{
            setShowSpinner(true)

            const options = {
                method: 'PUT',
                url: `${process.env.REACT_APP_URL_BASE}/cargos`,
                headers: {
                    Authorization: 'Bearer '.concat(localStorage.getItem("access_token"))
                },
                data: {
                    descricao: descricao.normalize("NFD").replace(/[^a-zA-Zs ]/g, "").toUpperCase(),
                }
            };
    
            axios.request(options)
            .then(() => {
                setModalShow({
                    show: true, 
                    status: 'ok', 
                    message: 'Cargo salvo com sucesso'
                })
                atualizaListaDeCargos()
                reset()
            })
            .catch(() => {
                setModalShow({
                    show: true, 
                    status: 'error', 
                    message: 'Erro ao salvar cargo'
                })
            })    
        }finally{
            setShowSpinner(false)
        }
    }

    return(
        <div className='cargos-container'>
            <SpinnerScreen show={showSpinner} />
            <ModalScreen
                show={modalShow.show} 
                status={modalShow.status}
                message={modalShow.message}
                onHide={() => setModalShow({show: false, status: modalShow.status, message: modalShow.message})}
            />
            <section className='header'>
                <div className='cargos-header'>
                    <Apple size={92} color='#fefefe'></Apple>
                    <h1 className='cargos-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="cargos-body">
                <div className='cargos-description'>
                    <h3>CADASTRO DE CARGOS</h3>
                    <span className='divider'></span>
                </div>
                
                <form className="form" onSubmit={handleSubmit(cadastrarCargo)}>
                    <div className='label-inputs'>
                        <div className='label-input-esquerda'>
                            <div className='cargos-label-input'>
                                <label className='label-nome-cargo'>Nome do cargo</label>
                                <input 
                                    id="descricao"
                                    name="descricao"
                                    className="form-control input-cargos" 
                                    {...register("descricao")} 
                                />
                                <p className='cargo-error-message'>{errors.descricao?.message}</p>
                            </div>
                        </div>

                        <div className='label-input-direita'>
                            <div className='resumo-cargo-container'>
                                <div className='resumo-cargo-scrollarea'>
                                    <h2 className='resumo-titulo'>Cargos cadastrados</h2>
                                    {
                                        listaCargos.map((cargo) => {
                                            return(
                                                <div key={cargo.id}>
                                                    <span className='resumo-info'>{cargo.id} - {cargo.descricao}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>    

                    <div className='cargos-botoes'>
                        <Button component={Button} type='submit' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRAR</Button>
                        <Button component={Link} to='/home' buttonSize='btn--medium' buttonStyle='btn--red'>VOLTAR</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Cargos
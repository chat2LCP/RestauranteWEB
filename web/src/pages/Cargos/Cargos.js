import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axios from 'axios';

import './Cargos.scss'
import Button from '../../components/Button/Button'
import ModalScreen from '../../components/Modal/ModalScreen';

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

    const cadastrarCargo = async ({descricao}) => {
        await axios.put('/cargos', {
            descricao: descricao.normalize("NFD").replace(/[^a-zA-Zs]/g, "").toUpperCase()
        })
        .then(
            setModalShow({
                show: true, 
                status: 'ok', 
                message: 'Cargo salvo com sucesso'
            }),
            reset()
        )
        .catch(() => {
            setModalShow({
                show: true, 
                status: 'error', 
                message: 'Erro ao salvar cargo'
            })
        })
    }

    return(
        <div className='cargos-container'>
             <ModalScreen
                show={modalShow.show} 
                status={modalShow.status}
                message={modalShow.message}
                onHide={() => setModalShow({show: false, status: modalShow.status, message: modalShow.message})}
            />
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
                
                <form className="form" onSubmit={handleSubmit(cadastrarCargo)}>
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

                    <div className='cargos-botoes'>
                        <Button component={Button} type='submit' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRAR</Button>
                        <Button component={Link} to='/' buttonSize='btn--medium' buttonStyle='btn--red'>CANCELAR</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Cargos
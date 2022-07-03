import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axios from 'axios';

import './Setores.scss'
import Button from '../../components/Button/Button'
import ModalScreen from '../../components/Modal/ModalScreen';

function Setores() {
    const [modalShow, setModalShow] = useState({show: false, status: 'ok', message: ''})

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
        resolver: yupResolver(validationSchema),  //aplica a validação do yup no formulário
    }) 

    const cadastrarSetor = async ({descricao}) => {
        await axios.put('/setores', {
            descricao: descricao.normalize("NFD").replace(/[^a-zA-Zs]/g, "").toUpperCase()
        })
        .then(() => { 
            setModalShow({
                show: true, 
                status: 'ok', 
                message: 'Setor salvo com sucesso!'
            })
            reset()
        })         
        .catch(() => {
           setModalShow({
                show: true, 
                status: 'error', 
                message: `Erro ao salvar setor`
            })
        })
    }

    return(
        <div className='setor-container'>
            <ModalScreen 
                show={modalShow.show} 
                status={modalShow.status}
                message={modalShow.message}
                onHide={() => setModalShow({show: false, status: modalShow.status, message: modalShow.message})}
            />
            <section className='header'>
                <div className='setor-header'>
                    <div className='logo-restaurante'>
                        <i class="fab fa-pagelines"></i>
                    </div>
                    <h1 className='setor-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="setor-body">
                <div className='setor-description'>
                    <h3>CADASTRO DE SETOR</h3>
                    <span className='divider'></span>
                </div>

                <form className="form" onSubmit={handleSubmit(cadastrarSetor)}>
                    <div className='setor-label-input'>
                        <label className='label-nome-setor'>Nome do setor</label>
                        <input 
                            id="descricao"
                            name="descricao"
                            className="form-control input-setor" 
                            {...register("descricao")} 
                        />
                        <p className='setores-error-message'>{errors.descricao?.message}</p>
                    </div>

                    <div className='setor-botoes'>
                        <Button component={Button} type='submit' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRAR</Button>
                        <Button component={Link} to='/' buttonSize='btn--medium' buttonStyle='btn--red'>CANCELAR</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Setores
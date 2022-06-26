import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axios from 'axios';

import './Setores.scss'
import Button from '../../components/Button/Button'

function Setores() {
    const validationSchema = yup.object().shape({
        descricao: yup
            .string()
            .required("campo obrigatório"),
    })

    const { 
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            descricao: ''
        },
        resolver: yupResolver(validationSchema),  //aplica a validação do yup no formulário
    }) 

    const cadastrarSetor = async ({descricao}) => {
        await axios.put('/setores', {
            descricao
        })
        .then(
            alert("Setor salvo com sucesso")
        )
        .catch((error) => {
           alert("Erro ao salvar setor, tente novamente") 
           console.log(error)
        })
    }

    return(
        <div className='setor-container'>
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
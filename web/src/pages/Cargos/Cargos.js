import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axios from 'axios';

import './Cargos.scss'
import Button from '../../components/Button/Button'

function Cargos() {
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

    const cadastrarCargo = async ({descricao}) => {
        await axios.put('/cargos', {
            descricao
        })
        .then(
            alert("Cargo salvo com sucesso")
        )
        .catch(() => {
           alert("Erro ao salvar cargo, tente novamente")
        })
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
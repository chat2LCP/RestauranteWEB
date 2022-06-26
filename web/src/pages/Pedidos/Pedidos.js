import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import './Pedidos.scss'
import Button from '../../components/Button/Button'

function Pedidos() {
    const validationSchema = yup.object().shape({
        nome: yup
            .string()
            .required("campo obrigatório"),
        ficha: yup
            .string()
            .required("campo obrigatório"),
    })

    const { 
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            nome: '',
            ficha: ''
        },
        resolver: yupResolver(validationSchema),  //aplica a validação do yup no formulário
    }) 

    const cadastrarPedido = (data) => {
        console.log(data)
    }

    return(
        <div className='pedido-container'>
            <section className='header'>
                <div className='pedido-header'>
                    <div className='logo-restaurante'>
                        <i class="fab fa-pagelines"></i>
                    </div>
                    <h1 className='pedido-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="pedido-body">
                <div className='pedido-description'>
                    <h3>REALIZAR PEDIDO</h3>
                    <span className='divider'></span>
                </div>

                <form className="form">
                    <div className='pedido-label-input'>
                        <label className='label-nome-pedido'>Nome do cliente</label>
                        <input 
                            id="nome"
                            name="nome"
                            className="form-control input-pedido" 
                            {...register("nome")} 
                        />
                        <p className='error-message'>{errors.nome?.message}</p>
                    </div>

                    <div className='pedido-label-input'>
                        <label className='label-nome-pedido'>Número da ficha</label>
                        <input 
                            id="ficha"
                            name="ficha"
                            className="form-control input-pedido" 
                            {...register("ficha")} 
                        />
                        <p className='error-message'>{errors.ficha?.message}</p>
                    </div>

                    <div className='pedido-botoes'>
                        <Button component={Link} to ='/incluir-item' buttonSize='btn--medium' buttonStyle='btn--green'>INCLUIR ITEM</Button>
                        <Button component={Link} to='/' buttonSize='btn--medium' buttonStyle='btn--red'>CANCELAR</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Pedidos
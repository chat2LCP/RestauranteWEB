import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import './Pedidos.scss'
import Button from '../../components/Button/Button'
import { usePedido } from '../../contexts/pedidoContext';
import ModalScreen from '../../components/Modal/ModalScreen';

const Pedidos = () => {
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
        formState: {errors},
        reset
    } = useForm({
        resolver: yupResolver(validationSchema),  //aplica a validação do yup no formulário
    }) 

    const [modalShow, setModalShow] = useState({show: false, status: 'ok', message: ''})
    const { setPedido } = usePedido()
    const navigate = useNavigate()
    
    const cadastrarPedido = (data) => {
        try{
            setPedido({nomeCliente: data.nome, numeroFicha: data.ficha})
            reset()
            navigate('/incluir-item')
        }
        catch{
            setModalShow({
                show: true, 
                status: 'error', 
                message: 'Erro ao incluir item'
            })
        } 
    }


    return(
        <div className='pedido-container'>
            <ModalScreen
                show={modalShow.show} 
                status={modalShow.status}
                message={modalShow.message}
                onHide={() => setModalShow({show: false, status: modalShow.status, message: modalShow.message})}
            />
            <section className='header'>
                <div className='pedido-header'>
                    <div className='logo-restaurante'>
                        {/* <i class="fab fa-pagelines"></i> */}
                    </div>
                    <h1 className='pedido-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="pedido-body">
                <div className='pedido-description'>
                    <h3>REALIZAR PEDIDO</h3>
                    <span className='divider'></span>
                </div>

                <form className="form" onSubmit={handleSubmit(cadastrarPedido)}>
                    <div className='pedido-label-input'>
                        <label className='label-nome-pedido'>Nome do cliente</label>
                        <input 
                            id="nome"
                            name="nome"
                            className="form-control input-pedido" 
                            {...register("nome")} 
                        />
                        <p className='item-error-message'>{errors.nome?.message}</p>
                    </div>

                    <div className='pedido-label-input'>
                        <label className='label-nome-pedido'>Número da ficha</label>
                        <input 
                            id="ficha"
                            name="ficha"
                            className="form-control input-pedido" 
                            {...register("ficha")} 
                        />
                        <p className='item-error-message'>{errors.ficha?.message}</p>
                    </div>

                    <div className='pedido-botoes'>
                        <Button component={Button} type="submit" buttonSize='btn--medium' buttonStyle='btn--green'>INCLUIR ITEM</Button>
                        <Button component={Link} to='/' buttonSize='btn--medium' buttonStyle='btn--red'>CANCELAR</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Pedidos
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axios from 'axios';
import { Apple } from 'react-bootstrap-icons';

import './Vendas.scss'
import Button from '../../components/Button/Button'
import ModalScreen from '../../components/Modal/ModalScreen';
import SpinnerScreen from '../../components/Spinner/SpinnerScreen';

function Vendas() { 
    const validationSchema = yup.object().shape({
        idVenda: yup
        .string()
        .required("campo obrigatório"),
    })

    const { 
        register,
        formState: {errors},
        reset,
        setValue
    } = useForm({
        resolver: yupResolver(validationSchema),  //aplica a validação do yup no formulário
    }) 
    
    const listaVendasVazia = [{id: 0, datahora: '', idProduto: 0, quantidade: 0, valor: 0}]
    const [modalShow, setModalShow] = useState({show: false, status: 'ok', message: ''})
    const [showSpinner, setShowSpinner] = useState(false)
    const [listaVendas, setListaVendas] = useState(listaVendasVazia)
    const [detalheVenda, setDetalheVenda] = useState(listaVendasVazia)
    
    useEffect(() => {
        axios.get('/vendas')
        .then((res) => {
            setListaVendas(res.data.data)
        })    
    })

    const buscaVenda = async (e) => {
        const id = e.target.value
        
        if (id !== null || id !== undefined){
            await axios.get(`/vendas/${id}`)
            .then((res) => 
                setDetalheVenda(res.data.data)
            )
            .catch(() => {
                setModalShow({
                    show: true, 
                    status: 'error', 
                    message: 'Venda não encontrada'
                })

                setDetalheVenda(listaVendasVazia)
                setValue("idVenda", '')
            })
        }
    }

    const finalizarPedido = {

    }

    return(
        <div className='categoria-container'>
            <SpinnerScreen show={showSpinner} />
            <ModalScreen 
                show={modalShow.show} 
                status={modalShow.status}
                message={modalShow.message}
                onHide={() => setModalShow({show: false, status: modalShow.status, message: modalShow.message})}
            />
            <section className='header'>
                <div className='categoria-header'>
                    <Apple size={92} color='#fefefe'></Apple>
                    <h1 className='categoria-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="categoria-body">
                <div className='categoria-description'>
                    <h3>FINALIZAR PEDIDO</h3>
                    <span className='divider'></span>
                </div>

                <div className='label-inputs'>
                    <div className='label-input-esquerda'>
                        <div className='categoria-label-input'>
                            <label className='label-id-venda'>Id da venda</label>
                            <input 
                                id="idVenda"
                                name="idVenda"
                                className="form-control input-venda" 
                                {...register("idVenda")} 
                                onBlur={buscaVenda}
                            />
                            <p className='categoria-error-message'>{errors.idVenda?.message}</p>
                        </div>
                        <div className='resumo-venda-container'>
                            <div className='resumo-venda-scrollarea detalhe'>
                                <h2 className='resumo-titulo'>Detalhe da venda</h2>
                                {
                                    detalheVenda.map((detalhe) => {
                                        return(
                                            <div key={detalhe.id}>
                                                <div className='resumo-info'>
                                                    <span className='resumo-item'>ID da venda</span>
                                                    <span className='resumo-subitem'>{detalhe.id}</span>
                                                    <span className='resumo-item'>ID produto</span>
                                                    <span className='resumo-subitem'>{detalhe.idProduto}</span>
                                                    <span className='resumo-item'>Quantidade</span>
                                                    <span className='resumo-subitem'>{detalhe.quantidade}</span>
                                                    <span className='resumo-item'>Valor</span>
                                                    <span className='resumo-subitem'>{detalhe.valor}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className='label-input-direita'>
                        <div className='resumo-venda-container'>
                        <div className='resumo-venda-scrollarea'>
                                <h2 className='resumo-titulo'>Resumo de vendas</h2>
                                {
                                    listaVendas.map((venda) => {
                                        return(
                                            <div key={venda.id}>
                                                <div className='resumo-info'>
                                                    <span className='resumo-item'>ID da venda</span>
                                                    <span className='resumo-subitem'>{venda.id}</span>
                                                    <span className='resumo-item'>ID produto</span>
                                                    <span className='resumo-subitem'>{venda.idProduto}</span>
                                                    <span className='resumo-item'>Quantidade</span>
                                                    <span className='resumo-subitem'>{venda.quantidade}</span>
                                                    <span className='resumo-item'>Valor</span>
                                                    <span className='resumo-subitem'>{venda.valor}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className='categoria-botoes'>
                    <Button component={Button} type='submit' buttonSize='btn--medium' buttonStyle='btn--green'>FINALIZAR</Button>
                    <Button component={Link} to='/' buttonSize='btn--medium' buttonStyle='btn--red'>CANCELAR</Button>
                </div>
            </section>
        </div>
    )
}

export default Vendas
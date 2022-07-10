import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { Apple } from 'react-bootstrap-icons';

import './Pedidos.scss'
import Button from '../../components/Button/Button'
import { usePedido } from '../../contexts/pedidoContext';
import ModalScreen from '../../components/Modal/ModalScreen';
import axios from 'axios';
import SpinnerScreen from '../../components/Spinner/SpinnerScreen';

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
        reset,
        setValue
    } = useForm({
        resolver: yupResolver(validationSchema),  //aplica a validação do yup no formulário
    }) 

    const listaDeProdutosVazia = [{datahora: '', id: '', itens: [{datahora: '', id: 0, idPedido: 0, idProduto: 0, observacao: '', produto:{descricao: '', id: 0, preco: 0}, quantidade: 0, sequencia: 0, valor: 0}], nomeCliente: '', numeroFicha: 0}]
    const [modalShow, setModalShow] = useState({show: false, status: 'ok', message: ''})
    const [showSpinner, setShowSpinner] = useState(false)
    const [listaFichas, setListaFichas] = useState([{id: 0}])
    const [listaPedidos, setListaPedidos] = useState(listaDeProdutosVazia)
    const { setPedido } = usePedido()
    const navigate = useNavigate()
    const AuthStr = 'Bearer '.concat(localStorage.getItem("access_token"))

    const atualizaListaDeFichas = async () => {
        await axios.get(`${process.env.REACT_APP_URL_BASE}/fichas`, {
            headers: {
                Authorization: AuthStr
            }
        })
        .then((res) => {
            setListaFichas(res.data.data)
        })
        .catch(() => {
            setModalShow({
                show: true, 
                status: 'error', 
                message: 'Erro ao buscar lista de fichas'
            })
        })
    }

    const atualizaListaDePedidos = async () => {
        await axios.get(`${process.env.REACT_APP_URL_BASE}/pedidos`, {
            headers: {
                Authorization: AuthStr
            }
        })
        .then((res) => {
            setListaPedidos(res.data.data)

            // console.log(listaPedidos)
            console.log(res.data.data)
        })
        .catch((error) => {
            setModalShow({
                show: true, 
                status: 'error', 
                message: 'Erro ao buscar lista de pedidos'
            })

            console.log(error)
        })
    }

    useEffect(() => {
        atualizaListaDeFichas()
        atualizaListaDePedidos() 
    }, [])

    // const buscaFicha = async (e) => {
    //     const id = e.target.value

    //     await axios.get(`${process.env.REACT_APP_URL_BASE}/fichas/${id}`, {
    //         headers: {
    //             Authorization: AuthStr
    //         }
    //     })         
    //     .catch(() => {
    //         setModalShow({
    //             show: true, 
    //             status: 'error', 
    //             message: `Ficha não cadastrada`
    //         })
            
    //         setValue("ficha", '')
    //     })
    // }

    const cadastrarFicha = (data) => {
        try{
            setShowSpinner(true)
            
            setPedido({nomeCliente: data.nome, numeroFicha: data.ficha})

            const options = {
                method: 'PUT',
                url: `${process.env.REACT_APP_URL_BASE}/fichas`,
                headers: {
                    Authorization: AuthStr
                },
                data: {
                    id: data.ficha
                }
            };
    
            axios.request(options)
            .then(() => {
                navigate('/incluir-item')
            })
            .catch(() => {
                setModalShow({
                    show: true, 
                    status: 'error', 
                    message: `Erro ao cadastrar ficha`
                })
            }) 
        }finally{
            setShowSpinner(false)
        }
    }

    return(
        <div className='pedido-container'>
            <SpinnerScreen show={showSpinner} />
            <ModalScreen
                show={modalShow.show} 
                status={modalShow.status}
                message={modalShow.message}
                onHide={() => setModalShow({show: false, status: modalShow.status, message: modalShow.message})}
            />
            <section className='header'>
                <div className='pedido-header'>
                    <Apple size={92} color='#fefefe'></Apple>
                    <h1 className='pedido-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="pedido-body">
                <div className='pedido-description'>
                    <h3>REALIZAR PEDIDO</h3>
                    <span className='divider'></span>
                </div>

                <form className="form" onSubmit={handleSubmit(cadastrarFicha)}>
                    <div className='label-inputs'>
                        <div className='label-input-esquerda'>
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
                                    className="form-control input-pedido ficha" 
                                    {...register("ficha")} 
                                    // onBlur={buscaFicha}
                                    />
                                <p className='item-error-message'>{errors.ficha?.message}</p>
                            </div>
                        </div>

                        <div className='label-input-direita'>
                            <div className='resumo-ficha-container'>
                                <div className='resumo-ficha-scrollarea'>
                                    <h2 className='resumo-titulo'>Fichas cadastradas</h2>
                                    {
                                        listaFichas.map((ficha) => {
                                            return(
                                                <div className='resumo-item-container' key={ficha.id}>
                                                    <span className='resumo-item'>{ficha.id}</span>
                                                    {
                                                        listaPedidos.map((pedido) => {
                                                            if(pedido.numeroFicha == ficha.id){
                                                                return(
                                                                    <div className='resumo-subinfo' key={pedido.id}>
                                                                        <div>
                                                                            <span className='resumo-subitem'>ID pedido</span>
                                                                            <span className='resumo-info'>{pedido.id}</span>
                                                                        </div>
                                                                        <div>
                                                                            <span className='resumo-subitem'>Cliente</span>
                                                                            <span className='resumo-info'>{pedido.nomecliente}</span>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='pedido-botoes'>
                        <Button component={Button} type="submit" buttonSize='btn--medium' buttonStyle='btn--green'>INCLUIR ITEM</Button>
                        <Button component={Link} to='/home' buttonSize='btn--medium' buttonStyle='btn--red'>VOLTAR</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Pedidos
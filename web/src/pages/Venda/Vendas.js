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
        idPedido: yup
            .string()
            .required("campo obrigatório"),
    })

    const { 
        handleSubmit,
        register,
        formState: {errors},
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
    }) 
    
    const listaPedidosVazia = [{id: 0, nomecliente: '', numeroFicha: '', datahora: '', itens: [{idPedido: 0, idProduto: '', quantidade: '', valor: 0, sequencia: 0, observacao: '', datahora: '', produto: {id: 0, preco: 0, descricao: ''}}]}]
    const [modalShow, setModalShow] = useState({show: false, status: 'ok', message: ''})
    const [showSpinner, setShowSpinner] = useState(false)
    const [listaPedidos, setListaPedidos] = useState(listaPedidosVazia)
    const AuthStr = 'Bearer '.concat(localStorage.getItem("access_token"))

    const buscaPedido = async (e) => {
        const id = e.target.value
        
        if(id == ''){
            setListaPedidos(listaPedidosVazia)
        }else if (id !== null || id !== undefined){
            await axios.get(`${process.env.REACT_APP_URL_BASE}/pedidos/${id}`, {
                headers: {
                    Authorization: AuthStr
                }
            })
            .then((res) => {
                setListaPedidos(res.data.data)
            })
            .catch(() => {
                setModalShow({
                    show: true, 
                    status: 'error', 
                    message: 'Pedido não encontrado'
                })
                
                setListaPedidos(listaPedidosVazia)
                reset()
            })
        }
    }

    const finalizarPedido = (data) => {
        try{
            setShowSpinner(true)

            var data = new Date();
            const dataFormatada = `${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()} ${data.getHours()+3}:${data.getMinutes()}:${data.getSeconds()}`


            listaPedidos[0].itens.map((pedido) => {
                const options = {
                    method: 'PUT',
                    url: `${process.env.REACT_APP_URL_BASE}/vendas`,
                    headers: {
                        Authorization: AuthStr
                    },
                    data: {
                        idProduto: pedido.idProduto,
                        valor: pedido.valor,
                        quantidade: pedido.quantidade,
                        datahora: dataFormatada,
                    }
                };
        
                axios.request(options)
                .then(() => {
                    setModalShow({
                        show: true, 
                        status: 'ok', 
                        message: 'Venda finalizada com sucesso'
                    })
                    setListaPedidos(listaPedidosVazia)
                    reset()
                }
                )
                .catch(() => {
                    setModalShow({
                        show: true, 
                        status: 'error', 
                        message: 'Erro ao finalizar venda'
                    })
                })
            })
        }finally{
            setShowSpinner(false)
        }
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
                
                <form className="form" onSubmit={handleSubmit(finalizarPedido)}>
                    <div className='label-inputs'>
                        <div className='label-input-esquerda'>
                            <div className='categoria-label-input'>
                                <label className='label-id-venda'>Id do pedido</label>
                                <input 
                                    id="idPedido"
                                    name="idPedido"
                                    className="form-control input-venda" 
                                    {...register("idPedido")} 
                                    onBlur={buscaPedido}
                                />
                                <p className='categoria-error-message'>{errors.idPedido?.message}</p>
                            </div>
                            <div className='resumo-venda-container'>
                                <div className='resumo-venda-scrollarea'>
                                    {
                                        <div className='cliente-ficha-container'>                                        
                                            <span className='cliente-ficha'>Cliente: </span>
                                            <span>{listaPedidos[0].nomecliente}</span><br />
                                            <span className='cliente-ficha'>Ficha: </span>
                                            <span>{listaPedidos[0].numeroFicha}</span>
                                        </div>
                                    }
                                    <table className='tabela-dados-venda'>
                                        <thead className='thead'>
                                            <tr className='colunas'>
                                                <th>Id Produto</th>
                                                <th>Descricao</th>
                                                <th>Preço</th>
                                                <th>Quantidade</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className='tbody'>
                                            {
                                                listaPedidos[0].itens.map((pedido, index) => {
                                                    return(
                                                        <tr className='row-dados' key={index}>
                                                            <td className='resumo-subitem'>{pedido.idProduto}</td>
                                                            <td className='resumo-subitem'>{pedido.produto.descricao}</td>
                                                            <td className='resumo-subitem'>{parseFloat(pedido.valor).toFixed(2)}</td>
                                                            <td className='resumo-subitem'>{pedido.quantidade}</td>
                                                            <td className='resumo-subitem'>{parseFloat(pedido.quantidade * pedido.valor).toFixed(2)}</td>
                                                        </tr>
                                                    )
                                                })    
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div className='total-container'>
                                    <span>TOTAL: </span>
                                    <span>
                                        R$ {
                                            parseFloat(listaPedidos[0].itens.reduce((accum, curr) => accum + (curr.valor * curr.quantidade), 0)).toFixed(2)
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='categoria-botoes'>
                        <Button component={Button} type='submit' buttonSize='btn--medium' buttonStyle='btn--green'>FINALIZAR</Button>
                        <Button component={Link} to='/home' buttonSize='btn--medium' buttonStyle='btn--red'>VOLTAR</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Vendas
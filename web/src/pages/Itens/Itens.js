import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axios from 'axios'
import { Apple } from 'react-bootstrap-icons';

import './Itens.scss'
import Button from '../../components/Button/Button'
import ModalScreen from '../../components/Modal/ModalScreen';
import { usePedido } from '../../contexts/pedidoContext';
import SpinnerScreen from '../../components/Spinner/SpinnerScreen';

function Itens() {
    const validationSchema = yup.object().shape({
        idProduto: yup
            .string()
            .required("campo obrigatório"),
        quantidade: yup
            .number("insira apenas números")
            .positive("insira um valor maior que 0")
            .integer("insira um valor inteiro")
            .typeError("valor inválido")
            .required("campo obrigatório"),
        sequencia: yup
            .number("insira apenas números")
            .positive("insira um valor maior que 0")
            .integer("insira um valor inteiro")
            .typeError("valor inválido")
            .required("campo obrigatório"),
    })

    const { 
        register,
        handleSubmit,
        formState: {errors},
        reset,
        setValue,
        getValues
    } = useForm({
        resolver: yupResolver(validationSchema),  //aplica a validação do yup no formulário
    }) 
    
    const listaDeProdutosVazia = [{datahora: '', id: '', itens: [{datahora: '', id: '', idPedido: '', idProduto: '', observacao: '', produto:{descricao: '', id: '', preco: ''}, quantidade: '', sequencia: '', valor: ''}], nomeCliente: '', numeroFicha: ''}]
    const [modalShow, setModalShow] = useState({show: false, status: 'ok', message: ''})
    const [showSpinner, setShowSpinner] = useState(false)
    const [produtos, setProdutos] = useState([{id: '', preco: 0, descricao: '', tempopreparo: 0, idCategoria: 0, ativo: true, idSetor: 0}])
    const [pedidoItens, setPedidoItens] = useState(listaDeProdutosVazia)
    const { pedido } = usePedido()
    const AuthStr = 'Bearer '.concat(localStorage.getItem("access_token"))

    const atualizaListaDeProdutos = () => {
        axios.get(`${process.env.REACT_APP_URL_BASE}/produtos`, {
            headers: {
                Authorization: AuthStr
            }
        })
        .then((res) => {
            setProdutos(res.data.data)
            setValue("idProduto", res.data.data[0].id)
            setValue("valor", res.data.data[0].preco)
        }) 
    }

    useEffect(() => {
        atualizaListaDeProdutos() 
    }, [])

    const buscaProduto = async (e) => {
        const id = e.target.value

        if (id != ''){
            await axios.get(`${process.env.REACT_APP_URL_BASE}/produtos/${id}`, {
                headers: {
                    Authorization: AuthStr
                }
            })
            .then((res) => {
                setProdutos(res.data.data)                
                setValue("valor", res.data.data[0].preco)
            })
            .catch(() => {
                setModalShow({
                    show: true, 
                    status: 'error', 
                    message: 'Produto não encontrado'
                })
                 
                axios.get(`${process.env.REACT_APP_URL_BASE}/produtos`, {
                    headers: {
                        Authorization: AuthStr
                    }
                })
                .then((res) => {
                    setProdutos(res.data.data)
                })

                const descricao = getValues("descricaoProduto")
                setValue("idProduto", descricao.split(',')[0]) 
            })
        } else{
            await axios.get(`${process.env.REACT_APP_URL_BASE}/produtos`, {
                headers: {
                    Authorization: AuthStr
                }
            })
            .then((res) => 
                setProdutos(res.data.data)
            )
            setValue("valor", 0)
        }
    }

    const buscaPedido = async (e) => {
        const id = e.target.value

        if (id != ''){
            await axios.get(`${process.env.REACT_APP_URL_BASE}/pedidos/${id}`, {
                headers: {
                    Authorization: AuthStr
                }
            })
            .then((res) => {
                setPedidoItens(res.data.data)
            })
            .catch(() => {
                setModalShow({
                    show: true, 
                    status: 'error', 
                    message: 'Pedido não encontrado'
                })
                setPedidoItens(listaDeProdutosVazia)
                setValue("idPedido", '')
            })
        } else{
            setPedidoItens(listaDeProdutosVazia)
        }
    }

    const incluirPedido = async ({idPedido, idProduto, quantidade, valor, sequencia, observacao}) => {
        try{
            setShowSpinner(true)

            var data = new Date();
            const dataFormatada = `${data.getFullYear()}-${data.getMonth()}-${data.getDate()} ${data.getHours()+3}:${data.getMinutes()}:${data.getSeconds()}`
            let idPedidoBanco = idPedido

            //busca o id do pedido gerado pelo banco
            if (idPedido == 0 || idPedido == undefined || idPedido == ''){
                const options1 = {
                    method: 'PUT',
                    url: `${process.env.REACT_APP_URL_BASE}/pedidos`,
                    headers: {
                        Authorization: AuthStr
                    },
                    data : {
                        nomecliente: pedido.nomeCliente.normalize("NFD").replace(/[^a-zA-Zs]/g, "").toUpperCase(),
                        numeroFicha: pedido.numeroFicha,
                        datahora: dataFormatada,
                    }
                }

                await axios.request(options1)
                .then((res) => {
                    idPedidoBanco = res.data.data[0].id
                })
                .catch(() => {
                    setModalShow({
                        show: true, 
                        status: 'error', 
                        message: `Erro ao gerar pedido`
                    })
                }) 
            }
            
            //salva item no pedido
            const options2 = {
                method: 'PUT',
                url: `${process.env.REACT_APP_URL_BASE}/pedidos`,
                headers: {
                    Authorization: AuthStr
                },
                data: {
                    itens: [{
                        idPedido : idPedidoBanco,
                        idProduto,
                        quantidade,
                        valor,
                        sequencia,
                        observacao,
                        datahora: dataFormatada
                    }]
                }
            };
                
            await axios.request(options2)
            .then(() => {
                setModalShow({
                    show: true, 
                    status: 'ok', 
                    message: `Item incluído com sucesso`
                })
                setPedidoItens(listaDeProdutosVazia)
                reset()
            })
            .catch(() => {
                setModalShow({
                    show: true, 
                    status: 'error', 
                    message: `Erro ao incluir item`
                })
            }) 
        }finally{
            setShowSpinner(false)
        }
    }

    return(
        <div className='item-container'>
            <SpinnerScreen show={showSpinner} />
             <ModalScreen
                show={modalShow.show} 
                status={modalShow.status}
                message={modalShow.message}
                onHide={() => setModalShow({show: false, status: modalShow.status, message: modalShow.message})}
            />
            <section className='header'>
                <div className='item-header'>
                    <Apple size={92} color='#fefefe'></Apple>
                    <h1 className='item-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="item-body">
                <div className='item-description'>
                    <h3>INCLUIR ITEM</h3>
                    <span className='divider'></span>
                </div>

                <form className="form" onSubmit={handleSubmit(incluirPedido)}>
                    <div className='label-inputs'>
                        <div className='label-input-esquerda'>
                            <div className='item-label-input'>
                                <label className='label-nome-item'>Ficha: <span className='ficha'>{pedido.numeroFicha}</span></label>
                            </div>
                            <div className='item-label-input'>
                                <label className='label-nome-item'>Número do pedido</label>
                                <div className='input-select-container'>
                                    <input
                                        name="idPedido"
                                        className="form-control input-id" 
                                        {...register("idPedido")} 
                                        onBlur={buscaPedido}  
                                    />
                                </div>
                                <p className='item-error-message'>{errors.idPedido?.message}</p>
                            </div>

                            <div className='item-label-input'>
                                <label className='label-nome-produto'>Produto</label>
                                <div className='input-select-container'>
                                    <input 
                                        id='idProduto'
                                        name="idProduto"
                                        className="form-control input-id"
                                        {...register("idProduto")}
                                        onBlur={buscaProduto} 
                                        defaultValue={produtos[0].id}
                                    />
                                    <select 
                                        id='select_produto' 
                                        className="form-select select-produto"
                                        {...register("descricaoProduto")}
                                        onChange={(e) => {
                                            setValue("idProduto", e.currentTarget.value.split(',')[0])
                                            setValue("valor", e.currentTarget.value.split(',')[1])
                                        }}
                                    >
                                        {produtos.map((produto) => {
                                            return (
                                                <option value={[produto.id, produto.preco]} key={produto.id}>
                                                    {produto.descricao}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <p className='item-error-message'>{errors.idProduto?.message}</p>
                            </div>

                            <div className='item-label-input'>
                                <label className='label-nome-item'>Quantidade</label>
                                <input 
                                    id="quantidade"
                                    name="quantidade"
                                    className="form-control input-item" 
                                    {...register("quantidade")} 
                                    // onBlur={() => calculaValor(0)}
                                />
                                <p className='item-error-message'>{errors.quantidade?.message}</p>
                            </div>

                            <div className='item-label-input'>
                                <label className='label-nome-item'>Valor</label>
                                <input 
                                    // onChange={criaMascara}
                                    id="valor"
                                    name="valor"
                                    className="form-control input-item" 
                                    {...register("valor")} 
                                    disabled={true}
                                />
                                <p className='item-error-message'>{errors.valor?.message}</p>
                            </div>

                            <div className='item-label-input'>
                                <label className='label-nome-item'>Sequencia</label>
                                <input 
                                    id="sequencia"
                                    name="sequencia"
                                    className="form-control input-item" 
                                    {...register("sequencia")} 
                                />
                                <p className='item-error-message'>{errors.sequencia?.message}</p>
                            </div>
                        </div>

                        <div className='label-input-direita'>
                            <div className='resumo-pedido-container'>
                                <div className='resumo-pedido-scrollarea'>
                                    {
                                        pedidoItens.map((pedidoItem) => {
                                            return(
                                                <div key={pedidoItem.id}>
                                                    <h2 className='resumo-titulo'>Resumo do pedido</h2>
                                                    
                                                    <span className='resumo-item nome'>Nome</span>
                                                    <span className='resumo-info'>{pedidoItem.nomecliente}</span>
                                                    {
                                                        pedidoItem.itens.map((item) => {
                                                            return(
                                                                <div className='resumo-subinfo' key={item.id}>
                                                                    <div>
                                                                        <span className='resumo-item'>ID produto</span>
                                                                        <span className='resumo-info'>{item.idProduto}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className='resumo-item'>Descrição</span>
                                                                        <span className='resumo-info'>{item.produto.descricao} { item.quantidade && '(x'+item.quantidade+')'}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className='resumo-item'>Valor</span>
                                                                        <span className='resumo-info'>{item.valor}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className='resumo-item'>Observação</span>
                                                                        <span className='resumo-info'>{item.observacao}</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div className='item-label-input'>
                                <label className='label-nome-item'>Observação</label>
                                <input 
                                    id="observacao"
                                    className="form-control input-item input-obs" 
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className='item-botoes'>
                        <Button component={Button} type='submit' buttonSize='btn--medium' buttonStyle='btn--green'>INCLUIR ITEM</Button>
                        <Button component={Link} to='/realizar-pedido' buttonSize='btn--medium' buttonStyle='btn--blue'>VOLTAR</Button>
                        <Button component={Link} to='/home' buttonSize='btn--medium' buttonStyle='btn--red'>CANCELAR</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Itens
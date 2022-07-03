import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axios from 'axios'

import './Itens.scss'
import Button from '../../components/Button/Button'
import ModalScreen from '../../components/Modal/ModalScreen';
import { usePedido } from '../../contexts/pedidoContext';

function Itens() {
    const validationSchema = yup.object().shape({
        idPedido: yup
            .number("insira apenas números")
            .positive("insira um valor maior que 0")
            .integer("insira um valor inteiro")
            .typeError("valor inválido")
            .required("campo obrigatório"),
        idProduto: yup
            .string()
            .required("campo obrigatório"),
        quantidade: yup
            .number("insira apenas números")
            .positive("insira um valor maior que 0")
            .integer("insira um valor inteiro")
            .typeError("valor inválido")
            .required("campo obrigatório"),
        valor: yup
            .string()
            // .min(0, "valor negativo não permitido")
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
        reset
    } = useForm({
        resolver: yupResolver(validationSchema),  //aplica a validação do yup no formulário
    }) 
    
    const listaDeProdutosVazia = [{datahora: '', id: '', itens: [{datahora: '', id: '', idPedido: '', idProduto: '', observacao: '', produto:{descricao: '', id: '', preco: ''}, quantidade: '', sequencia: '', valor: ''}], nomeCliente: '', numeroFicha: ''}]
    const [modalShow, setModalShow] = useState({show: false, status: 'ok', message: ''})
    const [produtos, setProdutos] = useState([{id: '', nome: ''}])
    const [pedidoItens, setPedidoItens] = useState(listaDeProdutosVazia)
    const [valor, setValor] = useState()
    const { pedido } = usePedido()
    
    useEffect(() => {
        axios.get('/produtos')
        .then((res) => {
            setProdutos(res.data.data)
        })    
    }, [])


    const buscaProduto = async (e) => {
        const id = e.target.value

        if (id != ''){
            await axios.get(`/produtos/${id}`)
            .then((res) => {
                setProdutos(res.data.data)
            })
            .catch(() => {
                setModalShow({
                    show: true, 
                    status: 'error', 
                    message: 'Produto não encontrado'
                })
                 
                axios.get(`/produtos`)
                .then((res) => 
                    setProdutos(res.data.data)
                )
            })
        } else{
            await axios.get(`/produtos`)
            .then((res) => 
                setProdutos(res.data.data)
            )
        }
    }

    const defineIdProduto = (cargoId) => {
        const select = document.getElementById('select_produto')
        const idCargoSelecionado = select.options[select.selectedIndex].value
        
        const inputIdCargo = document.getElementById('idProduto')
        inputIdCargo.value = idCargoSelecionado
    }

    const buscaPedido = async (e) => {
        const id = e.target.value

        if (id != ''){
            await axios.get(`/pedidos/${id}`)
            .then((res) => {
                setPedidoItens(res.data.data)
            })
            .catch(() => {
                setPedidoItens(listaDeProdutosVazia)
            })
        } else{
            setPedidoItens(listaDeProdutosVazia)
        }
    }

    const incluirItem = async ({idPedido, idProduto, quantidade, valor, sequencia, observacao}) => {
        
        var data = new Date();
        const dataFormatada = `${data.getFullYear()}-${data.getMonth()}-${data.getDate()} ${data.getHours()+3}:${data.getMinutes()}:${data.getSeconds()}`
        
        await axios.put('/pedidos', {
            nomecliente: pedido.nomeCliente.normalize("NFD").replace(/[^a-zA-Zs]/g, "").toUpperCase(),
            numeroFicha: pedido.numeroFicha,
            datahora: dataFormatada,
            itens: [{
                idPedido,
                idProduto,
                quantidade,
                valor,
                sequencia,
                observacao,
                datahora: dataFormatada
            }]
        })
        .then(() => {
            setModalShow({
                show: true, 
                status: 'ok', 
                message: `Item incluído com sucesso`
            })
            reset()
        })
        .catch(() => {
            setModalShow({
                show: true, 
                status: 'error', 
                message: `Erro ao incluir item`
            })
        })
    }

    // const criaMascara = () => {
    //     let valorInput = document.getElementById('valor').value;
    //     // const mascara = valorInput.replace(/[^\d]/g, "").replace(/(\d{3})(\d{3})(\d{2})/, "$1.$2,$3");

    //     // document.getElementById('valor').value = parseFloat(valorInput).toFixed(2);

    //     setValor(valorInput.toLocaleString('pt-br', {minimumFractionDigits: 2}));
    // }

    return(
        <div className='item-container'>
             <ModalScreen
                show={modalShow.show} 
                status={modalShow.status}
                message={modalShow.message}
                onHide={() => setModalShow({show: false, status: modalShow.status, message: modalShow.message})}
            />
            <section className='header'>
                <div className='item-header'>
                    <div className='logo-restaurante'>
                        {/* <i class="fab fa-pagelines"></i> */}
                    </div>
                    <h1 className='item-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="item-body">
                <div className='item-description'>
                    <h3>INCLUIR ITEM</h3>
                    <span className='divider'></span>
                </div>

                <form className="form" onSubmit={handleSubmit(incluirItem)}>
                    <div className='label-inputs'>
                        <div className='label-input-esquerda'>
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
                                        // defaultValue={produtos[0].id}
                                    />
                                    <select 
                                        id='select_produto' 
                                        className="form-select select-produto"
                                        onChange={defineIdProduto}
                                    >
                                        {produtos.map((produto) => {
                                            return (
                                                <option 
                                                    value={produto.id} 
                                                    key={produto.id}
                                                >
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
                                />
                                <p className='item-error-message'>{errors.quantidade?.message}</p>
                            </div>

                            <div className='item-label-input'>
                                <label className='label-nome-item'>Valor unitário</label>
                                <input 
                                    // onChange={criaMascara}
                                    id="valor"
                                    name="valor"
                                    className="form-control input-item" 
                                    {...register("valor")} 
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
                                <label className='label-nome-item'>Observacao</label>
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
                        <Button component={Link} to='/' buttonSize='btn--medium' buttonStyle='btn--red'>CANCELAR</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Itens
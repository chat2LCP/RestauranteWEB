import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axios from 'axios'

import './Itens.scss'
import Button from '../../components/Button/Button'
import ModalScreen from '../../components/Modal/ModalScreen';

function Itens() {
    const validationSchema = yup.object().shape({
        pedido: yup
            .number("insira apenas números")
            .positive("insira um valor maior que 0")
            .integer("insira um valor inteiro")
            .typeError("valor inválido")
            .required("campo obrigatório"),
        id_produto: yup
            .string()
            .required("campo obrigatório"),
        qtd: yup
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
        obs: yup
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
    const [produtos, setProdutos] = useState([{id: '', nome: ''}])
    const [valor, setValor] = useState()
    
    useEffect(() => {
        axios.get('/produtos')
        .then((res) => {
            setProdutos(res.data.data)
        })    
    }, [])


    const buscaProduto = async () => {
        const id = document.getElementById('idProduto').value;

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

    const incluirItem = (data) => {
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    }

    const criaMascara = () => {
        let valorInput = document.getElementById('valor').value;
        // const mascara = valorInput.replace(/[^\d]/g, "").replace(/(\d{3})(\d{3})(\d{2})/, "$1.$2,$3");

        // document.getElementById('valor').value = parseFloat(valorInput).toFixed(2);

        setValor(valorInput.toLocaleString('pt-br', {minimumFractionDigits: 2}));
    }

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
                        <i class="fab fa-pagelines"></i>
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
                                <input 
                                    id="pedido"
                                    name="pedido"
                                    className="form-control input-item" 
                                    {...register("pedido")} 
                                />
                                <p className='item-error-message'>{errors.pedido?.message}</p>
                            </div>

                            <div className='item-label-input'>
                                <div className='item-label-input'>
                                    <label className='label-nome-item'>Produto</label>
                                    <div className='input-select-container'>
                                        <input id='idProduto' onBlur={buscaProduto} placeholder='id' className='input-id form-control' />
                                        <select
                                            id="id_produto"
                                            name="id_produto"
                                            className="form-control form-select input-item"  //form-control e form-select são classes do bootstrap
                                            {...register("produto")}
                                        >
                                            {produtos.map(produto => {
                                                return (
                                                    <option key={produto.id}>{produto.descricao}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <p className='item-error-message'>{errors.id_produto?.message}</p>
                                </div>
                            </div>

                            <div className='item-label-input'>
                                <label className='label-nome-item'>Quantidade</label>
                                <input 
                                    id="qtd"
                                    name="qtd"
                                    className="form-control input-item" 
                                    {...register("qtd")} 
                                />
                                <p className='item-error-message'>{errors.qtd?.message}</p>
                            </div>
                        </div>

                        <div className='label-input-direita'>
                            <div className='item-label-input'>
                                <label className='label-nome-item'>Valor</label>
                                <input 
                                    onChange={criaMascara}
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

                            <div className='item-label-input'>
                                <label className='label-nome-item'>Observacao</label>
                                <input 
                                    id="obs"
                                    name="obs"
                                    className="form-control input-item" 
                                    {...register("obs")} 
                                />
                                <p className='item-error-message'>{errors.obs?.message}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className='item-botoes'>
                        <Button component={Button} type='submit' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRAR</Button>
                        <Button component={Link} to='/realizar-pedido' buttonSize='btn--medium' buttonStyle='btn--blue'>VOLTAR</Button>
                        <Button component={Link} to='/' buttonSize='btn--medium' buttonStyle='btn--red'>CANCELAR</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Itens
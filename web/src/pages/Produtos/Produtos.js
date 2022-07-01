import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axios from 'axios';

import './Produtos.scss'
import Button from '../../components/Button/Button'
import ModalScreen from '../../components/Modal/ModalScreen';

function Produtos() {
    const validationSchema = yup.object().shape({
        descricao: yup
            .string()
            .required("campo obrigatório"),
        preco: yup
            .number("insira apenas números")
            .positive("insira um valor maior que 0")
            .integer("insira um valor inteiro")
            .typeError("valor inválido")
            .required("campo obrigatório"),
        tempopreparo: yup
            .string()
            .required("campo obrigatório"),
        id_categoria: yup
            .string()
            .required("campo obrigatório"),
        id_setor: yup
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
    const [categorias, setCategorias] = useState([])
    const [setores, setSetores] = useState([])

    useEffect(() => {
        axios.get('/categorias')
        .then((res) => {
            setCategorias(res.data.data)
        })

        axios.get('/setores')
        .then((res) => {
            setSetores(res.data.data)
        })
    }, [])

    const cadastrarProduto = async (data) => {
        await axios.put('/produtos', {
            descricao: data.descricao.normalize("NFD").replace(/[^a-zA-Zs]/g, "").toUpperCase(),
            preco: data.preco,
            ativo: data.ativo,
            id_categoria: data.id_categoria,
            id_setor: data.id_setor,
            tempopreparo: data.tempopreparo
        })
        .then(() => {
            setModalShow({
                show: true, 
                status: 'ok', 
                message: `Produto salvo com sucesso`
            })
            reset()
        })
        .catch(() => {
            setModalShow({
                show: true, 
                status: 'error', 
                message: `Erro ao salvar produto`
            })
        })
    }

    const buscaSetor = async () => {
        const idSet = document.getElementById('idSetor').value;

        await axios.get(`/setores/${idSet}`)
        .then((res) => {
            setSetores(res.data.data)
        })
        .catch(() => {
            setModalShow({
                show: true, 
                status: 'error', 
                message: 'Setor não encontrado'
            })
             
            axios.get(`/setores`)
            .then((res) => 
                setSetores(res.data.data)
            )    
        })
    }

    const buscaCategoria = async () => {
        const idCateg = document.getElementById('idCategoria').value;

        await axios.get(`/categorias/${idCateg}`)
        .then((res) => {
            setCategorias(res.data.data)
        })
        .catch(() => {
            setModalShow({
                show: true, 
                status: 'error', 
                message: 'Categoria não encontrada'
            })

            axios.get(`/categorias`)
            .then((res) => 
                setCategorias(res.data.data)
            )    
        })
    }

    return(
        <div className='produto-container'>
            <ModalScreen 
                show={modalShow.show} 
                status={modalShow.status}
                message={modalShow.message}
                onHide={() => setModalShow({show: false, status: modalShow.status, message: modalShow.message})}
            />
            <section className='header'>
                <div className='produto-header'>
                    <div className='logo-restaurante'>
                        <i class="fab fa-pagelines"></i>
                    </div>
                    <h1 className='produto-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="produto-body">
                <div className='produto-description'>
                    <h3>CADASTRO DE PRODUTOS</h3>
                    <span className='divider'></span>
                </div>
                
                <form className="form" onSubmit={handleSubmit(cadastrarProduto)}>
                    <div className='label-inputs'>
                        <div className='label-input-esquerda'>
                            <div className='produto-label-input'>
                                <label className='label-nome-produto'>Descrição</label>
                                <input 
                                    id="descricao"
                                    name="descricao"
                                    className="form-control input-produto" 
                                    {...register("descricao")} 
                                />
                                <p className='produto-error-message'>{errors.descricao?.message}</p>
                            </div>

                            <div className='produto-label-input'>
                                <label className='label-nome-produto'>Preço</label>
                                <input 
                                    id="preco"
                                    name="preco"
                                    className="form-control input-produto" 
                                    {...register("preco")} 
                                />
                                <p className='produto-error-message'>{errors.preco?.message}</p>
                            </div>
                            

                            <div className='produto-label-input'>
                                <label className='label-nome-produto'>Tempo de preparo</label>
                                <input 
                                    id="tempopreparo"
                                    name="tempopreparo"
                                    className="form-control input-produto" 
                                    {...register("tempopreparo")} 
                                />
                                <p className='produto-error-message'>{errors.tempopreparo?.message}</p>
                            </div>
                        </div>

                        <div className='label-input-direita'>
                            <div className='produto-label-input'>
                                <label className='label-nome-produto'>Categoria</label>
                                <div className='input-select-container'>
                                    <input id='idCategoria' onBlur={buscaCategoria} placeholder='id' className='input-id form-control' />
                                    <select
                                        id="categ"
                                        name="categ"
                                        className="form-control form-select input-produto"  //form-control e form-select são classes do bootstrap
                                        {...register("id_categoria")}
                                        >
                                        {categorias.map(({id, descricao}) => {
                                            return (
                                                <option key={id}>{descricao}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <p className='produto-error-message'>{errors.categoria?.message}</p>
                            </div>

                            <div className='produto-label-input'>
                                <label className='label-nome-produto'>Setor</label>
                                <div className='input-select-container'>
                                    <input id='idSetor' onBlur={buscaSetor} placeholder='id' className='input-id form-control' />
                                    <select
                                        id="setor"
                                        name="setor"
                                        className="form-control form-select input-produto"  //form-control e form-select são classes do bootstrap
                                        {...register("id_setor")}
                                    >
                                        {setores.map(({id, descricao}) => {
                                            return (
                                                <option key={id}>{descricao}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <p className='produto-error-message'>{errors.setor?.message}</p>
                            </div>

                            <div className='produto-label-input'>
                                <label className='label-nome-produto'>Ativo</label>
                                <div className='produto-radiobutton'>
                                    <input 
                                        type="radio"
                                        value={true}
                                        name="ativo" 
                                        defaultChecked={true} 
                                        {...register("ativo")}
                                    /><span>Sim</span>
                                    <input 
                                        type="radio" 
                                        value={false} 
                                        name="ativo" 
                                        {...register("ativo")}
                                    /><span>Não</span>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div className='produto-botoes'>
                        <Button component={Button} type="submit" buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRAR</Button>
                        <Button component={Link} to='/' buttonSize='btn--medium' buttonStyle='btn--red'>CANCELAR</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Produtos
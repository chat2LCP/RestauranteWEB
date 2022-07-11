import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axios from 'axios';
import { Apple } from 'react-bootstrap-icons'

import './Produtos.scss'
import Button from '../../components/Button/Button'
import ModalScreen from '../../components/Modal/ModalScreen';
import SpinnerScreen from '../../components/Spinner/SpinnerScreen';

function Produtos() {
    const validationSchema = yup.object().shape({
        descricao: yup
            .string()
            .required("campo obrigatório"),
        preco: yup
            .number("insira apenas números")
            .positive("insira um valor maior que 0")
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
        reset,
        setValue,
        getValues
    } = useForm({
        resolver: yupResolver(validationSchema),  //aplica a validação do yup no formulário
    }) 

    const [modalShow, setModalShow] = useState({show: false, status: 'ok', message: ''})
    const [categorias, setCategorias] = useState([{id: 0, descricao: ''}])
    const [setores, setSetores] = useState([{id: 0, descricao: ''}])
    const [listaProdutos, setListaProdutos] = useState([{id: 0, preco: 0, descricao: '', tempopreparo: 0, categoria: 0, ativo: 0, idSetor: 0}])
    const [showSpinner, setShowSpinner] = useState(false)
    const AuthStr = 'Bearer '.concat(localStorage.getItem("access_token"));

    const atualizaListaDeCategorias = () => {
        axios.get(`${process.env.REACT_APP_URL_BASE}/categorias`, {
            headers: {
                Authorization: AuthStr
            }
        })
        .then((res) => {
            setCategorias(res.data.data)
        })
    }

    const atualizaListaDeSetores = () => {
        axios.get(`${process.env.REACT_APP_URL_BASE}/setores`, {
            headers: {
                Authorization: AuthStr
            }
        })
        .then((res) => {
            setSetores(res.data.data)
        })
    }

    const atualizaListaDeProdutos = () => {
        axios.get(`${process.env.REACT_APP_URL_BASE}/produtos`, {
            headers: {
                Authorization: AuthStr
            }
        })
        .then((res) => {
            setListaProdutos(res.data.data)
        })    
    }

    useEffect(() => {
        atualizaListaDeCategorias()
        atualizaListaDeSetores()
        atualizaListaDeProdutos()
    }, [])

    const cadastrarProduto = async (data) => {
        try{
            setShowSpinner(true)

            const options = {
                method: 'PUT',
                url: `${process.env.REACT_APP_URL_BASE}/produtos`,
                headers: {
                    Authorization: AuthStr
                },
                data: {
                    descricao: data.descricao.normalize("NFD").replace(/[^a-zA-Zs ]/g, "").toUpperCase(),
                    preco: data.preco,
                    ativo: data.ativo,
                    idCategoria: data.id_categoria,
                    idSetor: data.id_setor,
                    tempopreparo: data.tempopreparo
                }
            };
    
            axios.request(options)
            .then(() => {
                setModalShow({
                    show: true, 
                    status: 'ok', 
                    message: `Produto salvo com sucesso`
                })
                atualizaListaDeProdutos()
                reset()
            })
            .catch(() => {
                setModalShow({
                    show: true, 
                    status: 'error', 
                    message: `Erro ao salvar produto`
                })
            })      
        }finally{
            setShowSpinner(false)
        }
    }

    const buscaSetor = async (e ) => {
        const idSet = e.target.value

        await axios.get(`${process.env.REACT_APP_URL_BASE}/setores/${idSet}`, {
            headers: {
                Authorization: AuthStr
            }
        })
        .then((res) => {
            setSetores(res.data.data)
        })
        .catch(() => {
            setModalShow({
                show: true, 
                status: 'error', 
                message: 'Setor não encontrado'
            })
             
            axios.get(`${process.env.REACT_APP_URL_BASE}/setores`, {
                headers: {
                    Authorization: AuthStr
                }
            })
            .then((res) => 
                setSetores(res.data.data)
            )    

            const descricao = getValues("descricaoSetor")
            setValue("id_setor", descricao)
        })
    }

    const buscaCategoria = async (e ) => {
        const idCateg = e.target.value

        await axios.get(`${process.env.REACT_APP_URL_BASE}/categorias/${idCateg}`, {
            headers: {
                Authorization: AuthStr
            }
        })
        .then((res) => {
            setCategorias(res.data.data)
        })
        .catch(() => {
            setModalShow({
                show: true, 
                status: 'error', 
                message: 'Categoria não encontrada'
            })

            axios.get(`${process.env.REACT_APP_URL_BASE}/categorias`, {
                headers: {
                    Authorization: AuthStr
                }
            })
            .then((res) => 
                setCategorias(res.data.data)
            )
            
            const descricao = getValues("descricaoCategoria")
            setValue("id_categoria", descricao)
        })
    }

    return(
        <div className='produto-container'>
            <SpinnerScreen show={showSpinner} />
            <ModalScreen 
                show={modalShow.show} 
                status={modalShow.status}
                message={modalShow.message}
                onHide={() => setModalShow({show: false, status: modalShow.status, message: modalShow.message})}
            />
            <section className='header'>
                <div className='produto-header'>
                    <Apple size={92} color='#fefefe'></Apple>
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

                            <div className='produto-label-input'>
                                <label className='label-nome-produto'>Categoria</label>
                                <div className='input-select-container'>
                                    <input 
                                        id='id_categoria' 
                                        name='id_categoria'
                                        className='input-id form-control' 
                                        {...register("id_categoria")}
                                        onBlur={buscaCategoria} 
                                        defaultValue={categorias[0].id}
                                    />
                                    <select
                                        id="select_categoria"
                                        className="form-control form-select selects" 
                                        {...register("descricaoCategoria")}
                                        onChange={(e) => setValue("id_categoria", e.currentTarget.value)} 
                                    >
                                        {categorias.map((categoria) => {
                                            return (
                                                <option value={categoria.id} key={categoria.id}>{categoria.descricao}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <p className='produto-error-message'>{errors.id_categoria?.message}</p>
                            </div>

                            <div className='produto-label-input'>
                                <label className='label-nome-produto'>Setor</label>
                                <div className='input-select-container'>
                                    <input 
                                        id='id_setor' 
                                        name='id_setor'
                                        className='input-id form-control' 
                                        {...register("id_setor")}
                                        onBlur={buscaSetor} 
                                        defaultValue={setores[0].id}
                                    />
                                    <select
                                        id="select_setor"
                                        className="form-control form-select selects"
                                        {...register("descricaoSetor")}
                                        onChange={(e) => setValue("id_setor", e.currentTarget.value)}
                                    >
                                        {setores.map((setor) => {
                                            return (
                                                <option value={setor.id} key={setor.id}>{setor.descricao}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <p className='produto-error-message'>{errors.id_setor?.message}</p>
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

                        <div className='label-input-direita'>
                        <div className='resumo-produto-container'>
                                <div className='resumo-produto-scrollarea'>
                                    <h2 className='resumo-titulo'>Produtos Cadastrados</h2>
                                    {
                                        listaProdutos.map((produto) => {
                                            return(
                                                <div key={produto.id}>
                                                    <div className='resumo-container'>
                                                        <span className='resumo-info'>{produto.id} - {produto.descricao}</span>
                                                        <span className='resumo-item'>Preço</span>
                                                        <span className='resumo-subitem'>{produto.preco}</span>
                                                        <span className='resumo-item'>Tempo de preparo</span>
                                                        <span className='resumo-subitem'>{produto.tempopreparo}</span>
                                                        <span className='resumo-item'>Categoria</span>
                                                        <span className='resumo-subitem'>{produto.idCategoria}</span>
                                                        <span className='resumo-item'>Setor</span>
                                                        <span className='resumo-subitem'>{produto.idSetor}</span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div className='produto-botoes'>
                        <Button component={Button} type="submit" buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRAR</Button>
                        <Button component={Link} to='/home' buttonSize='btn--medium' buttonStyle='btn--red'>VOLTAR</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Produtos
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axios from 'axios';
import { Apple } from 'react-bootstrap-icons';

import './Categorias.scss'
import Button from '../../components/Button/Button'
import ModalScreen from '../../components/Modal/ModalScreen';
import SpinnerScreen from '../../components/Spinner/SpinnerScreen';

function Categorias() {
    
    const validationSchema = yup.object().shape({
        descricao: yup
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
    const [showSpinner, setShowSpinner] = useState(false)
    const [listaCategorias, setListaCategorias] = useState([{id: 0, descricao: ''}])
    const AuthStr = 'Bearer '.concat(localStorage.getItem("access_token"));

    const atualizaListaDeCategorias = () => {
        axios.get(`${process.env.REACT_APP_URL_BASE}/categorias`, {
            headers: {
                Authorization: AuthStr
            },
        })
        .then((res) => {
            setListaCategorias(res.data.data)
        }) 
    }

    useEffect(() => {
        atualizaListaDeCategorias()
    }, [])

    const cadastrarCategoria = async ({descricao}) => {
        try{
            setShowSpinner(true)

            const options = {
                method: 'PUT',
                url: `${process.env.REACT_APP_URL_BASE}/categorias`,
                headers: {
                    Authorization: AuthStr
                },
                data: {
                    descricao: descricao.normalize("NFD").replace(/[^a-zA-Zs ]/g, "").toUpperCase()
                }
            };
    
            axios.request(options)
            .then(() => {
                setModalShow({
                    show: true, 
                    status: 'ok', 
                    message: 'Categoria salva com sucesso'
                })
                atualizaListaDeCategorias()
                reset()
            })         
            .catch(() => {
               setModalShow({
                    show: true, 
                    status: 'error', 
                    message: `Erro ao salvar categoria`
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
                    <h3>CADASTRO DE CATEGORIA</h3>
                    <span className='divider'></span>
                </div>

                <form className="form" onSubmit={handleSubmit(cadastrarCategoria)}>
                    <div className='label-inputs'>
                        <div className='label-input-esquerda'>
                            <div className='categoria-label-input'>
                                <label className='label-nome-cargo'>Nome da categoria</label>
                                <input 
                                    id="descricao"
                                    name="descricao"
                                    className="form-control input-categoria" 
                                    {...register("descricao")} 
                                />
                                <p className='categoria-error-message'>{errors.descricao?.message}</p>
                            </div>
                        </div>

                        <div className='label-input-direita'>
                            <div className='resumo-categoria-container'>
                                <div className='resumo-categoria-scrollarea'>
                                    <h2 className='resumo-titulo'>Categorias cadastrados</h2>
                                    {
                                        listaCategorias.map((categoria) => {
                                            return(
                                                <div key={categoria.id}>
                                                    <span className='resumo-info'>{categoria.id} - {categoria.descricao}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='categoria-botoes'>
                        <Button component={Button} type='submit' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRAR</Button>
                        <Button component={Link} to='/home' buttonSize='btn--medium' buttonStyle='btn--red'>CANCELAR</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Categorias
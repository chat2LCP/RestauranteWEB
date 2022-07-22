import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axios from 'axios';
import { Apple } from 'react-bootstrap-icons';

import './Setores.scss'
import Button from '../../components/Button/Button'
import ModalScreen from '../../components/Modal/ModalScreen';
import SpinnerScreen from '../../components/Spinner/SpinnerScreen';

function Setores() {
    const [modalShow, setModalShow] = useState({show: false, status: 'ok', message: ''})
    const [showSpinner, setShowSpinner] = useState(false)

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

    const [listaSetores, setListaSetores] = useState([{id: 0, descricao: ''}])
    const AuthStr = 'Bearer '.concat(localStorage.getItem("access_token"))

    const atualizaListaDeSetores = () => {
        axios.get(`${process.env.REACT_APP_URL_BASE}/setores`, {
            headers: {
                Authorization: AuthStr
            }
        })
        .then((res) => {
            setListaSetores(res.data.data)
        }) 
    }

    const location = useLocation()

    useEffect(() => {
        atualizaListaDeSetores()
    }, [])

    const cadastrarSetor = async ({descricao}) => {
        try{
            setShowSpinner(true)

            const options = {
                method: 'PUT',
                url: `${process.env.REACT_APP_URL_BASE}/setores`,
                headers: {
                    Authorization: AuthStr
                },
                data: {
                    descricao: descricao.normalize("NFD").replace(/[^a-zA-Zs ]/g, "").toUpperCase(),
                }
            };
    
            axios.request(options)
            .then(() => { 
                setModalShow({
                    show: true, 
                    status: 'ok', 
                    message: 'Setor salvo com sucesso!'
                })
                atualizaListaDeSetores()
                reset()
            })         
            .catch(() => {
            setModalShow({
                    show: true, 
                    status: 'error', 
                    message: `Erro ao salvar setor`
                })
            })
        }finally{
            setShowSpinner(false)
        }
    }

    return(
        <div className='setor-container'>
            <SpinnerScreen show={showSpinner} />
            <ModalScreen 
                show={modalShow.show} 
                status={modalShow.status}
                message={modalShow.message}
                onHide={() => setModalShow({show: false, status: modalShow.status, message: modalShow.message})}
            />
            <section className='header'>
                <div className='setor-header'>
                    <Apple size={92} color='#fefefe'></Apple>
                    <h1 className='setor-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="setor-body">
                <div className='setor-description'>
                    <h3>CADASTRO DE SETOR</h3>
                    <span className='divider'></span>
                </div>

                <form className="form" onSubmit={handleSubmit(cadastrarSetor)}>
                    <div className='label-inputs'>
                        <div className='label-input-esquerda'>
                            <div className='setor-label-input'>
                                <label className='label-nome-setor'>Nome do setor</label>
                                <input 
                                    id="descricao"
                                    name="descricao"
                                    className="form-control input-setor" 
                                    defaultValue={(location.state === null ? "" : location.state.nome)}
                                    {...register("descricao")} 
                                />
                                <p className='setores-error-message'>{errors.descricao?.message}</p>
                            </div>
                        </div>

                        <div className='label-input-direita'>
                            <div className='resumo-setor-container'>
                                <div className='resumo-setor-scrollarea'>
                                    <h2 className='resumo-titulo'>Setores cadastrados</h2>
                                    {
                                        listaSetores.map((setor) => {
                                            return(
                                                <div key={setor.id}>
                                                    <span className='resumo-info'>{setor.id} - {setor.descricao}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='setor-botoes'>
                        <Button component={Button} type='submit' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRAR</Button>
                        <Button component={Link} to='/Home' buttonSize='btn--medium' buttonStyle='btn--red'>VOLTAR</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Setores
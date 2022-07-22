import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axios from 'axios';
import { Apple } from 'react-bootstrap-icons';

import './Impressoras.scss'
import Button from '../../components/Button/Button'
import ModalScreen from '../../components/Modal/ModalScreen';
import SpinnerScreen from '../../components/Spinner/SpinnerScreen';

function Impressoras() {
    const validationSchema = yup.object().shape({
        id: yup
            .string()
            .required("campo obrigatório"),
        descricao: yup
            .string()
            .required("campo obrigatório"),
        ip: yup
            .string()
            .required("campo obrigatório"),
        porta: yup
            .string()
            .required("campo obrigatório"),
        idSetor: yup
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
    const [showSpinner, setShowSpinner] = useState(false)
    const [listaImpressora, setListaImpressora] = useState([{id: 0, descricao: ''}])
    const [impressoras, setImpressoras] = useState([{id: 0, descricao: '', ip: '', porta: '', idSetor: 0}])
    const [setores, setSetores] = useState([{id: 0, descricao: ''}])
    const AuthStr = 'Bearer '.concat(localStorage.getItem("access_token"))

    const atualizaListaDeImpressoras = () => {
        axios.get(`${process.env.REACT_APP_URL_BASE}/impressoras`, {
            headers: {
                Authorization: AuthStr
            }
        })
        .then((res) => {
            setListaImpressora(res.data.data)
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

            setValue("idSetor", res.data.data[0].id)
        })
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

            const idDescricao = getValues("descricaoSetor")
            setValue("idSetor", idDescricao)
        })
    }

    const location = useLocation();

    useEffect(() => {
        atualizaListaDeImpressoras()
        atualizaListaDeSetores()
    }, [])

    const cadastrarImpressora = async ({id, descricao, ip, porta, idSetor}) => {
        try{
            setShowSpinner(true)

            console.log(descricao)
            console.log(ip)
            console.log(porta)
            console.log(idSetor)

            const options = {
                method: 'PUT',
                url: `${process.env.REACT_APP_URL_BASE}/impressoras`,
                headers: {
                    Authorization: AuthStr
                },
                data: {
                    id,
                    descricao: descricao.toUpperCase(),
                    ip,
                    porta,
                    idSetor
                }
            };
    
            axios.request(options)
            .then(() => { 
                setModalShow({
                    show: true, 
                    status: 'ok', 
                    message: 'Impressora salva com sucesso!'
                })
                atualizaListaDeImpressoras()
                reset()
                setValue("idSetor", setores[0].id)
            })         
            .catch(() => {
            setModalShow({
                    show: true, 
                    status: 'error', 
                    message: `Erro ao salvar impressora`
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
                <div className='impressora-header'>
                    <Apple size={92} color='#fefefe'></Apple>
                    <h1 className='impressora-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="impressora-body">
                <div className='impressora-description'>
                    <h3>CADASTRO DE IMPRESSORA</h3>
                    <span className='divider'></span>
                </div>

                <form className="form" onSubmit={handleSubmit(cadastrarImpressora)}>
                    <div className='label-inputs'>
                        <div className='label-input-esquerda'>
                            <div className='impressora-label-input'>
                                <label className='label-nome-impressora'>ID da impressora</label>
                                <input 
                                    id="id"
                                    name="id"
                                    className="form-control input-impressora impressora" 
                                    defaultValue={(location.state === null ? "" : location.state.id)}
                                    {...register("id")} 
                                    // onBlur={buscaFicha}
                                    />
                                <p className='item-error-message'>{errors.id?.message}</p>
                            </div>

                            <div className='impressora-label-input'>
                                <label className='label-nome-impressora'>Nome da impressora</label>
                                <input 
                                    id="descricao"
                                    name="descricao"
                                    className="form-control input-impressora" 
                                    defaultValue={(location.state === null ? "" : location.state.nome)}
                                    {...register("descricao")} 
                                />
                                <p className='impressoras-error-message'>{errors.descricao?.message}</p>
                            </div>
                            <div className='impressora-label-input ip-porta'>
                                <div className='ip-contaner'>
                                    <label className='label-nome-impressora'>IP</label>
                                    <input 
                                        id="ip"
                                        name="ip"
                                        className="form-control input-ip" 
                                        defaultValue={(location.state === null ? "" : location.state.ip)}
                                        {...register("ip")} 
                                    />
                                    <p className='impressoras-error-message'>{errors.ip?.message}</p>
                                </div>
                                <div className='porta-container'>
                                    <label className='label-nome-impressora'>Porta</label>
                                    <input 
                                        id="porta"
                                        name="porta"
                                        className="form-control input-porta" 
                                        defaultValue={(location.state === null ? "" : location.state.porta)}
                                        {...register("porta")} 
                                    />
                                    <p className='impressoras-error-message'>{errors.porta?.message}</p>
                                </div>
                            </div>

                            <div className='produto-label-input'>
                                <label className='label-nome-produto'>Setor</label>
                                <div className='input-select-container'>
                                    <input 
                                        id='idSetor' 
                                        name='idSetor'
                                        className='input-id form-control' 
                                        {...register("idSetor")}
                                        onBlur={buscaSetor} 
                                        defaultValue={impressoras[0].id}
                                    />
                                    <select
                                        id="select_setor"
                                        className="form-control form-select selects"
                                        {...register("descricaoSetor")}
                                        onChange={(e) => setValue("idSetor", e.currentTarget.value)}
                                    >
                                        {setores.map((setor) => {
                                            return (
                                                <option value={setor.id} key={setor.id}>{setor.descricao}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <p className='produto-error-message'>{errors.idSetor?.message}</p>
                            </div>
                        </div>

                        <div className='label-input-direita'>
                            <div className='resumo-impressora-container'>
                                <div className='resumo-impressora-scrollarea'>
                                    <h2 className='resumo-titulo'>Impressoras cadastrados</h2>
                                    {
                                        listaImpressora.map((impressora) => {
                                            return(
                                                <div className='impressora-info-container' key={impressora.id}>
                                                    <span className='resumo-item'>{impressora.id}</span>
                                                    <span className='resumo-info'><span className='info-title'>Nome:</span>{impressora.descricao}</span>
                                                    <span className='resumo-info'><span className='info-title'>IP:</span>{impressora.ip}</span>
                                                    <span className='resumo-info'><span className='info-title'>Porta:</span>{impressora.porta}</span>
                                                    <span className='resumo-info'><span className='info-title'>Setor:</span>{impressora.idSetor}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='impressora-botoes'>
                        <Button component={Button} type='submit' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRAR</Button>
                        <Button component={Link} to='/Home' buttonSize='btn--medium' buttonStyle='btn--red'>VOLTAR</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Impressoras
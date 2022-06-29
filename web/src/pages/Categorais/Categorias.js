import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axios from 'axios';

import './Categorias.scss'
import Button from '../../components/Button/Button'
import ModalScreen from '../../components/Modal/ModalScreen';

function Categorias() {
    const [modalShow, setModalShow] = useState({show: false, status: 'ok', message: ''})

    const validationSchema = yup.object().shape({
        descricao: yup
            .string()
            .required("campo obrigatório"),
    })

    const { 
        register,
        handleSubmit,
        formState,
        formState: {errors},
        reset
    } = useForm({
        defaultValues: {
            descricao: ''
        },
        resolver: yupResolver(validationSchema),  //aplica a validação do yup no formulário
    }) 

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
          reset({ 
            descricao: '' 
          })
        }
      }, [formState, reset]);

    const cadastrarCategoria = async ({descricao}) => {
        await axios.put('/categorias', {
            descricao
        })
        .then(() => {
            setModalShow({
                show: true, 
                status: 'ok', 
                message: 'Categoria salva com sucesso!'
            })
            // document.getElementById('descricao').value = ' '
        })         
        .catch(() => {
           setModalShow({
                show: true, 
                status: 'error', 
                message: `Erro ao salvar categoria`
            })
        })
    }

    return(
        <div className='categoria-container'>
            <ModalScreen 
                show={modalShow.show} 
                status={modalShow.status}
                message={modalShow.message}
                onHide={() => setModalShow({show: false, status: modalShow.status, message: modalShow.message})}
            />
            <section className='header'>
                <div className='categoria-header'>
                    <div className='logo-restaurante'>
                        <i class="fab fa-pagelines"></i>
                    </div>
                    <h1 className='categoria-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="categoria-body">
                <div className='categoria-description'>
                    <h3>CADASTRO DE CATEGORIA</h3>
                    <span className='divider'></span>
                </div>

                <form className="form" onSubmit={handleSubmit(cadastrarCategoria)}>
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

                    <div className='categoria-botoes'>
                        <Button component={Button} type='submit' buttonSize='btn--medium' buttonStyle='btn--green'>CADASTRAR</Button>
                        <Button component={Link} to='/' buttonSize='btn--medium' buttonStyle='btn--red'>CANCELAR</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Categorias
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { Apple } from 'react-bootstrap-icons';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Button from '../../components/Button/Button'
import './SignIn.scss'
import qs from 'qs'
import ModalScreen from '../../components/Modal/ModalScreen';


const SignIn = () => {    
    const navigate = useNavigate();
    
    const validationSchema = yup.object().shape({
        usuario: yup
            .string()
            .required("Campo obrigatório"),
        senha: yup
            .string()
            .required("Campo obrigatório"),
    })

    const { 
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(validationSchema),
    })    

    const [modalShow, setModalShow] = useState({show: false, status: 'ok', message: ''})
    
    const handleLogin = async ({usuario, senha}) => {        
        const options = {
            method: 'POST',
            url: `${process.env.REACT_APP_URL_BASE}/oauth/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic YXBpOnNlY3JldA==',
                'Access-Control-Allow-Origin' : '*',
            },
            data: qs.stringify({
                username: usuario, 
                password: senha, 
                "grant_type": "password"
            })
        };

        axios.request(options)
        .then((res) =>{
            localStorage.setItem("access_token", res.data.access_token)
            navigate('/Home')
        })
        .catch((error) => {
            setModalShow({
                show: true, 
                status: 'error', 
                message: 'Usuário/Senha incorretos'
            })
        })
    }

    return (
        <div className='sign-in-container'>
             <ModalScreen
                show={modalShow.show} 
                status={modalShow.status}
                message={modalShow.message}
                onHide={() => setModalShow({show: false, status: modalShow.status, message: modalShow.message})}
            />

            <section className='header'>
                <div className='sign-header'>
                    <Apple size={92} color='#fefefe'></Apple>
                    <h1 className='sign-in'>DRestaurante</h1>
                </div>
            </section>

            <section className="login-container">               
                <form className="form login-card-data" onSubmit={handleSubmit(handleLogin)}>               
                    <div className="user">
                        <label className='label-email' htmlFor="usuario">Usuário</label>
                        <input 
                            id="usuario"
                            name="usuario"
                            className="form-control" 
                            {...register("usuario")} 
                        />
                        <p className='signin-error-message'>{errors.usuario?.message}</p>
                    </div>
            
                    <div className="password">
                        <label htmlFor="senha">Senha</label>       
                        <div className="input-password-eye">
                            <input 
                                type="password" 
                                className="form-control" 
                                {...register("senha")}
                                name="senha" 
                                id="senha" 
                            />
                            {/* colocar o olhinho da senha */}
                            <p className='signin-error-message'>{errors.senha?.message}</p>
                        </div>
                    </div>
                    
                    <div className='btn'>
                        <Button type="submit" buttonStyle='btn--login'>LOGIN</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default SignIn
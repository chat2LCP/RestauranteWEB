import React from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { Apple } from 'react-bootstrap-icons';
import axios from 'axios';

import Button from '../../components/Button/Button'
import './SignIn.scss'

const SignIn = () => {    

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
        defaultValues: {
            usuario: "",
            senha: ""
        },
        resolver: yupResolver(validationSchema),  //aplica a validação do yup no formulário
    })    
    
    const handleLogin = async ({usuario, senha}) => {
        const options = {
            method: 'PUT',
            url: `${process.env.REACT_APP_URL_BASE}/oauth/token`,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: 'Basic YXBpOnNlY3JldA=='
            },
            data: {
                username: usuario, 
                password: senha, 
                grant_type: 'password'
            }
        };

        axios.request(options)
        .then((response) =>
            console.log(response.data)
        )
        .catch((error) =>
            console.error(error)
        )
    }

    return (
        <div className='sign-in-container'>
            <section className='header'>
                <div className='sign-header'>
                    <Apple size={92} color='#fefefe'></Apple>
                    <h1 className='sign-in'>DRestaurante</h1>
                </div>
            </section>

            <section className="login-container">               
                <form className="form login-card-data" onSubmit={handleSubmit(handleLogin)}>               
                    <div className="user">
                        <label className='label-email' htmlFor="usuario">Email</label>
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
                    
                    <Button type="submit" buttonStyle='btn--login'>LOGIN</Button>
                </form>
            </section>
        </div>
    )
}

export default SignIn
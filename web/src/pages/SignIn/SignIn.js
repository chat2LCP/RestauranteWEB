import React from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { Apple } from 'react-bootstrap-icons';

import Button from '../../components/Button/Button'
import './SignIn.scss'
import axios from 'axios';
import Home from '../Home/Home';

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
        await axios.get('/funcionarios', {
            url: 'http://10.0.0.104:8080/oauth/token',
            auth: { 
                username: "api", 
                password: "secret"
            },
            data: {
                "grant_type": 'resource_owner_password_credentials',  
            },
        })
        .then((res) => 
            console.log(res.data.data)
        )
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error.message)
            // <Home ></Home>
        })
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
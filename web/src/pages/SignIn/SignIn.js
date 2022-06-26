import React from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import Button from '../../components/Button/Button'
import './SignIn.scss'
import axios from 'axios';
import Home from '../Home/Home';

const SignIn = () => {    
    const validationSchema = yup.object().shape({
        usuario: yup
            .string()
            .email("e-mail inválido")
            .matches(/\S+@\S+\.\S+/, "e-mail inválido")
            .required(),  //user é o atributo 'name' da input
        senha: yup
            .string()
            .min(6, "mínimo de 6 caracteres")
            .required(),
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
        await axios.get('http://localhost:8080/funcionarios', {
            usuario, 
            senha
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            // console.log(error.message)
            <Home ></Home>
        })
    }

    return (
        <div className='sign-in-container'>
            <section className='header'>
                <div className='sign-header'>
                    <div className='logo-restaurante'>
                        <i class="fab fa-pagelines"></i>
                    </div>
                    <h1 className='sign-in'>DRestaurante</h1>
                </div>
            </section>

            <section className="login-container">               
                <form className="form login-card-data" onSubmit={handleSubmit(handleLogin)}>               
                    <div className="user">
                        <label className='label-email' htmlFor="usuario">Email</label>
                        <input 
                            id="usuario"
                            type="email" 
                            name="usuario"
                            className="form-control" 
                            {...register("usuario")} 
                        />
                        <p className='error-message'>{errors.usuario?.message}</p>
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
                            <p className='error-message'>{errors.senha?.message}</p>
                        </div>
                    </div>
                    
                    <Button type="submit" buttonStyle='btn--login'>LOGIN</Button>
                </form>
            </section>
        </div>
    )
}

export default SignIn
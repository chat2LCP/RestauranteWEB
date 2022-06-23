import React from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import Button from '../../components/Button/Button'
import './SignIn.scss'
import axios from 'axios';

const SignIn = () => {    
    const validationSchema = yup.object().shape({
        user: yup
            .string()
            .email("e-mail inválido")
            .matches(/\S+@\S+\.\S+/, "e-mail inválido")
            .required(),  //user é o atributo 'name' da input
        password: yup
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
            user: "",
            password: ""
        },
        resolver: yupResolver(validationSchema),  //aplica a validação do yup no formulário
    })    
    
    const handleLogin = async (data) => {
        await axios.get('http://localhost:XXXX/ssss/', {
            usuario: data.user, 
            senha: data.password
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error.message)
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

            <section className="login-container container-fluid">               
                <div className="row justify-content-center">
                    <form className="form login-card-data col-10 col-sm-8 col-md-5" onSubmit={handleSubmit(handleLogin)}>               
                        <div className="user">
                            <label htmlFor="user">Email</label>
                            <input 
                                id="user"
                                type="email" 
                                name="user"
                                className="form-control" 
                                {...register("user")} 
                            />
                            <p className='error-message'>{errors.user?.message}</p>
                        </div>
                
                        <div className="password">
                            <label htmlFor="password">Senha</label>
                            
                            <div className="input-password-eye">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    {...register("password")}
                                    name="password" 
                                    id="password" 
                                />
                                <p className='error-message'>{errors.password?.message}</p>
                            </div>
                        </div>
                        
                        <Button type="submit" buttonStyle='btn--login'>LOGIN</Button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default SignIn
import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import Button from '../../components/Button/Button'
import './SignUp.scss'

const SignUp = () => {

    // const [formValues, setFormValues] = useState({})

    /*constante do yup (validação dos campos do form) - o yup não é obrigatorio para faze as validações, eu poderia fazer as mesmas validações só com o react-hook-form, a vantagem do yup é que voce consegue tirar a validação da tag html e fazer ela aqui separada, fica mais legível assim.*/
    const validationSchema = yup.object().shape({
        user: yup
            .string()
            .email("e-mail not valid")
            .matches(/\S+@\S+\.\S+/, "e-mail not valid")
            .required(),  //user é o atributo 'name' da input
        password: yup
            .string()
            .min(6, "min length is 6")
            .required(),
    })

    /*constantes do react-hook-form para manipular o formulário*/
    const { 
        register,       //register registra cada uma das inputs dentro do hok
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            user: "",
            password: ""
        },
        resolver: yupResolver(validationSchema),  //aplica a validação do yup no formulário
    })    
    
    const logUser = async data => {
        await login(data.user, data.password)
        console.log(data)
    }

    const login = (user, password) => {
        //criar método para logar no email
    }

    return (
        <div className='sign-up-container'>
            <section className='header'>
                <div className='sign-header'>
                    <h1 className='sign-up'>SIGN UP</h1>
                </div>
            </section>

            <section className="login-container container-fluid">               
                <div className="row justify-content-center">
                    <form className="form login-card-data col-10 col-sm-8 col-md-5" onSubmit={handleSubmit(logUser)}>               
                        <div className="user">
                            <label htmlFor="user">Username</label>
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
                            <label htmlFor="password">Password</label>
                            
                            <label className="forgot-password">
                                <Link to='/'>Forgot password</Link>
                            </label>
                            
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
                
                <div className="row text-center justify-content-center">
                    <div className="signup-create-account-container col-10 col-sm-8 col-md-5">
                        <span className="create-account-span">Don't have an account?</span>

                        {/* dica: o to='/new-account' leva para localhost:3000/new-account, já o to='new-account' leva para localhost:3000/rota-atual/new-account */}
                        <Button className='btn-create-account' component={Link} to='/new-account' buttonSize='btn--medium' buttonStyle='btn--create-account'>Create Account</Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SignUp
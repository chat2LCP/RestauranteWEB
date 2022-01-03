import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm, useFormState } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import './NewAccount.scss';
import Button from "../../components/Button/Button";
import { fetchStates, parseStates } from "../../providers/fetch-states-provider";
import { getCep } from '../../providers/cep-provider'

const NewAccount = () => {

    const [address, setAddress] = useState({})
    const [states, setStates] = useState([])

    /*******************************************
    * useEffect responsável por buscar os dados do select
    * de estados do formulário
    *******************************************/
    useEffect(() => {
        let isSubscribed = true //evita que o setStates seja executado caso o componente esteja desmontado
        setStates([{id: '', name: 'Loading...', abbr: ''}]) //esse setStates é para mostrar a mensagem de 'loading' enquanto a lista de estados não é carrregada

        fetchStates()
        .then(parseStates)
        .then(isSubscribed ? setStates : null)
        .catch(console.error)

        return () => (isSubscribed = false)
    }, [])  //as [] é para que o useEffect apenas seja executado quando o componente é montado. Ele não é executado nos 're-renders'

    
    /*******************************************
    * Constantes do yup para validação dos campos do form.
    * É possível fazer as mesmas validações só com o 
    * react-hook-form (sem o yup), a vantagem do yup é que 
    * ele permite tirar as validações de dentro das tags 
    * html, deixando o código mais legível.
    *******************************************/
    const validationSchema = yup.object().shape({
        userName: yup
            .string()
            .required("username must be provided"),  //userName é o nome da register da input
        email: yup
            .string()
            .email("e-mail not valid")
            .matches(/\S+@\S+\.\S+/, "e-mail not valid")
            .required(),
        password: yup
            .string()
            .min(6, "password min length is 6")
            .required(),
        cep: yup
            .string()
            .matches(/^[0-9]+$/, "CEP not valid")
            .matches(/\d{8}/, "Only dgits are accepted")
            .required(),
    })


    /*******************************************
    * Constantes do react-hook-form usadas para manipular 
    * o formulário e aplicar validações
    *******************************************/
    const { 
        register,       //register registra cada uma das inputs dentro do hok
        handleSubmit,
        formState: {errors},
        control
    } = useForm({
        defaultValues: {
            userName: '',
            email: '',
            password: '',
            cep: '',
            state: '',
            number: '',
            complement: '',
            district: '',
            city: '',
        },
        resolver: yupResolver(validationSchema),  //aplica a validação do yup no formulário
    })    
    

    /*******************************************
    * Função asíncrona que fica aguardando o usuário ser inserido no banco de dados
    *
    * @param data dados do formulário preenchido pelo usuário
    * @returns void
    *******************************************/
    const onSubmit = async data => {
        await addNewUser(data)  
    }


    /*******************************************
    * Função responsável por inserir o usuário no banco de dados
    * 
    * @param data dados do formulário preenchido pelo usuário
    * @returns void
    *******************************************/
    const addNewUser = (data) => {
        console.log('submit')
        console.log(data)
        //inserir os data no banco de dados
    }


    // useEffect(() => {
    //         console.log('renderizou')
    //     }    
    // )
    /*******************************************
    * Função responsável por consumir a API do viaCEP e retornar 
    * os dados de endereço com base em um CEP fornecido
    * 
    * @param CEP String
    * @returns Promise<AxiosResponse>
    *******************************************/

     const {touchedFields} = useFormState({control})
     console.log(touchedFields) 


    //  const handleInputChange = (e) => {
    //      console.log('mudou street')
    //      document.getElementById('street').setAttribute('value',`${e.target.value}`)
    //     // e.click()
    //  }


    const handleBlur = (e) => {
        const cep = e.target.value

        if(cep){
            getCep(cep)
            .then(setAddress)
            .catch(console.error)

            console.log('endereco')
            console.log(address) 
        }else{
            setAddress({erro: true})

            // console.log(address) 
            console.log('foi triste')
            console.log(address) 
        }
          
    }

    // const handleChange = (e) => {
    //     console.log(e.target.name)
    //     this.setState({e.target.name: e.target.value})
    // }
    
    return (
        <div className="create-account-container container-fluid">
            <section>
                <div className='create-account-header'>
                    <h1 className='create-account-text'>CREATE ACCOUNT</h1>
                </div>
            </section>

            <div className="row">
                <div className="create-account-data container col-10 col-sm-8 col-md-6">
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <div >
                            <label htmlFor="userName">Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="userName" 
                                id="userName" 
                                {...register("userName")} 
                            />
                            <p className='error-message'>{errors.userName?.message}</p>
                        </div>

                        <div >
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                name="email" 
                                id="email" 
                                {...register("email")}
                            />
                            <p className='error-message'>{errors.email?.message}</p>
                        </div>

                        <div >
                            <label htmlFor="password" >Password</label>
                            <input type="password" 
                                className="form-control" 
                                name="password" 
                                id="password" 
                                {...register("password")}
                            />
                            <p className='error-message'>{errors.password?.message}</p>
                        </div>

                        <div className="address">
                            <div className="grid-template-columns-2">
                                <div>
                                    <label htmlFor="cep">CEP</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="cep" 
                                        id="cep" 
                                        {...register("cep")}
                                        onBlur={handleBlur} //esse evento de blur tem que ser depois do register, senão não funciona
                                    />
                                    <p className='error-message'>{errors.cep?.message}</p>
                                </div>

                                <div>
                                    <label htmlFor="state">State</label>
                                    <select 
                                        className="form-control form-select"
                                        name="state"
                                        id="state"
                                        value={address.uf}  //define o valor do select de acordo com o cep digitado
                                        {...register("state")}
                                        // onChange={handleInputChange}
                                    >
                                        <option value={null}>Select a state...</option>
                                        {states.map(state => {
                                            const {id, name, abbr} = state
                                            
                                            return(
                                                <option key={id} value={abbr}>{name}</option>
                                            )
                                        })}     
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="street">Street</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="street"
                                    value={address.logradouro || ''}    //o || '' é porque o valor default dessa input é '' quando ela é inicializada, lhar lá nos métodos do yup onde eu defini como vazio, se não colocar o || vai dar erro porque o componente, quando inicializado com || tem seu value={undefined}, quando eu fou o blur no campo de cep e essa input é preenchida, o value passa a ser definido, e isso não pode acontecer
                                    id="street" 
                                    {...register("street")}
                                    // onChange={handleInputChange}
                                />
                            </div>

                            <div className="grid-template-columns-2">
                                <div>
                                    <label htmlFor="number" >Number</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="number" 
                                        id="number" 
                                        {...register("number")}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="complement" >Complement</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="complement" 
                                        // onChange={this.handleChange} 
                                        value={address.complemento || ''}  //o || '' é porque o valor default dessa input é '' quando ela é inicializada, lhar lá nos métodos do yup onde eu defini como vazio, se não colocar o || vai dar erro porque o componente, quando inicializado com || tem seu value={undefined}, quando eu fou o blur no campo de cep e essa input é preenchida, o value passa a ser definido, e isso não pode acontecer
                                        id="complement" 
                                        {...register("complement")}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="district">District</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="district" 
                                    // onChange={this.handleChange} 
                                    value={address.bairro || ''}  //o || '' é porque o valor default dessa input é '' quando ela é inicializada, lhar lá nos métodos do yup onde eu defini como vazio, se não colocar o || vai dar erro porque o componente, quando inicializado com || tem seu value={undefined}, quando eu fou o blur no campo de cep e essa input é preenchida, o value passa a ser definido, e isso não pode acontecer
                                    id="district"
                                    {...register("district")}
                                />
                            </div>

                            <div>
                                <label htmlFor="city">City</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="city" 
                                    id="city" 
                                    value={address.localidade || ''} //o || '' é porque o valor default dessa input é '' quando ela é inicializada, lhar lá nos métodos do yup onde eu defini como vazio, se não colocar o || vai dar erro porque o componente, quando inicializado com || tem seu value={undefined}, quando eu fou o blur no campo de cep e essa input é preenchida, o value passa a ser definido, e isso não pode acontecer
                                    {...register("city")}
                                />
                            </div>
                        </div>

                        <Button type='submit' buttonSize='btn--medium' buttonStyle="btn--create-account">Create Account</Button>
                    </form>

                    <p className="terms-of-use-link">
                        By creating an account, you agree to Brand's
                        <Link to='/'> Terms of Use</Link>.
                        Please check our website <Link to='/'>Cookies Policy</Link>.
                    </p>

                    <span className="already-have-account-span">Already have an account? <Link to="/signin">Login</Link></span>
                </div>
            </div>
        </div>
    )
}

export default NewAccount
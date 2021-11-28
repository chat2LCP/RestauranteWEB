import React, { useState } from "react";
import { Link } from "react-router-dom";

import './NewAccount.css';
import Button from "../../../components/Button/Button";

const NewAccount = () => {

    const [formValues, setFormValues] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
        setFormValues(data)

        console.log(formValues)
    }

    const findCEP = () => {
        console.log('implementar a busca de CEP')
    }

    return(
        <div className="create-account-container container-fluid">
            <div className="row">
                <div className="create-account-data container col-sm-8 col-md-6">
                    <h2>
                        Create Account
                    </h2>

                    <form className="form" onSubmit={handleSubmit}>
                        <div >
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" id="username"/>
                        </div>

                        <div >
                            <label htmlFor="email">E-mail</label>
                            <input type="email" className="form-control" name="email" id="email"/>
                        </div>

                        <div >
                            <label htmlFor="password" >Password</label>
                            <input type="password" className="form-control" name="password" id="password"/>
                        </div>

                        <div className="address">
                            <div className="grid-template-columns-2">
                                <div>
                                    <label htmlFor="cep">CEP</label>
                                    <input type="text" className="form-control" name="cep" onBlur={findCEP} id="cep"/>
                                </div>

                                <div>
                                    <label htmlFor="state">State</label>
                                    
                                    <select className="form-control" name="state" id="state">
                                        {/* <option *nghtmlFor="let state of states$ | async" [value]="state.abbreviation">{{ state.name }}</option>                */}
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="street">Street</label>
                                <input type="text" className="form-control" name="street" id="street"/>
                            </div>

                            <div className="grid-template-columns-2">
                                <div>
                                    <label htmlFor="number" >Number</label>
                                    <input type="text" className="form-control" name="number" id="number"/>
                                </div>

                                <div>
                                    <label htmlFor="complement" >Complement</label>
                                    <input type="text" className="form-control" name="complement" id="complement"/>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="district">District</label>
                                <input type="text" className="form-control" name="district" id="district"/>
                            </div>

                            <div>
                                <label htmlFor="city">City</label>
                                <input type="text" className="form-control" name="city" id="city"/>
                            </div>
                        </div>

                        <Button type='submit' buttonSize='btn--medium' buttonStyle="btn--create-account">Create Account</Button>
                    </form>

                    <p className="terms-of-use-link">
                        By creating an account, you agree to Brand's 
                        <Link to='/'> Terms of Use</Link>.
                        Please check our website <Link to='/'>Cookies Policy</Link>.
                    </p>

                    <span className="already-have-account-span">Already have an account? 
                        <Link to="login"> Login</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default NewAccount
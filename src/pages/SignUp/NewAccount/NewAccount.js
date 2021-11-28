import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import './NewAccount.css';

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
                        <div className="form-group">
                            <label htmlFor="username" className="control-label">Username</label>
                            <input type="text" className="form-control" name="username" id="username"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" className="form-control" name="email" id="email"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="control-label">Password</label>
                            <input type="password" className="form-control" name="password" id="password"/>
                        </div>

                        <div className="address">
                            <div className="grid-template-columns-2">
                                <div className="form-group">
                                    <label htmlFor="cep" className="control-label">CEP</label>
                                    <input type="text" className="form-control" name="cep" onBlur={findCEP} id="cep"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="state" className="control-label">State</label>
                                    
                                    <select className="form-control" name="state" id="state">
                                        {/* <option *nghtmlFor="let state of states$ | async" [value]="state.abbreviation">{{ state.name }}</option>                */}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="street" className="control-label">Street</label>
                                <input type="text" className="form-control" name="street" id="street"/>
                            </div>

                            <div className="grid-template-columns-2">
                                <div className="form-group">
                                    <label htmlFor="number" className="control-label">Number</label>
                                    <input type="text" className="form-control" name="number" id="number"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="complement" className="control-label">Complement</label>
                                    <input type="text" className="form-control" name="complement" id="complement"/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="district" className="control-label">District</label>
                                <input type="text" className="form-control" name="district" id="district"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="city" className="control-label">City</label>
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
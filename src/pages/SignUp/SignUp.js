import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import './SignUp.css'

function SignUp() {
    return (
        <div className='sign-up-container'>
            <section className='header'>
                <div className='sign-header'>
                    <h1 className='sign-up'>SIGN UP</h1>
                </div>
            </section>

            <section className="login-container container-fluid">               
                <div className="row justify-content-center">
                    <div className="login-card-data col-10 col-sm-8 col-md-5">               
                        <div className="user">
                            <label for="user">Username</label>
                            <input type="text" className="form-control" id="user" />
                        </div>
                
                        <div className="form-group password">
                            <label for="password" className="control-label">Password</label>
                            
                            <label >
                                <Link to='/'>Forgot password</Link>
                            </label>
                            
                            <div className="input-password-eye">
                                <input type="password" className="form-control" id="password" />
                            </div>
                        </div>
                        
                        <Button className='btn-login' type="submit" buttonStyle='btn--login'>LOGIN</Button>
                    </div>
                </div>
                
                <div className="row text-center justify-content-center">
                    <div className="create-account-container col-10 col-sm-8 col-md-5">
                        <span className="create-account-span">Don't have an account?</span>

                        <Button buttonSize='btn--medium' buttonStyle='btn--create-account'>Create Account</Button>
                    </div>
                </div>
            </section>
        </div>
        
    )
}

export default SignUp
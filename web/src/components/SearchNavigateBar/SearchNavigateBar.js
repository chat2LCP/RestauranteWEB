import React from 'react';
import { Link } from 'react-router-dom';
import { CaretDownFill, Search, Basket3Fill } from 'react-bootstrap-icons'

import Button from '../Button/Button';
import './searchNavigateBar.scss';

const SearchNavigateBar = () => {

    return(
        <section className="search-bar-container container-fluid">
            <div className="search-bar row">
                <div className="search col-5 col-md-4">
                    <div className="search-border">
                        <input className="search-input" />
                    
                        <Button className="search-btn" type="submit">
                            <Search className='search-icon' />  {/*ícone do react-bootstrap-icons*/}
                        </Button>
                    </div>
                </div>
        
                <div className="dropdown-category dropdown-search-bar col-2 col-md-2">
                    <div className="category-btn" type="button" >
                        <b>SIGN IN</b> <br/>into your account <CaretDownFill />
                                                
                        <div className="dropdown-submenu signin">
                            <div className="dropdown-submenu-item">
                                <Button component={Link} to='/signin' buttonStyle="btn--login">SIGN-IN</Button>
                            </div>
                            <div className="dropdown-submenu-item">
                                <span className="dont-have-account-span">Don't have an account? <Link to="/new-account">Create account</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
        
                <div className="shopping-cart-container col-2 col-md-1"> { /*ms-auto manda o shopping-cart-container para o mais longe possivel do elemento irmão */}
                    <Link to="/" className="shopping-cart">
                        <Basket3Fill className='shopping-basket'/>
                        <span className="cart-quantity">10</span>
                    </Link>
                </div>
            </div>    
            
            <div className="categories-menu-bar row">
                <div className="categories col-12 col-md-8 col-lg-6">
                    <div className="dropdown-category col-2">
                        <div className="category-btn" type="button">
                            Electronics <CaretDownFill />
                            
                            <ul className="dropdown-submenu">
                                <li className="dropdown-submenu-item">
                                    <Link to="/" className="dropdown-submenu-link">Action</Link>
                                </li>
                                <li className="dropdown-submenu-item">
                                    <Link to="/" className="dropdown-submenu-link">Another action</Link>
                                </li>
                                <li className="dropdown-submenu-item">
                                    <Link to="/" className="dropdown-submenu-link">Something else here</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
        
                    <div className="dropdown-category col-2">
                        <div className="category-btn" type="button" id="">
                            Homeware <CaretDownFill />
        
                            <ul className="dropdown-submenu">
                                <li className="dropdown-submenu-item">
                                    <Link to="/" className="dropdown-submenu-link">Action</Link>
                                </li>
                                <li className="dropdown-submenu-item">
                                    <Link to="/" className="dropdown-submenu-link">Another action</Link>
                                </li>
                                <li className="dropdown-submenu-item">
                                    <Link to="/" className="dropdown-submenu-link">Something else here</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
        
                    <div className="dropdown-category col-2">
                        <div className="category-btn" type="button" id="">
                            Arts & Crafts <CaretDownFill />
                            
                            <ul className="dropdown-submenu">
                                <li className="dropdown-submenu-item">
                                    <Link to="/" className="dropdown-submenu-link">Action</Link>
                                </li>
                                <li className="dropdown-submenu-item">
                                    <Link to="/" className="dropdown-submenu-link">Another action</Link>
                                </li>
                                <li className="dropdown-submenu-item">
                                    <Link to="/" className="dropdown-submenu-link">Something else here</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
        
                <div className="categories-menu-right col-md-4 col-lg-6">
                    <div className="categories-menu-text" type="button">
                        <span>
                            Get to know our <b>Electronics session</b>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SearchNavigateBar

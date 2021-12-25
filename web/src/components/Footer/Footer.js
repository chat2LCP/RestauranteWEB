import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'

import './Footer.scss'

function Footer() {
    return (
        <div className='footer-container'>
            <section className='footer-subscription'>
                <p className='footer-subscription-heading'>
                    Join the Gastronomy Experience newsletter to receive our best reccomendations
                </p>
                <p className='footer-subscription-text'>
                    You can unsubscribe any time
                </p>
                <div>
                    <form>
                        <input className='footer-input' type='email' name='email' placeholder='Your e-mail'></input>
                        <Button buttonStyle='btn--outline'>Subscribe</Button>
                    </form>
                </div>
            </section> 

            <section className='footer-links'>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>About Us</h2>
                        <Link to='/'>How it works</Link>
                        <Link to='/'>Make a reservation</Link>
                        <Link to='/'>Cupons and Discounts</Link>
                        <Link to='/'>More infos</Link>
                        <Link to='/'>Terms of Service</Link>
                    </div>

                    <div className='footer-link-items'>
                        <h2>Contact Us</h2>
                        <Link to='/'>Contact</Link>
                        <Link to='/'>Support</Link>
                        <Link to='/'>Destinations</Link>
                        <Link to='/'>Sponsorships</Link>
                    </div>
                </div>

                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>Videos</h2>
                        <Link to='/'>Submit Video</Link>
                        <Link to='/'>Ambassadors</Link>
                        <Link to='/'>Agency</Link>
                        <Link to='/'>Influencer</Link>
                    </div>

                    <div className='footer-link-items'>
                        <h2>Social Media</h2>
                        <Link to='/'>Instagram</Link>
                        <Link to='/'>Facebook</Link>
                        <Link to='/'>Youtube</Link>
                        <Link to='/'>Twitter</Link>
                    </div>
                </div>
            </section>

            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div className='footer-logo'>
                        <Link to='/' className='social-logo'>
                            EAT <i className='fab fa-pagelines' />
                        </Link>
                    </div>
                    <small className='website-rights'>EAT © 2021</small>
                    <div className='social-icons'>
                        <a
                            className='social-icon-link facebook'
                            href='www.facebook.com'
                            rel='noopener noreferrer'
                            target='_blank'
                            aria-label='Facebook'
                        >
                            <i className='fab fa-facebook-f' />
                        </a>
                        <a
                            className='social-icon-link instagram'
                            href='www.instagram.com'
                            rel='noopener noreferrer'
                            target='_blank'
                            aria-label='Instagram'
                        >
                            <i className='fab fa-instagram' />
                        </a>
                        <a
                            className='social-icon-link youtube'
                            href='www.youtube.com'
                            rel='noopener noreferrer'
                            target='_blank'
                            aria-label='Youtube'
                        >
                            <i className='fab fa-youtube' />
                        </a>
                        <a
                            className='social-icon-link twitter'
                            href='/'
                            rel='noopener noreferrer'
                            target='_blank'
                            aria-label='Twitter'
                        >
                            <i className='fab fa-twitter' />
                        </a>
                        <a
                            className='social-icon-link twitter'
                            href='www.linkedin.com'
                            rel='noopener noreferrer'   //essa propriedade precisa ter por questões de segurança quando se usa uma tag <a> pq ela impede q o site externo possa acessar propriedades do meu site
                            target='_blank'
                            aria-label='LinkedIn'
                        >
                            <i className='fab fa-linkedin' />
                        </a>
                    </div>
                </div>
            </section>            
        </div>
    )
}

export default Footer

import React from 'react';
import './Footer.scss'
import SocialSvg from '../Tools/SocialSvg'
import { withContext } from '../../ContextAPI/ContextHOC'
import { Link } from 'react-router-dom'

const Footer = (props) => {
    return (
        <footer>
            <div className="styled-line"></div>
            <div className="social-container">
                <a href="http://instagram.com/sydneyelizaflorals" target="_blank" rel="noopener noreferrer">
                    <SocialSvg color='rgb(160, 160, 160)' name='instagram' size={40} />
                </a>
                <a href="https://www.pinterest.com/sydneyelizaflorals/boards/" target="_blank" rel="noopener noreferrer">
                    <SocialSvg color='rgb(160, 160, 160)' name='pinterest' size={40} />
                </a>
                <a href="https://www.facebook.com/sydneyelizaflorals/" target="_blank" rel="noopener noreferrer">
                    <SocialSvg color='rgb(160, 160, 160)' name='facebook' size={40} />
                </a>
            </div>
            <Link to='/login'>{props.context.user ? 'LOGOUT' : 'LOGIN'}</Link>
        </footer>
    );
};

export default withContext(Footer);
import React from 'react';
import './Footer.scss'
import SocialSvg from '../Tools/SocialSvg'

const Footer = () => {
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
        </footer>
    );
};

export default Footer;
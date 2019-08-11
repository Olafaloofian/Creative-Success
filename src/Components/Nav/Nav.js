import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../Assets/logo.jpg'
import './Nav.scss'

class Nav extends React.Component {
    state = {
        selectedNav: '',
        toggleMenu: false
    }

    componentDidMount() {
        // Getting the path name on page load to correctly style the nav bar
        const path = window.location.pathname.split('')
        path.shift()
        const pathname = path.join("")

        if(pathname === '') {
            this.setState({
                selectedNav: 'home'
            })
        } else {
            this.setState({
                selectedNav: pathname
            })
        }
    }

    render() {
        return (
            <div className="nav-container">
                <nav>
                    <div className={`drawer ${this.state.toggleMenu ? 'open' : ''}`}>
                        <Link to='/' onClick={() => this.setState({ selectedNav: 'home', toggleMenu: false })} className={`nav-link ${this.state.selectedNav.includes('home') ? 'selected-nav' : ''}`}>HOME</Link>
                        <Link to='/about' onClick={() => this.setState({ selectedNav: 'about', toggleMenu: false })} className={`nav-link ${this.state.selectedNav.includes('about') ? 'selected-nav' : ''}`}>ABOUT</Link>
                        <Link to='/contact' onClick={() => this.setState({ selectedNav: 'contact', toggleMenu: false })} className={`nav-link ${this.state.selectedNav.includes('contact') ? 'selected-nav' : ''}`}>CONTACT</Link>
                        <Link to='/portfolio' onClick={() => this.setState({ selectedNav: 'portfolio', toggleMenu: false })} className={`nav-link ${this.state.selectedNav.includes('portfolio') ? 'selected-nav' : ''}`}>PORTFOLIO</Link>
                    </div>
                    <div className="menu-lines" onClick={() => this.setState(prevState => {return { toggleMenu: !prevState.toggleMenu }})}>
                        <div className={this.state.toggleMenu ? 'menux1' : "menuline1"}></div>
                        <div className={this.state.toggleMenu ? 'menux2' : "menuline2"}></div>
                        <div className={this.state.toggleMenu ? 'menux3' : "menuline3"}></div>
                    </div>
                </nav>
                <header>
                    <figure>
                        <img className='banner-image' src={logo} alt="Sydney Eliza Florals"/>
                    </figure>
                <small>“NORMALITY IS A PAVED ROAD, IT’S COMFORTABLE TO WALK BUT NO FLOWERS GROW” —VINCENT VAN GOGH</small>
            </header>
            </div>
        )
    }
}

export default Nav
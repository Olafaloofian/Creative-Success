import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.scss'

class Nav extends React.Component {
    state = {
        selectedNav: ''
    }

    componentDidMount() {
        // Getting the path name on page load to correctly style the nav bar
        const path = window.location.pathname.split('')
        path.shift()
        console.log(path)
        const pathname = path.join("")

        this.setState({
            selectedNav: pathname
        })
    }

    render() {
        console.log('location', this.state.selectedNav)
        return (
            <div className="nav-container">
                <nav>
                    <Link to='/' onClick={() => this.setState({ selectedNav: 'home' })} className={`nav-link ${this.state.selectedNav.includes('home') ? 'selected-nav' : ''}`}>Home</Link>
                    <Link to='/about' onClick={() => this.setState({ selectedNav: 'about' })} className={`nav-link ${this.state.selectedNav.includes('about') ? 'selected-nav' : ''}`}>About</Link>
                    <Link to='/contact' onClick={() => this.setState({ selectedNav: 'contact' })} className={`nav-link ${this.state.selectedNav.includes('contact') ? 'selected-nav' : ''}`}>Contact</Link>
                    <Link to='/portfolio' onClick={() => this.setState({ selectedNav: 'portfolio' })} className={`nav-link ${this.state.selectedNav.includes('portfolio') ? 'selected-nav' : ''}`}>Portfolio</Link>
                </nav>
                <header>
                    <figure>
                        <img src="https://sydneyelizaflorals.files.wordpress.com/2018/03/cropped-sydney-eliza-florals-logo6.jpg?w=680&h=296" alt="Sydney Eliza Florals"/>
                    </figure>
                <small>“NORMALITY IS A PAVED ROAD, IT’S COMFORTABLE TO WALK BUT NO FLOWERS GROW” —VINCENT VAN GOGH</small>
            </header>
            </div>
        )
    }
}

export default Nav
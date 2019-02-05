import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Contact from './Components/Contact/Contact'
import Portfolio from './Components/Portfolio/Portfolio';
import PortfolioItem from './Components/Portfolio/PortfolioItem';
import LoginForm from './Components/Authorization/LoginForm';

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
        <Route path='/portfolio/:id' component={PortfolioItem} />
        <Route path='/portfolio' component={Portfolio} />
        <Route path='/login' component={LoginForm} />
    </Switch>
)
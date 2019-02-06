import React from 'react';
import './LoginForm.scss'
import axios from 'axios'
import LoadingDots from '../../Assets/LoadingDots/LoadingDots';
import { Redirect } from 'react-router-dom'
import { withContext } from '../../ContextAPI/ContextHOC'

class LoginForm extends React.Component {
    state = {
        email: '',
        password: '',
        loginMessage: '',
        successOrFailure: '',
        redirect: false
    }

    login = this.login.bind(this)
    logout = this.logout.bind(this)

    handleInput = (e) => {
        const { successOrFailure } = this.state
        if(successOrFailure === 'failure') {
            this.setState({
                successOrFailure: ''
            })
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async login(e) {
        // Prevents page refresh on form submit
        e.preventDefault()
        const { email, password } = this.state
        // All fields must be filled out to submit form
        if (!email || !password) {
            this.setState({
                successOrFailure: 'failure',
                loginMessage: 'Please fill out all fields.'
            })
            return
        }
        // Show a loading component while data is fetched
        this.setState({
            successOrFailure: '',
            loginMessage: <LoadingDots />
        })
        try {
            const loginResponse = await axios.post('/api/login', {...this.state})
            // Notify the user of success, and redirect to home
            if(loginResponse) {
                this.setState({
                    successOrFailure: 'success',
                    loginMessage: 'Login success!'
                }, () => setTimeout(() => {
                    this.setState({
                        redirect: true
                    })
                    // Set the user info to global state
                    this.props.context.methods.setUser(loginResponse.data.user)
                }, 2000))
            }
        } catch(error) {
            console.log('------------ error', error)
            // Notify use or login failure
            this.setState({
                successOrFailure: 'failure',
                loginMessage: 'Incorrect email or password.'
            })
        }
    }

    async logout() {
        try {
            const logoutResponse = await axios.post('/api/logout')
            if(logoutResponse) {
                this.setState({
                    redirect: true
                })
            }
        } catch(error) {
            console.error('Error logging out ---', error)
        }
    }

    render() {
        const { email, password, successOrFailure, loginMessage, redirect } = this.state
        console.log('------------ this.props', this.props)
        const { user } = this.props.context
        if(redirect) {
            return <Redirect to='/' />
        }
        if(user) {
            return (
                <div className="login-container">
                    <button onClick={this.logout}>Log Out</button>
                </div>
            )
        }
        return (
            <div className='login-container'>
                <form>
                    <input type="email" name='email' placeholder='Email' value={email} onChange={(e) => this.handleInput(e)}/>
                    <input type="password" name="password" placeholder='Password' value={password} onChange={(e) => this.handleInput(e)}/>
                    <small className={successOrFailure === 'failure' || successOrFailure === 'success' ? successOrFailure : ''}>{loginMessage}</small>
                    <button onClick={(e) => this.login(e)}>Login</button>
                </form>
            </div>
        );
    }
};

export default withContext(LoginForm);
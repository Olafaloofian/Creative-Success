import React from 'react';
import './LoginForm.scss'
import axios from 'axios'
import LoadingDots from '../../Assets/LoadingDots/LoadingDots';

class LoginForm extends React.Component {
    state = {
        email: '',
        password: '',
        loginMessage: '',
        failure: false
    }

    login = this.login.bind(this)

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async login(e) {
        e.preventDefault()
        this.setState({
            failure: false,
            loginMessage: <LoadingDots />
        })
        try {
            const loginResponse = await axios.post('/api/login', {...this.state})
            console.log('------------ loginResponse', loginResponse)
        } catch(error) {
            this.setState({
                failure: true,
                loginMessage: 'Incorrect email or password.'
            })
        }
    }

    render() {
        const { email, password, failure, loginMessage } = this.state
        return (
            <div className='login-container'>
                <form>
                    <input type="text" name='email' placeholder='Email' value={email} onChange={(e) => this.handleInput(e)}/>
                    <input type="password" name="password" placeholder='Password' value={password} onChange={(e) => this.handleInput(e)}/>
                    <small className={failure ? 'failure' : ''}>{loginMessage}</small>
                    <button onClick={(e) => this.login(e)}>Login</button>
                </form>
            </div>
        );
    }
};

export default LoginForm;
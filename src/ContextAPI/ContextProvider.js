import React from 'react'
import axios from 'axios';

export const AppContext = React.createContext()

export default class ContextProvider extends React.Component {
    state = {
        user: null,
        methods: {
            setUser: (user) => {
                this.setState({
                    user
                })
            }
        }
    }

    // Check for a logged in user when app is reloaded
    componentDidMount() {
        axios.get('/api/user').then(response => {
            this.setState({
                user: response.data
            })
        }).catch(error => {
            console.log('------------ Get User Error', error)
        })
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
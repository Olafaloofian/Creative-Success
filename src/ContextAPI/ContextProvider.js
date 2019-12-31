import React from 'react'
import axios from 'axios';

export const AppContext = React.createContext()

export default class ContextProvider extends React.Component {
    state = {
        user: null,
        userImages: {},
        methods: {
            setUser: (user) => {
                this.setState({
                    user
                })
            },
            refetchImages: () => {
                this.getUserImages()
            }
        }
    }

    // Check for a logged in user when app is reloaded
    componentDidMount() {
        this.getLoggedInUser()
        this.getUserImages()
    }

    getLoggedInUser = () => {
        axios.get('/api/user').then(response => {
            this.setState({
                user: response.data.user
            })
        }).catch(error => {
            console.log('------------ Get User', error)
        })
    }

    // Get all images from database and save to session storage so the user only has to wait once for image data
    getUserImages = () => {
        axios.get('/api/images').then(res => {
            const images = res.data
            console.log('------------ images', images)
            this.setState({
                userImages: images
            })
            // Set a session storage item for each location in the image object. Still working, but props seems to be the better solution for now?
            // for(let location in images) {
            //     sessionStorage.setItem(location, JSON.stringify(images[location]))
            // }
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
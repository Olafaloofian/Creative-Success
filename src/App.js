import React, { Component } from 'react';
import './App.scss';
import axios from 'axios'
import routes from './routes';
import Nav from './Components/Nav/Nav'
import Footer from './Components/Footer/Footer'

class App extends Component {
  // Get all images from database and save to session storage so the user only has to wait once for image data
  componentDidMount() {
    axios.get('/api/images').then(res => {
      const images = res.data
      // Set a session storage item for each location in the image object
      for(let location in images) {
        sessionStorage.setItem(location, JSON.stringify(images[location]))
      }
    })
  }


  render() {
    return (
      <div className='app-container'>
        <main className='main-container'>
          <Nav />
          {routes}
          <Footer />
        </main>
      </div>
    );
  }
}

export default App;

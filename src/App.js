import React, { Component } from 'react';
import './App.scss';
import axios from 'axios'
import routes from './routes';
import Nav from './Components/Nav/Nav'
import Footer from './Components/Footer/Footer'

class App extends Component {
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

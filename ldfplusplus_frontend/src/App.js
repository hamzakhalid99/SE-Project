import './reset.css';
import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import LandingPage from './components/LandingPage/LandingPage.js';
import AboutPage from './components/AboutPage/AboutPage.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AboutPage />
        {/* <Navigation />
        <LandingPage /> */}
      </div>
    );
  }
}

export default App;

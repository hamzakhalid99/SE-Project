import './reset.css';
import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import LandingPage from './components/LandingPage/LandingPage.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <LandingPage />
      </div>
    );
  }
}

export default App;

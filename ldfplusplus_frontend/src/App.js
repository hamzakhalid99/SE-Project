import './reset.css';
import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import LandingPage from './components/LandingPage/LandingPage.js';
import AboutPage from './components/AboutPage/AboutPage.js';

const initialState = {
	route: 'landing',
	isSignedin: false
}

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

  onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState({initialState})
		}
		
    this.setState({route: route })
	}

  render() {
  	const { route, isSignedIn } = this.state;

    if (route === 'landing') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
          <LandingPage />
        </div>
      )
    } else if (route === 'about') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <AboutPage />
        </div>
      )
    }
  }
}

export default App;

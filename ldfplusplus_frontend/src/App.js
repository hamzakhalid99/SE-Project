import './reset.css';
import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import LandingPage from './components/LandingPage/LandingPage.js';
import AboutPage from './components/AboutPage/AboutPage.js';
import SignUp from './components/SignUp/SignUp.js';
import Login from './components/Login/Login.js';
import Homepage from './components/Homepage/Homepage.js';

const initialState = {
	route: 'landing',
	isSignedin: false,
  user: {
    id: '',
    fullname: '',
    email: ''
  }
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
		
    this.setState({ route: route })
	}

  loadUser = (user) => {
    this.setState({ user: user, isSignedIn: true })
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
    } else if (route === 'signup') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <SignUp onRouteChange={this.onRouteChange} />
        </div>
      )
    } else if (route === 'login') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <Login 
            onRouteChange={this.onRouteChange} 
            loadUser={this.loadUser} />
        </div>
      )
    } else if (route === 'homepage') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <Homepage />
        </div>
      )
    }
  }
}

export default App;

import './reset.css';
import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import LandingPage from './components/LandingPage/LandingPage.js';
import AboutPage from './components/AboutPage/AboutPage.js';
import SignUp from './components/SignUp/SignUp.js';
import Login from './components/Login/Login.js';
import Homepage from './components/Homepage/Homepage.js';
import FoodDelivery from './components/FoodDelivery/FoodDelivery.js';
import FoodDeliveryPostDetails from './components/FoodDelivery/FoodDeliveryPostDetails.js';
import FoodDeliveryNewPost from './components/FoodDelivery/FoodDeliveryNewPost.js';

import ViewAdminRequests from './components/ViewAdminRequests/ViewAdminRequests.js';
import AddCourses from './components/AddCourses/AddCourses.js';
import RemoveUser from './components/RemoveUser/RemoveUser.js';
import RemoveAdmin from './components/RemoveAdmin/RemoveAdmin.js';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.js';


const initialState = {
	route: 'landing',
	isSignedin: false,
  user: {
    _id: '',
    fullname: '',
    email: '',
    adminstatus: '',
    status: '',
    superadmin: '',
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
    } else if (route === 'discussionportal') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <h1>Discussion Portal</h1>
        </div>
      )
    } else if (route === 'coursereviews') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <h1>Course Reviews</h1>
        </div>
      )
    } else if (route === 'instructorreviews') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <h1>Instructor Reviews</h1>
        </div>
      )
    } else if (route === 'fooddelivery') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <FoodDelivery 
          onRouteChange={this.onRouteChange} 
            loadUser={this.loadUser}/>
        </div>
      )
    } else if (route === 'marketplace') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <h1>Marketplace</h1>
        </div>
      )
    } else if (route === 'donations') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <h1>Donations</h1>
        </div>
      )
    } else if (route === 'careerhelp') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <h1>Career Help</h1>
        </div>
      )
    } else if (route === 'eventsportal') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <h1>Events Portal</h1>
        </div>
      )
    } else if (route === 'gettogethers') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <h1>Get Togethers</h1>
        </div>
      )
    } else if (route === 'enrollmentswap') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <h1>Enrollment Swap</h1>
        </div>
      )
    } else if (route === 'removeuser') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <RemoveUser />
        </div>
      )
    } else if (route === 'addcourses') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <AddCourses />
        </div>
      )
    } else if (route === 'removeadmin') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <RemoveAdmin />
        </div>
      )
    } else if (route === 'viewadminshiprequests') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <ViewAdminRequests
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}/>
        </div>
      )
    } else if (route === 'viewprofile') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <h1>View Profile</h1>
        </div>
      )
    } else if (route === 'editprofile') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <h1>Edit Profile</h1>
        </div>
      )
    } else if (route === 'deactivateaccount') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <h1>Deactivate Account</h1>
        </div>
      )
    } else if (route === 'viewstatus') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <h1>View Status</h1>
        </div>
      )
    } else if (route === 'requestadminship') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <h1>Request Adminship</h1>
        </div>
      )
    } else if (route === 'logout') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <h1>Logout</h1>
        </div>
      )
    } else if (route === 'ViewFoodDeliveryPost') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <FoodDeliveryPostDetails
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}/>
        </div>
      )
    }
    //view my food delivery posts
    else if (route === 'ViewMyFoodDeliveryRequest') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <h1>view my food delivery posts</h1>
        </div>
      )
    }

    //post a food delivery request
    else if (route === 'PostFoodDeliveryRequest') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <FoodDeliveryNewPost
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}/>
        </div>
      )
    }

    else if (route === 'forgotpassword') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <ForgotPassword />
        </div>
      )
    }

  }
}

export default App;

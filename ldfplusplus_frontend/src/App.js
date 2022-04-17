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
import FoodDeliveryMyPosts from './components/FoodDelivery/FoodDeliveryMyPosts.js';
import ViewProfile from './components/ViewProfile/ViewProfile.js'
import ViewStatus from './components/ViewStatus/ViewStatus.js'
import RequestAdminshipStatus from './components/RequestAdminshipStatus/RequestAdminshipStatus.js'
import ViewAdminRequests from './components/ViewAdminRequests/ViewAdminRequests.js';
import AddCourses from './components/AddCourses/AddCourses.js';
import RemoveUser from './components/RemoveUser/RemoveUser.js';
import RemoveAdmin from './components/RemoveAdmin/RemoveAdmin.js';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.js';
import Donations from './components/Donations/Donations.js';
import DonationsPostDetails from './components/Donations/DonationsPostDetails.js';
import DonationsNewPost from './components/Donations/DonationsNewPost.js';
import DonationsMyPosts from './components/Donations/DonationsMyPosts.js';
import Marketplace from './components/Marketplace/Marketplace.js';
import MarketplacePostDetails from './components/Marketplace/MarketplacePostDetails.js';
import MarketplaceNewPost from './components/Marketplace/MarketplaceNewPost.js';
import MarketplaceMyPosts from './components/Marketplace/MarketplaceMyPosts.js';

import Careerhelp from './components/Careerhelp/Careerhelp.js';
import CareerhelpPostDetails from './components/Careerhelp/CareerhelpPostDetails.js';
import CareerhelpNewPost from './components/Careerhelp/CareerhelpNewPost.js';
import CareerhelpMyPosts from './components/Careerhelp/CareerhelpMyPosts.js';
import BACKEND_LINK from './env.js'
// import Marketplace from '../../ldfplusplus_backend/models/marketplace';

const initialState = {
	route: 'landing',
	isSignedin: false,
  user: {
    user_id: '',
    fullname: '',
    email: '',
    adminstatus: '',
    status: '',
    superadmin: '',
  },
  post: null
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

  loadPost = (post,change) => {
    this.setState({ post: post }) 
    this.onRouteChange(change)
  }

  render() {
  	const { route, isSignedIn } = this.state;
    
    if (route === 'landing') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
          <LandingPage />
          {/* <h1>landing page</h1> */}
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
          <Homepage 
          user={this.state.user}
          />
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
            loadUser={this.loadUser}
            loadPost={this.loadPost}
            user={this.state.user}
            />
        </div>
      )
    } else if (route === 'marketplace') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <Marketplace 
          onRouteChange={this.onRouteChange} 
            loadUser={this.loadUser}
            loadPost={this.loadPost}
            user={this.state.user}
            />
        </div>
      )
    }else if (route === 'ViewMarketplacePost') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <MarketplacePostDetails
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}
          post={this.state.post}
          />
        </div>
      )
    }
    //view my food delivery posts
    else if (route === 'ViewMyMarketplaceRequest') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <MarketplaceMyPosts
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    }

    //post a food delivery request
    else if (route === 'PostMarketplaceRequest') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <MarketplaceNewPost
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    }
     else if (route === 'donations') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <Donations 
          onRouteChange={this.onRouteChange} 
            loadUser={this.loadUser}
            loadPost={this.loadPost}
            user={this.state.user}
            />
        </div>
      )
    }else if (route === 'ViewDonationsPost') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <DonationsPostDetails
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}
          post={this.state.post}
          />
        </div>
      )
    }
    //view my food delivery posts
    else if (route === 'ViewMyDonationsRequest') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <DonationsMyPosts
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    }

    //post a food delivery request
    else if (route === 'PostDonationsRequest') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <DonationsNewPost
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    }
     else if (route === 'careerhelp') {
      return (
        <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        <Careerhelp 
        onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}
          loadPost={this.loadPost}
          user={this.state.user}
          />
      </div>
      )
    } else if (route === 'ViewCareerhelpPost') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <CareerhelpPostDetails
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}
          post={this.state.post}
          />
        </div>
      )
    }
    //view my food delivery posts
    else if (route === 'ViewMyCareerhelpRequest') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <CareerhelpMyPosts
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    }

    //post a food delivery request
    else if (route === 'PostCareerhelpRequest') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <CareerhelpNewPost
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    }
    
    else if (route === 'eventsportal') {
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
          <ViewProfile
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}/>
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
          <ViewStatus
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}/>
        </div>
      )
    } else if (route === 'requestadminship') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <RequestAdminshipStatus
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}/>
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
          loadUser={this.loadUser}
          post={this.state.post}
          />
        </div>
      )
    }
    //view my food delivery posts
    else if (route === 'ViewMyFoodDeliveryRequest') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <FoodDeliveryMyPosts
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          user={this.state.user}
          />
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
          loadUser={this.loadUser}
          user={this.state.user}
          />
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

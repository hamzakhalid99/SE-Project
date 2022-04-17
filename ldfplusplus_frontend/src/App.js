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

import EnrollmentSwap from './components/EnrollmentSwap/EnrollmentSwap.js';
import EnrollmentSwapPostDetails from './components/EnrollmentSwap/EnrollmentSwapPostDetails.js';
import EnrollmentSwapNewPost from './components/EnrollmentSwap/EnrollmentSwapNewPost.js';
import EnrollmentSwapMyPosts from './components/EnrollmentSwap/EnrollmentSwapMyPosts.js';
import EditProfile from './components/EditProfile/EditProfile.js';
import EditName from './components/EditProfile/EditName.js';
import EditPassword from './components/EditProfile/EditPassword.js';
// import Edit from './components/EditProfile/EditName.js';
import EventsPortal from './components/EventsPortal/EventsPortal.js';
import EventsPortalPostDetails from './components/EventsPortal/EventsPortalPostDetails.js';
import EventsPortalNewPost from './components/EventsPortal/EventsPortalNewPost.js';
import EventsPortalMyPosts from './components/EventsPortal/EventsPortalMyPosts.js';

import CourseReviews from './components/CourseReviews/CourseReviews.js';
import CourseReviewsPostDetails from './components/CourseReviews/CourseReviewsPostDetails.js';
import CourseReviewsNewPost from './components/CourseReviews/CourseReviewsNewPost.js';
import CourseReviewsMyPosts from './components/CourseReviews/CourseReviewsMyPosts.js';




import InstructorReviews from './components/InstructorReviews/InstructorReviews.js';
import InstructorReviewsPostDetails from './components/InstructorReviews/InstructorReviewsPostDetails.js';
import InstructorReviewsNewPost from './components/InstructorReviews/InstructorReviewsNewPost.js';
import InstructorReviewsMyPosts from './components/InstructorReviews/InstructorReviewsMyPosts.js';


import ContactPage from './components/ContactPage/ContactPage.js';


import GetTogether from './components/GetTogether/GetTogether.js';
import GetTogetherPostDetails from './components/GetTogether/GetTogetherPostDetails.js';
import GetTogetherNewPost from './components/GetTogether/GetTogetherNewPost.js';
import GetTogetherMyPosts from './components/GetTogether/GetTogetherMyPosts.js';

import DiscussionPortal from './components/DiscussionPortal/DiscussionPortal.js';
import DiscussionPortalNewPost from './components/DiscussionPortal/DiscussionPortalNewPost.js';
import DiscussionPortalMyPosts from './components/DiscussionPortal/DiscussionPortalMyPosts.js';
import DiscussionPortalPostDetails from './components/DiscussionPortal/DiscussionPortalPostDetails.js';


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
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
          <LandingPage onRouteChange={this.onRouteChange}/>
          {/* <h1>landing page</h1> */}
        </div>
      )
    } else if (route === 'about') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <AboutPage />
        </div>
      )
    }
    
    else if (route === 'contact') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <ContactPage />
        </div>
      )
    }
    
    
    else if (route === 'signup') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <SignUp onRouteChange={this.onRouteChange} />
        </div>
      )
    } else if (route === 'login') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <Login 
            onRouteChange={this.onRouteChange} 
            loadUser={this.loadUser} />
        </div>
      )
    } else if (route === 'homepage') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <Homepage 
          user={this.state.user}
          />
        </div>
      )
    }
    else if (route === 'discussionportal') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <DiscussionPortal
          onRouteChange={this.onRouteChange} 
            loadUser={this.loadUser}
            loadPost={this.loadPost}
            user={this.state.user}
            />
        </div>
      )
    } 
    else if (route === 'ViewDiscussionPost') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <DiscussionPortalPostDetails
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}
          post={this.state.post}
          />
        </div>
      )
    }
    //view my food delivery posts
    else if (route === 'ViewMyDiscussion') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <DiscussionPortalMyPosts
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    }

    //post a food delivery request
    else if (route === 'PostDiscussion') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <DiscussionPortalNewPost
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    }
    
    else if (route === 'coursereviews') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <CourseReviews
          onRouteChange={this.onRouteChange} 
            loadUser={this.loadUser}
            loadPost={this.loadPost}
            user={this.state.user}
            />
        </div>
      )
    } 
    else if (route === 'ViewCourseReviewsPost') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <CourseReviewsPostDetails
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}
          post={this.state.post}
          />
        </div>
      )
    }
    //view my food delivery posts
    else if (route === 'ViewMyCourseReviews') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <CourseReviewsMyPosts
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    }

    //post a food delivery request
    else if (route === 'PostCourseReview') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <CourseReviewsNewPost
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    }
    else if (route === 'instructorreviews') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <InstructorReviews
          onRouteChange={this.onRouteChange} 
            loadUser={this.loadUser}
            loadPost={this.loadPost}
            user={this.state.user}
            />
        </div>
      )
    } 
    else if (route === 'ViewInstructorReviewsPost') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <InstructorReviewsPostDetails
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}
          post={this.state.post}
          />
        </div>
      )
    }
    //view my food delivery posts
    else if (route === 'ViewMyInstructorReviews') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <InstructorReviewsMyPosts
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    }

    //post a food delivery request
    else if (route === 'PostInstructorReviews') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <InstructorReviewsNewPost
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    }

     else if (route === 'fooddelivery') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
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
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <Marketplace 
          onRouteChange={this.onRouteChange} 
            loadUser={this.loadUser}
            loadPost={this.loadPost}
            user={this.state.user}
            />
        </div>
      )
    }
    else if (route === 'ViewMarketplacePost') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
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
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
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
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
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
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
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
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
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
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
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
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
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
        <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
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
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
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
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
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
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
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
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <EventsPortal
          onRouteChange={this.onRouteChange} 
            loadUser={this.loadUser}
            loadPost={this.loadPost}
            user={this.state.user}
            />
        </div>
      )
    } 
    
    else if (route === 'ViewEventPost') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <EventsPortalPostDetails
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}
          post={this.state.post}
          />
        </div>
      )
    }
    //view my event posts
    else if (route === 'ViewMyEventRequest') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <EventsPortalMyPosts
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    }

    //post a food delivery request
    else if (route === 'PostEventRequest') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <EventsPortalNewPost
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    }
    
    
    
    else if (route === 'gettogethers') {
      return (
        <div className="App">
        <Navigation  user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        <GetTogether 
        onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}
          loadPost={this.loadPost}
          user={this.state.user}
          />
      </div>
      )
    } else if (route === 'ViewGetTogetherPost') {
      return (
        <div className="App">
          <Navigation  user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <GetTogetherPostDetails
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}
          post={this.state.post}
          />
        </div>
      )
    }
    //view my food delivery posts
    else if (route === 'ViewGetTogetherRequest') {
      return (
        <div className="App">
          <Navigation  user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <GetTogetherMyPosts
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    }

    //post a food delivery request
    else if (route === 'PostGetTogetherRequest') {
      return (
        <div className="App">
          <Navigation  user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <GetTogetherNewPost
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    }
    
    // else if (route === 'enrollmentswap') {
    //   return (
    //     <div className="App">
    //       <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
    //       <h1>Enrollment Swap</h1>
    //     </div>
    //   )
    // }
    
    else if (route === 'removeuser') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <RemoveUser />
        </div>
      )
    } else if (route === 'addcourses') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <AddCourses />
        </div>
      )
    } else if (route === 'removeadmin') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <RemoveAdmin />
        </div>
      )
    } else if (route === 'viewadminshiprequests') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <ViewAdminRequests
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    } else if (route === 'viewprofile') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <ViewProfile
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}/>
        </div>
      )
    }  else if (route === 'deactivateaccount') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <h1>Deactivate Account</h1>
        </div>
      )
    } else if (route === 'viewstatus') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <ViewStatus
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}
          user={this.state.user}/>
        </div>
      )
    } else if (route === 'requestadminship') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <RequestAdminshipStatus
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    } else if (route === 'logout') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <h1>Logout</h1>
        </div>
      )
    } else if (route === 'ViewFoodDeliveryPost') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
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
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
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
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
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
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <ForgotPassword />
        </div>
      )
    }


    else if (route === 'enrollmentswap') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <EnrollmentSwap 
          onRouteChange={this.onRouteChange} 
            loadUser={this.loadUser}
            loadPost={this.loadPost}
            user={this.state.user}
            />
        </div>
      )
    }else if (route === 'ViewEnrollmentSwapPost') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <EnrollmentSwapPostDetails
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}
          post={this.state.post}
          />
        </div>
      )
    }
    //view my food delivery posts
    else if (route === 'ViewEnrollmentSwapRequest') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <EnrollmentSwapMyPosts
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    }

    //post a food delivery request
    else if (route === 'PostEnrollmentSwapRequest') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <EnrollmentSwapNewPost
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}
          user={this.state.user}
          />
        </div>
      )
    }


    else if (route === 'editprofile') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <EditProfile
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}
          user={this.state.user}/>
        </div>
        
      )
    }

    else if (route === 'editname') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <EditName
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}
          user={this.state.user}
          />
          
        </div>
        
      )
    }

    else if (route === 'editpassword') {
      return (
        <div className="App">
          <Navigation user={this.state.user} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <EditPassword
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}
          user={this.state.user}/>
        </div>
        
      )
    }

  }
}

export default App;

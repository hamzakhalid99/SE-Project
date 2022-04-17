import React from 'react';
import './Navigation.css';
import hamburgerimg from "./hamburger.png";
import navimg from "./zafirnav.png"
import groups from "./Groups.png";
import addmod from "./Add Moderator.png";
import eventavail from "./Event Available.png";
import fastfood from "./Fastfood.png";
import groupwork from "./Group Work.png";
import helpcenter from "./Help Center.png";
import libradd from "./Library Add.png";
import personremov from "./Person Remove.png";
import modremov from "./Remove Moderator.png";
import school from "./School.png";
import store from "./Store.png";
import swaphorizontal from "./Swap Horizontal.png";
import person from "./Person.png";
import money from "./Attach Money.png";
import viewprofile from "./Pageview.png";
import editprofile from "./Edit.png";
import removecircle from "./Remove Circle.png";
import descriptionimg from "./Description.png";
import logout from "./Logout.png";

const Navigation = ({ onRouteChange, isSignedIn, user }) => {
	console.log(user)
	return (
		
		<header className="header">
			<a onClick={() => onRouteChange(isSignedIn ? 'homepage' : 'landing')} className="header-logo" href="#">
			<h1 className="header-text">
				LDF ++
			</h1>
			</a>
			<ul className="header-list aboutcontact">
				<li><a onClick={() => onRouteChange('about')}>About</a></li>
				<li><a onClick={() => onRouteChange('contact')}>Contact</a></li>
			</ul>
			{ isSignedIn
			?
				<nav className="header-nav">
					<ul className="header-list">
						<li><a><img className="hamburger" src={ hamburgerimg } /></a>
						<ul className="MenuActive">
							<li onClick={() => onRouteChange('discussionportal')}><img src= { groups } />Discussion Portal</li>
							<li onClick={() => onRouteChange('coursereviews')}><img className="extraMarginNeeded" src= { school } />Course Reviews</li>
							<li onClick={() => onRouteChange('instructorreviews')}><img src= { person } />Instructor Reviews</li>
							<li onClick={() => onRouteChange('fooddelivery')}><img src= { fastfood } />Food Delivery</li>
							<li onClick={() => onRouteChange('marketplace')}><img className="extraMarginNeeded" src= { store } />Marketplace</li>
							<li onClick={() => onRouteChange('donations')}><img src= { money } />Donations</li>
							<li onClick={() => onRouteChange('careerhelp')}><img src= { helpcenter } />Career Help</li>
							<li onClick={() => onRouteChange('eventsportal')}><img className="extraMarginNeeded" src= { eventavail } />Events Portal</li>
							<li onClick={() => onRouteChange('gettogethers')}><img src= { groupwork } />Get Togethers</li>
							<li onClick={() => onRouteChange('enrollmentswap')}><img src= { swaphorizontal } />Enrollment Swap</li>
							{ user.adminstatus || user.superadmin ? <li onClick={() => onRouteChange('removeuser')}><img className="extraMarginNeeded" src= { personremov } />Remove User</li> : null}
							<li onClick={() => onRouteChange('addcourses')}><img src= { libradd } />Add Courses</li>
							{ user.superadmin ? <li onClick={() => onRouteChange('removeadmin')}><img src= { modremov } />Remove Admin</li> : null }
							{ user.superadmin ? <li onClick={() => onRouteChange('viewadminshiprequests')}><img className="extraMarginNeeded" src= { addmod } />View Admin Requests</li> : null }
						</ul>
						</li>
						<li><a><img className="navimg" src={ navimg } /></a>
						<ul className="MenuActive profileMenu">
							<li onClick={() => onRouteChange('viewprofile')}><img src= { viewprofile } />View Profile</li>
							<li onClick={() => onRouteChange('editprofile')}><img className="extraMarginNeeded" src= { editprofile } />Edit Profile</li>
							{/* <li onClick={() => onRouteChange('deactivateaccount')}><img src= { removecircle } />Deactivate Account</li> */}
							<li onClick={() => onRouteChange('viewstatus')}><img src= { descriptionimg } />View Status</li>
							{ !user.adminstatus && !user.superadmin ? <li onClick={() => onRouteChange('requestadminship')}><img className="extraMarginNeeded" src= { addmod } />Request Adminship</li> : null }
							<li onClick={() => window.location.reload()}><img src= { logout } />Logout</li>
						</ul>
						</li>
					</ul>
				</nav>
			:
				<nav className="header-nav">
					<ul className="header-list">
						<li><a onClick={() => onRouteChange('login')}><p>Login</p></a></li>
						<li><a onClick={() => onRouteChange('signup')} className="green-button" href="#">SIGN UP ➜</a></li>
					</ul>
				</nav>
			}
		</header>
	)
}

export default Navigation;
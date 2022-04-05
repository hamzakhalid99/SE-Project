import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
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
			<nav className="header-nav">
				<ul className="header-list">
					<li><a href="#"><p>Login</p></a></li>
					<li><a onClick={() => onRouteChange('signup')} className="green-button" href="#">SIGN UP ➜</a></li>
				</ul>
			</nav>
		</header>
	)
}

export default Navigation;
import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
	return (
		<header class="header">
			<a onClick={() => onRouteChange(isSignedIn ? 'homepage' : 'landing')} class="header-logo" href="#">
			<h1 class="header-text">
				LDF ++
			</h1>
			</a>
			<ul class="header-list aboutcontact">
				<li><a onClick={() => onRouteChange('about')}>About</a></li>
				<li><a onClick={() => onRouteChange('contact')}>Contact</a></li>
			</ul>
			<nav class="header-nav">
				<ul class="header-list">
					<li><a href="#"><p>Login</p></a></li>
					<li><a class="green-button" href="#">SIGN UP ➜</a></li>
				</ul>
			</nav>
		</header>
	)
}

export default Navigation;
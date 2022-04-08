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
			{ isSignedIn
			?
				<nav className="header-nav">
					<ul className="header-list">
						<li><a><img className="hamburger" src={ hamburgerimg } /></a>
						<ul className="hamburgerActive">
							<li>A</li>
							<li>A</li>
							<li>A</li>
						</ul>
						</li>
						<li><a><img className="navimg" src={ navimg } /></a>
						<ul className="profileMenuActive">
							<li><img src= { groups } />Discussion Portal</li>
							<li><img src= { school } /></li>
							<li><img src= { person } /></li>
							<li><img src= { fastfood } /></li>
							<li><img src= { store } /></li>
							<li><img src= { money } /></li>
							<li><img src= { helpcenter } /></li>
							<li><img src= { eventavail } /></li>
							<li><img src= { groupwork } /></li>
							<li><img src= { swaphorizontal } /></li>
							<li><img src= { personremov } /></li>
							<li><img src= { libradd } /></li>
							<li><img src= { modremov } /></li>
							<li><img src= { addmod } /></li>
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
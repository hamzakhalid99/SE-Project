import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onRouteChange }) => {
	return (
		<main class="landing">
			<h1 id="social-heading">Social Experience</h1>
			<h1 id="social-heading">Redefined</h1>
			<h3 id="happening-heading">Find everything and anything happening at LUMS!</h3>
			<a id="join" onClick={() => onRouteChange("signup")} class="green-button">Join Now!</a>
		</main>
	)
}

export default LandingPage;
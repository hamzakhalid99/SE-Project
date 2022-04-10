import React from 'react';
import zafirtest from './zafirtest.png';
import './Homepage.css'

class Homepage extends React.Component {
	render() {
		const studentName = "Zafir Ansari"

		return (
			<div className="homepage body-center-align">
				<div className="homepageprofile">
					<img className="homepagepic" src={ zafirtest } />
					<p>In love with this new app!</p>
					<h1>{ studentName }</h1>
					<h3>Student</h3>
				</div>
				<div className="happening">
					<h2>What's happening on campus?</h2>
					<div className="happeningCard"><p>Looking for an iOS developer!</p></div>
					<div className="happeningCard"><p>Qawwali in Cricket Ground on Friday, March 11</p></div>
					<div className="happeningCard"><p>B+ Blood Group required. Please contact at 030...</p></div>
				</div>
			</div>
		)
	}
}

export default Homepage;
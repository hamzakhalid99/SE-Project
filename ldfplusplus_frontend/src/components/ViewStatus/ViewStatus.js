import React from 'react';
import zafirtest from './zafirtest.png';
import headerLogo from "./Person.png";
import './ViewStatus.css'

class ViewStatus extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			happenings: []
		}
	}

	componentWillMount() {
		fetch('http://localhost:3000/homepage', {
			method: 'get',
			headers: {'Content-Type': 'application/json'}
		})
		.then(response => response.json())
		.then(json => {
			this.setState({ happenings: json })
		})
	}

	render() {
		const studentName = "Zafir Ansari"

		return (
            

			<div className="homepage body-center-align">
				<div className="homepageprofile">
                			<img className="iconpic" src={ headerLogo } />
                			<div className="usecasename">
                       				<p>View Status</p>
                        		</div>
                        	
					<img className="homepagepicedit" src={ zafirtest } />
					<p>In love with this new app!</p>
					<h1>{ studentName }</h1>
					<h3>Student</h3>
		</div>
				<div className="happening">
					<h2>What's happening on campus?</h2>
					<div className="happeningCard"><p>Status{this.state.happenings[0]}</p></div>
					<div className="happeningCard"><p>Status{this.state.happenings[1]}</p></div>
					<div className="happeningCard"><p>Status{this.state.happenings[1]}</p></div>
					<div className="happeningCard"><p>Enter New Status{this.state.happenings[1]}</p></div>
				</div>
			</div>
		)
	}
}

export default ViewStatus;
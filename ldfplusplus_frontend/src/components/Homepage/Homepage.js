import React from 'react';
import zafirtest from './zafirtest.png';
import './Homepage.css'
import BACKEND_LINK from './../../env.js'

class Homepage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			happenings: []
		}
	}

	componentWillMount() {
		fetch(BACKEND_LINK + '/homepagehappenings', {
			method: 'get',
			headers: {'Content-Type': 'application/json'}
		})
		.then(response => response.json())
		.then(response => {
			if (response.error) {
                alert(response.error)
            }
            else if (response.message) {
                alert(response.message)
            }
            else if (response.backenddata) {
                this.setState({ happenings: response.backenddata})
            }
		})
	}

	render() {
		const { user } = this.props
		let status = null

		if (user.superadmin) {
			status = "Super Admin"
		} else if (user.adminstatus) {
			status = "Admin"
		} else {
			status = "Student"
		}

		return (
			<div className="homepage body-center-align">
				<div className="homepageprofile">
					<img className="homepagepic" src={ zafirtest } />
					<p>{ user.status[user.status.length - 1] }</p>
					<h1>{ user.fullname }</h1>
					<h3>{ status }</h3>
				</div>
				<div className="happening">
					<h2>What's happening on campus?</h2>
					<div className="happeningCard"><p>{this.state.happenings[0] }</p></div>
					<div className="happeningCard"><p>{this.state.happenings[1] }</p></div>
					<div className="happeningCard"><p>{this.state.happenings[2] }</p></div>
				</div>
			</div>
		)
	}
}

export default Homepage;
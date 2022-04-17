import React from 'react';
import zafirtest from './zafirtest.png';
import headerLogo from "./Person.png";
import './ViewProfile.css'
import BACKEND_LINK from '../../env';

class ViewProfile extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			happenings: []
		}
	}

	componentWillMount() {
		fetch(BACKEND_LINK+'/homepage', {
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
		const { user } = this.props

		return (
            

			<div className="homepage body-center-align">
				<div className="homepageprofile">
                			<img className="iconpic" src={ headerLogo } />
                			<div className="usecasename">
                       				<p>View Profile</p>
                        		</div>
                        	
					<img className="homepagepicedit" src={ zafirtest } />
					<p>In love with this new app!</p>
					<h1>{ user.fullname }</h1>
					<h3>Student</h3>
		</div>
				<div className="happening">
					<h2>What's happening on campus?</h2>
					<div className="happeningCard"><p>Bring chicken chilli from chop{this.state.happenings[0]}</p></div>
					<div className="happeningCard"><p>Playing cricket at 9:30{this.state.happenings[1]}</p></div>
					<div className="happeningCard"><p>Help me find phone{this.state.happenings[1]}</p></div>
				</div>
			</div>
		)
	}
}

export default ViewProfile;
import React from 'react';
import zafirtest from './zafirtest.png';
import headerLogo from "./Add Moderator.png";
import './RequestAdminshipStatus.css'

class RequestAdminshipStatus extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			happenings: [],
			name: '',
			reason: ''

		}
	}
	onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }
    onReasonChange = (event) => {
        this.setState({ reason: event.target.value })
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
                       				<p>Request Adminship</p>
                        		</div>
                        	
					<img className="homepagepicedit" src={ zafirtest } />
					<p>In love with this new app!</p>
					<h1>{ studentName }</h1>
					<h3>Student</h3>
		</div>
				{/*<div className="happening">
					<h2>What's happening on campus?</h2>
					<div className="happeningCard"><p>Enter Name{this.state.happenings[0]}</p></div>
					<div className="happeningCard"><p>Reasons for application{this.state.happenings[1]}</p></div>
				</div>*/}
				<form className="postform" onSubmit={this.onSubmitPost}>
                            <input className="posttitle" placeholder="Enter Name" type="text" onChange={this.onNameChange} />

                            <input className="posttitle" placeholder="Enter Reason for application" type="text" onChange={this.onReasonChange} />
                            
                            
                            <input className="green-button" value="Post" type="submit" />
                </form>
			</div>
		)
	}
}

export default RequestAdminshipStatus;
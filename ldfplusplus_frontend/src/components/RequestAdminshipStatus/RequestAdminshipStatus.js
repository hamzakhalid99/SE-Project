import React from 'react';
import zafirtest from './zafirtest.png';
import headerLogo from "./Add Moderator.png";
import './RequestAdminshipStatus.css'
import BACKEND_LINK from '../../env';

class RequestAdminshipStatus extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
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
	onSubmitPost = (event) => {
		event.preventDefault()
		fetch(BACKEND_LINK+ '/requestadminship', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({fullname: this.props.user.fullname, content: this.state.reason, user_id: this.props.user.user_id})
		})
		.then(response => response.json())
		.then(response => {
			if (response.error) {
                alert(response.error)
            }
            else if (response.message) {
                alert(response.message)
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
                			<img className="iconpic" src={ headerLogo } />
                			<div className="usecasename">
                       				<p>Request Adminship</p>
                        		</div>
                        	
					<img className="homepagepicedit" src={ zafirtest } />
					<p>{ user.status[user.status.length - 1] }</p>
					<h1>{ user.fullname }</h1>
					<h3>{ status }</h3>
		</div>
				{/*<div className="happening">
					<h2>What's happening on campus?</h2>
					<div className="happeningCard"><p>Enter Name{this.state.happenings[0]}</p></div>
					<div className="happeningCard"><p>Reasons for application{this.state.happenings[1]}</p></div>
				</div>*/}
				<form className="postform" onSubmit={this.onSubmitPost}>
                            {/*<input className="posttitle" placeholder="Enter Name" type="text" onChange={this.onNameChange} />*/}

                            <input className="posttitle" placeholder="Enter Reason for application" type="text" onChange={this.onReasonChange} />
                            
                            
                            <input className="green-button" value="Post" type="submit" />
                </form>
			</div>
		)
	}
}

export default RequestAdminshipStatus;
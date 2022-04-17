import React from 'react';
import zafirtest from './zafirtest.png';
import headerLogo from "./Person.png";
import './ViewStatus.css'
import BACKEND_LINK from './../../env.js';

class ViewStatus extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			status_array: [],
			status: ''
		}
	}

	componentWillMount() {
		fetch(BACKEND_LINK + '/myprofile/status', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.props.user)
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
            	console.log(response)
                this.setState({ status_array: response.backenddata })
            }
        })
	}

	// fetchStatus = () => 

	onStatusChange = (event) => {
		this.setState({status: event.target.value})
	}

	onSubmitPost = (event) => {
        event.preventDefault()
		fetch(BACKEND_LINK+'/myprofile/poststatus', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ user_id: this.props.user.user_id, status: this.state.status})
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
		const studentName = "Zafir Ansari"

		const { user } = this.props


		console.log(this.state.status_array)
		const statuses = this.state.status_array.map(function(s) {
			return (
				<div className="happeningCard" key={s._id}>{s.status}</div>
			)
		})

		return (
            

			<div className="homepage body-center-align">
				<div className="homepageprofile">
                			<img className="iconpic" src={ headerLogo } />
                			<div className="usecasename">
                       				<p>View Status</p>
                        		</div>
                        	
					<img className="homepagepicedit" src={ zafirtest } />
					<p>In love with this new app!</p>
					<h1>{ user.fullname }</h1>
					<h3>Student</h3>
		</div>
				<div className="happening">
					<h2>What's happening on campus?</h2>

					<div className="happeningCard"><p>Coolest boy of lums{this.state.happenings[0]}</p></div>
					<div className="happeningCard"><p>call me rafffaayy{this.state.happenings[1]}</p></div>
					<div className="happeningCard"><p>my number +9234235802{this.state.happenings[1]}</p></div>
					{/* <div className="happeningCard"><p>Enter New Status{this.state.happenings[1]}</p></div> */}

				</div>
			</div>
		)
	}
}

export default ViewStatus;
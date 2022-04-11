import React from 'react';
import adminremove from './Remove Moderator.png'
import './RemoveAdmin.css'

class RemoveAdmin extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			users: [],
			searchInput: ''
		}
	}

	componentWillMount() {
		//Fetch all user ids and their names
	}

	onRemoveAdminInputChange(event) {
		this.setState({ searchInput: event.target.value})
	}

	render() {
		return (
			<div className="removeUser">
				<div className="usecase-heading">
					<img className="usecase-img" src={ adminremove } />
					<h1 className="usecase-heading-text">Remove Admin</h1>
				</div>
				<div className="search">
					<input className="searchBar" type="text" onChange={() => this.onRemoveAdminInputChange}></input>
					<button className="searchButton" >Search</button>
				</div>
				<div className="userDetails">
					<div className="landingpost whiteBackground">
                        <h3>Admin Details</h3>
                    </div>
                    <button className="removeButton">Remove Admin</button>
				</div>
			</div>
		)
	}
}

export default RemoveAdmin;
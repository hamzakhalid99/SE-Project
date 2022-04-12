import React from 'react';
import adminremove from './Remove Moderator.png'
import './RemoveAdmin.css'
import RemoveAdminConfirm from './RemoveAdminConfirm.js'

class RemoveAdmin extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			users: [],
			searchInput: '',
			confirm: false
		}
	}

	componentWillMount() {
		//Fetch all user ids and their names
	}

	onRemoveAdminInputChange(event) {
		this.setState({ searchInput: event.target.value})
	}

	showConfirm = (event) => {
		this.setState({ confirm: true })
	}

	onConfirm = (event) => {
		// remove admin
		this.setState({ confirm: false })
	}

	onCancel = (event) => {
		this.setState({ confirm: false })
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
                    <button onClick={this.showConfirm}className="removeButton">Remove Admin</button>
                    { this.state.confirm ? <RemoveAdminConfirm onConfirm={this.onConfirm} onCancel={this.onCancel} /> : <p></p> }
				</div>
			</div>
		)
	}
}

export default RemoveAdmin;
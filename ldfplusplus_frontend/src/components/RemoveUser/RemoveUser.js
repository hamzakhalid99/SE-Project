import React from 'react';
import personremove from './Person Remove.png'
import './RemoveUser.css'
import RemoveUserConfirm from './RemoveUserConfirm.js'

class RemoveUser extends React.Component {
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

	onRemoveUserInputChange(event) {
		this.setState({ searchInput: event.target.value })
	}

	showConfirm = (event) => {
		this.setState({ confirm: true })
	}

	onConfirm = (event) => {
		// remove user
		this.setState({ confirm: false })
	}

	onCancel = (event) => {
		this.setState({ confirm: false })
	}

	render() {
		return (
			<div className="removeUser">
				<div className="usecase-heading">
					<img className="usecase-img" src={ personremove } />
					<h1 className="usecase-heading-text">Remove User</h1>
				</div>
				<div className="search">
					<input className="searchBar" type="text" onChange={() => this.onRemoveUserInputChange}></input>
					<button className="searchButton" >Search</button>
				</div>
				<div className="userDetails">
					<div className="landingpost whiteBackground">
                        <h3>User Details</h3>
                    </div>
                    <button onClick={this.showConfirm} className="removeButton">Remove User</button>
                    { this.state.confirm ? <RemoveUserConfirm onConfirm={this.onConfirm} onCancel={this.onCancel} /> : <p></p> }
				</div>
			</div>
		)
	}
}

export default RemoveUser;
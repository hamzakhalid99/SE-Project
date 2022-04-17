import React from 'react';
import personremove from './Person Remove.png'
import './RemoveUser.css'
import RemoveUserConfirm from './RemoveUserConfirm.js'
import BACKEND_LINK from './../../env.js';

class RemoveUser extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			users: [],
			_id: '',
			confirm: false
		}
	}

	componentWillMount() {
		fetch(BACKEND_LINK + '/removeuser', {
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
                this.setState({ users: response.backenddata })
            }
        })
	}

	onSelectUser = (event) => {
		this.setState({ _id: event.target.value })
	}

	showConfirm = (event) => {
		this.setState({ confirm: true })
	}

	onConfirm = (event) => {
		fetch(BACKEND_LINK + '/removeuser/delete', {
			mode: 'no-cors',
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state._id)
        })
        .then(response => response.json())
        .then(response => {
        	if (response.error) {
                alert(response.error)
            }
            else if (response.message) {
                alert(response.message)
				this.setState({ confirm: false })
            }
        })
	}

	onCancel = (event) => {
		this.setState({ confirm: false })
	}

	render() {
		// const onSelectUser = this.onSelectUser

		return (
			<div className="removeUser">
				<div className="usecase-heading">
					<img className="usecase-img" src={ personremove } />
					<h1 className="usecase-heading-text">Remove User</h1>
				</div>
				<div className="search">
					<select className="searchBar" onChange={this.onSelectUser}>
						{this.state.users.map(user => <option value={user._id} key={user._id} >{ user.fullname }</option>)}
					</select>
				</div>
				<div className="userDetails">
					<div className="landingpost whiteBackground">
                        <h3>User Details</h3>
                        <u>ID: </u> <h1> { this.state._id } </h1>
                        {/*<u>Email: </u> <h1> { this.state.selecteduser.email } </h1>*/}
                    </div>
                    <button onClick={this.showConfirm} className="removeButton">Remove User</button>
                    { this.state.confirm ? <RemoveUserConfirm onConfirm={this.onConfirm} onCancel={this.onCancel} /> : <p></p> }
				</div>
			</div>
		)
	}
}

export default RemoveUser;
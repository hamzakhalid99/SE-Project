import React from 'react';
import './ForgotPassword.css'
import ForgotPasswordLinkCheck from './ForgotPasswordLinkCheck.js'
import BACKEND_LINK from './../../env.js';
class ForgotPassword extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			linkcheck: false
		}
	}

	onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onSubmitReset = (event) => {
    	event.preventDefault()

    	if (this.state.email != '') {
    		fetch(BACKEND_LINK+'/forgotpassword', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(this.state)
			})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.setState({ linkcheck: true })
				}
			})
    	}
    }

    onLinkCheck = (event) => {
		this.setState({ linkcheck: false })
	}

	render() {
		return (
			<div className="body-center-align">
				<h1 className="header-text signup-header">FORGOT PASSWORD</h1>
				<div className="forgotpassword-container">
                    <div>
                        <form className="signupform" onSubmit={this.onSubmitReset}>
                            <input className="signupform-input" placeholder="Email" type="email" onChange={this.onEmailChange} />
                            <input className="form-green-button" type="submit" value="Reset Password"/>
                        </form>
                    </div>
                    { this.state.linkcheck ? <ForgotPasswordLinkCheck onLinkCheck={this.onLinkCheck} /> : <p></p> }
                </div>
			</div>
		)
	}
}

export default ForgotPassword;
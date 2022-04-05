import React from 'react';
import './SignUp.css';
import signupimg from "./signup.png";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            fullname: '',
            email: '',
            password: '',
            confirmpassword: '',
        }
    }

    onFullNameChange = (event) => {
        this.setState({fullname: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onConfirmPasswordChange = (event) => {
        this.setState({confirmpassword: event.target.value})
    }

    onSubmitSignUp = () => {
		fetch('http://localhost:3000/signup', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('home')
			}
		})
	}

    render() {
        const { onRouteChange } = this.props;
        return (
            <div>
                <h1 className="header-text signup-header">Sign Up</h1>
                <div className="signup-container">
                    <div>
                        <form className="signupform" onSubmit={this.onSubmitSignUp}>
                            <input className="signupform-input" placeholder="Full Name" type="text" onChange={this.onFullNameChange} />
                            <input className="signupform-input" placeholder="Email" type="text" onChange={this.onEmailChange} />
                            <input className="signupform-input" placeholder="Password" type="text" onChange={this.onPasswordChange} />
                            <input className="signupform-input" placeholder="Confirm Password" type="text" onChange={this.onConfirmPasswordChange} />
                            <input className="form-green-button" type="submit"/>
                            <a className="form-green-button" onClick={() => { onRouteChange('landing') }}>Already a user? Login!</a>
                        </form>
                    </div>
                    <img className="signupimg" src={ signupimg } />
                </div>
            </div>
        )
    }
}

export default SignUp;
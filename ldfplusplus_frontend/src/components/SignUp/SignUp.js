import React from 'react';
import './SignUp.css';


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
        console.log(this.state.fullname)
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
        return (
            <div className="signup-container">
                <h1 className="header-text signup-header">Sign Up</h1>
                <form className="signupform" onSubmit={this.onSubmitSignUp}>
                    <input placeholder="Full Name" type="text" onChange={this.onFullNameChange} />
                    <input placeholder="Email" type="text" onChange={this.onFullNameChange} />
                    <input placeholder="Password" type="text" onChange={this.onFullNameChange} />
                    <input placeholder="Confirm Password" type="text" onChange={this.onFullNameChange} />
                    <input className="green-button" type="submit"/>
                    <a className="green-button">Already a user? Login!</a>
                </form>
            </div>
        )
    }
}

export default SignUp;
import React from 'react';
import loginimg from "./login.png";
import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onSubmitLogin = (event) => {
        event.preventDefault()
		fetch('http://localhost:3000/login', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('homepage');
			}
		})
	}

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className="body-center-align">
                <h1 className="header-text signup-header">LOGIN</h1>
                <div className="signup-container">
                    <div>
                        <form className="signupform" onSubmit={this.onSubmitLogin}>
                            <input className="signupform-input" placeholder="Email" type="email" onChange={this.onEmailChange} />
                            <input className="signupform-input" placeholder="Password" type="password" onChange={this.onPasswordChange} />
                            <a className="forgotpassword" href="#">Forgot Password? Reset Here!</a>
                            <input className="form-green-button" type="submit" value="Login"/>
                            <a className="form-green-button" onClick={() => { onRouteChange('signup') }}>New user? Sign up!</a>
                        </form>
                    </div>
                    <img className="signupimg" src={ loginimg } />
                </div>
            </div>
        )
    }
}

export default Login;
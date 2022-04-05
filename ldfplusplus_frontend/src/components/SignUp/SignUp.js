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
            <div>
                <h1 className="header-text signup-header">Sign Up</h1>
                <form onSubmit={this.onSubmitSignUp}>
                    <input name="name" id="name" type="text" onChange={this.onFullNameChange} />
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default SignUp;
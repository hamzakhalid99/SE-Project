import React from 'react';
import './SignUp.css';
import signupimg from "./signup.png";
import BACKEND_LINK from './../../env.js'

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            fullname: '',
            email: '',
            password: '',
            confirmPassword: '',
            imgName: 'Upload Picture',
            uploadedFile: null
        }
    }

    onFullNameChange = (event) => {
        this.setState({ fullname: event.target.value })
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onConfirmPasswordChange = (event) => {
        this.setState({ confirmPassword: event.target.value })
    }

    onFileUpload = (event) => {
        this.getBase64(event.target.files[0]).then((base64File) => {
            console.log(base64File);
            this.setState({uploadedFile: base64File, imgName: event.target.files[0].name })
        })
    }

    onSubmitSignUp = () => {
		fetch(BACKEND_LINK + '/signup', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
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
                this.props.loadUser(response.backenddata);
                this.props.onRouteChange('homepage');
            }
        })
	}

    // function to convert file to base64 encoding, from https://stackoverflow.com/questions/53944533/base64-encode-file-in-map-function
    getBase64 = (file) => {
        return new Promise ((resolve, reject) => {
          const reader = new FileReader ();
          reader.readAsDataURL (file);
          reader.onload = _ => resolve (reader.result);
          reader.onerror = e => reject (e);
        });
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div>
                <h1 className="header-text signup-header">SIGN UP</h1>
                <div className="signup-container">
                    <div>
                        <form className="signupform" onSubmit={this.onSubmitSignUp}>
                            <input className="signupform-input" placeholder="Full Name" type="text" onChange={this.onFullNameChange} />
                            <input className="signupform-input" placeholder="Email" type="email" onChange={this.onEmailChange} />
                            <input className="signupform-input" placeholder="Password" type="password" onChange={this.onPasswordChange} />
                            <input className="signupform-input" placeholder="Confirm Password" type="password" onChange={this.onConfirmPasswordChange} />
                            {/* <label className="signupform-input picture-label" for="file">{this.state.imgName} </label> */}
                            {/* <input className="hidden" placeholder="Upload Picture" id="file" type="file" onChange={this.onFileUpload} /> */}
                            <input className="form-green-button" type="submit"/>
                            <a className="form-green-button" onClick={() => { onRouteChange('login') }}>Already a user? Login!</a>
                        </form>
                    </div>
                    <img className="signupimg" src={ signupimg } />
                </div>
            </div>
        )
    }
}

export default SignUp;
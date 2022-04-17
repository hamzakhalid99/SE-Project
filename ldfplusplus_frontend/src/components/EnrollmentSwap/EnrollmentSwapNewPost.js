import React from 'react';
import fastfood from "./Swap Horizontal.png";
import './EnrollmentSwapNewPost.css'
import BACKEND_LINK from './../../env.js';

class EnrollmentSwapNewPost extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            // content: '',
            // title: '',
            // contact: '',
            want: '',
            contact: '',
            have: '',
            user_id: this.props.user.user_id
        }
    }

    onWantChange = (event) => {
        this.setState({ want: event.target.value })
    }

    onContactChange = (event) => {
        this.setState({ contact: event.target.value })
    }

    onHaveChange = (event) => {
        this.setState({ have: event.target.value })
    }

    // onContactChange = (event) => {
    //     this.setState({ contact: event.target.value })
    // }

    // onCompensationChange = (event) => {
    //     this.setState({ compensation: event.target.value })
    // }

    // onAreaToChange = (event) => {
    //     this.setState({ areato: event.target.value })
    // }

    // onAreaFromChange = (event) => {
    //     this.setState({ areafrom: event.target.value })
    // }

    onSubmitPost = (event) => {
        event.preventDefault()
		fetch(BACKEND_LINK+'/swaprequest/post', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
		})
		.then(response => response.json())
		.then(user => {	
			this.props.onRouteChange('enrollmentswap')
			
		})
	} 

	render() {

        const { onRouteChange } = this.props;

        return (
            <div>
                <div className="homepage body-center-align">
                    <div className="homepageprofile">
                    <img className="iconpic" src={ fastfood } />  
                    </div>

                        <div className="usecasename">
                        <p>Enrollment Swap</p>
                        </div>

                </div> 

                
                <div className="post-container">
                    <div>
                        <form className="postform" onSubmit={this.onSubmitPost}>
                            <input className="posttitle" placeholder="Want" type="text" onChange={this.onWantChange} />
                            <input className="posttitle" placeholder="Have" type="text" onChange={this.onHaveChange} />
                            <input className="posttitle" placeholder="Contact" type="text" onChange={this.onContactChange} />
                            
                            {/* <input className="posttitle" placeholder="Area to" type="text" onChange={this.onAreaToChange} />
                            <input className="posttitle" placeholder="Area from" type="text" onChange={this.onAreaFromChange} />
                            <input className="postdetails" placeholder="Post Details" type="text" onChange={this.onDetailsChange} /> */}
                            
                            <input className="post-green-button" value="Post" type="submit" />
                            <a className="form-red-button" onClick={() => { onRouteChange('enrollmentswap') }}>Back</a>
                        </form>
                    </div>
                   
                </div>
            </div>
        )
		
	}
}

export default EnrollmentSwapNewPost;
import React from 'react';
import fastfood from "./Fastfood.png";
import './FoodDeliveryNewPost.css'
import BACKEND_LINK from './../../env.js';

class FoodDeliveryNewPost extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            content: '',
            title: '',
            contact: '',
            compensation: '',
            areafrom: '',
            areato: '',
            user_id: this.props.user.user_id
        }
    }

    onTitleChange = (event) => {
        this.setState({ title: event.target.value })
    }

    onDetailsChange = (event) => {
        this.setState({ content: event.target.value })
    }

    onPostedByChange = (event) => {
        this.setState({ postedby: event.target.value })
    }

    onContactChange = (event) => {
        this.setState({ contact: event.target.value })
    }

    onCompensationChange = (event) => {
        this.setState({ compensation: event.target.value })
    }

    onAreaToChange = (event) => {
        this.setState({ areato: event.target.value })
    }

    onAreaFromChange = (event) => {
        this.setState({ areafrom: event.target.value })
    }

    onSubmitPost = (event) => {
        event.preventDefault()
		fetch(BACKEND_LINK+'/fooddelivery/post', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
		})
		.then(response => response.json())
		.then(user => {	
			this.props.onRouteChange('fooddelivery')
			
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
                        <p>Food Delivery</p>
                        </div>

                </div> 

                
                <div className="post-container">
                    <div>
                        <form className="postform" onSubmit={this.onSubmitPost}>
                            <input className="posttitle" placeholder="Post Title" type="text" onChange={this.onTitleChange} />
                            <input className="posttitle" placeholder="Contact" type="text" onChange={this.onContactChange} />
                            <input className="posttitle" placeholder="Compensation" type="text" onChange={this.onCompensationChange} />
                            <input className="posttitle" placeholder="Area to" type="text" onChange={this.onAreaToChange} />
                            <input className="posttitle" placeholder="Area from" type="text" onChange={this.onAreaFromChange} />
                            <input className="postdetails" placeholder="Post Details" type="text" onChange={this.onDetailsChange} />
                            
                            <input className="post-green-button" value="Post" type="submit" />
                            <a className="form-red-button" onClick={() => { onRouteChange('fooddelivery') }}>Back</a>
                        </form>
                    </div>
                   
                </div>
            </div>
        )
		
	}
}

export default FoodDeliveryNewPost;
import React from 'react';
import fastfood from "./Fastfood.png";
import './FoodDeliveryNewPost.css'

class FoodDeliveryNewPost extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            postTitle: '',
            postDetails: '',
        }
    }

    onTitleChange = (event) => {
        this.setState({ postTitle: event.target.value })
    }

    onDetailsChange = (event) => {
        this.setState({ postDetails: event.target.value })
    }

    onSubmitPost = () => {
		fetch('http://localhost:3000/signup', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('fooddelivery')
			}
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

                <div className="landinghappening">
                    <div className="posttitle">
                        <h1> Post Title</h1>
                    </div>
                        
                </div>

                <div className="postdetailsbox">

                    <div className="postdetails">
                        <h1>Post Details</h1>
                    </div>
                        
                </div>


                <a className="form-green-button" onClick={() => { onRouteChange('fooddelivery') }}>Post</a>

            </div>
            
			
		)
		
	}
}

export default FoodDeliveryNewPost;